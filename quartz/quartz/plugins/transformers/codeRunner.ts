import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const CodeRunner: QuartzTransformerPlugin = () => {
  return {
    name: "CodeRunner",
    markdownPlugins() {
      return [() => {
        return (tree) => {
          visit(tree, 'code', (node: any) => {
            if (node.lang) {
              const isRunner = node.meta === "runner";
              const isSandbox = node.meta === "sandbox";
              const language = node.lang
              const code = node.value

              let props = [];

              if (language == "mermaid" || language == "md") return;

              props.push(`language="${language}"`)

              if (isSandbox)
                props.push('sandbox')
              else if (!isRunner)
                props.push('read-only')

              node.type = 'html'
              node.value = `<code-block ${props.join(" ")}>${code}</code-block>`
            }
          })
        }
      }]
    },
  }
}
