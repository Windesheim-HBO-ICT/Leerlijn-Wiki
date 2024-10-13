import { BuildCtx } from "../util/ctx"
import { FilePath, FullSlug } from "../util/path"
import { StaticResources } from "../util/resources"

export function getStaticResourcesFromPlugins(ctx: BuildCtx) {
  const staticResources: StaticResources = {
    css: [],
    js: [],
  }

  for (const transformer of ctx.cfg.plugins.transformers) {
    const res = transformer.externalResources ? transformer.externalResources(ctx) : {}
    if (res?.js) {
      staticResources.js.push(...res.js)
    }
    if (res?.css) {
      staticResources.css.push(...res.css)
    }
  }

  // if serving locally, listen for rebuilds and reload the page
  if (ctx.argv.serve) {
    const wsUrl = ctx.argv.remoteDevHost
      ? `wss://${ctx.argv.remoteDevHost}:${ctx.argv.wsPort}`
      : `ws://localhost:${ctx.argv.wsPort}`

    staticResources.js.push({
      loadTime: "afterDOMReady",
      contentType: "inline",
      script: `
            const socket = new WebSocket('${wsUrl}')
            // reload(true) ensures resources like images and scripts are fetched again in firefox
            socket.addEventListener('message', () => document.location.reload(true))
          `,
    })

    staticResources.js.push({
      loadTime: "afterDOMReady",
      contentType: "external",
      src: "https://cdn.jsdelivr.net/gh/Windesheim-HBO-ICT/Coderunner@latest/CodeBlock/codeBlock.js",
      moduleType: "module",
    })
  }

  return staticResources
}

export * from "./emitters"
export * from "./filters"
export * from "./transformers"

declare module "vfile" {
  // inserted in processors.ts
  interface DataMap {
    slug: FullSlug
    filePath: FilePath
    relativePath: FilePath
  }
}
