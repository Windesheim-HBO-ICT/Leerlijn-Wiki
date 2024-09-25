import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
    maxDifficulty: number
    colors: string[]
    difficultySymbol: string
    EmptySymbol: string
    showEmptySymbol: boolean
}
   
const defaultOptions: Options = {
    maxDifficulty: 5,
    colors: ['blue', 'green', '#FFFF00', 'orange', 'rgb(255,0,0)'], //supports same colors as style for html
    difficultySymbol: '★',
    EmptySymbol: '☆',
    showEmptySymbol: true
}

export default ((userOpts?: Options) => {
    const opts = { ...defaultOptions, ...userOpts }
    
    function Difficulty(props: QuartzComponentProps) {
        if (typeof(props.fileData.frontmatter?.difficulty) != 'number') { //ensure difficulty is set
            return <></>
        }

        const difficulty = Math.min(Math.max(props.fileData.frontmatter?.difficulty, 1), opts.maxDifficulty)
        const color = opts.colors[difficulty - 1] || 'black'

        var text = opts.difficultySymbol.repeat(difficulty)
        if (opts.showEmptySymbol) {
            text += opts.EmptySymbol.repeat(opts.maxDifficulty - difficulty)
        }

        return <p class={"difficulty-indicator"} style={{color: color}}>{text}</p>
    }
   
    return Difficulty
}) satisfies QuartzComponentConstructor