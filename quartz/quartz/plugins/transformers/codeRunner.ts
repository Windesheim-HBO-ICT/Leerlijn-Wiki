import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const CodeRunner: QuartzTransformerPlugin = () => {
  return {
    name: "CodeRunner",
    markdownPlugins() {
      return [() => {
        return (tree) => {
          visit(tree, 'code', (node: any) => {
            console.log(node.lang && node.meta === 'runner');
            if (node.lang && node.meta === 'runner') {
              const language = node.lang
              const code = node.value
              node.type = 'html'
              node.value = `<script src="./static/codeBlock.js" type="module"></script><code-block language="${language}" initialCode="${code.replace(/"/g, '&quot;')}"></code-block>`
            }
          })
        }
      }]
    },
  }
}