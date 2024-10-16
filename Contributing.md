# Difficulty

Het difficulty component is verantwoordelijk voor het toevoegen van een aantal symbolen ter indicatie van het niveau van een bestand. Deze staan rechts van de leestijd van het bestand als de `Difficulty` tag aanwezig is in de frontmatter. 
## Werking

### Component

De indicator zelf wordt toegevoegd door middel van een component.

door `QuartzComponentConstructor` te implementeren kan dit component geïmporteerd worden binnen `quartz\components\index.ts`.

```ts
import component1 from "./component1"
import component2 from "./component2"
import Difficulty from "./difficulty"

export {
	component1,
	component2,
	Difficulty
}
```

dit zorgt ervoor dat de component toe te voegen is aan pagina in `quartz.layout.ts`. De volgorde van de components is WEL relevant omdat dit de zelfde volgorde is als waarin deze op de pagina worden gezet.

```ts
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.MobileOnly(Component.component1()),
    Component.Difficulty(),
    Component.component2(),
  ],
  left: [
  ],
  right: [
  ],
}
```

#### Options

De Difficulty heeft een aantal options die binnen quartz aangepast kunnen worden:

| Optienaam        | Werking                                                                                                                                                                                                | verwachtte waarde | default- waarde                                          |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- | -------------------------------------------------------- |
| maxDifficulty    | Deze waarde stelt de maximale difficulty in                                                                                                                                                            | int               | 5                                                        |
| colors           | De kleuren van niveau, de kleur op index 0 wordt gebruikt bij difficulty 1, de kleur op index 1 bij 2, etc... De waardes binnen de array zijn kleuren binnen css. ("red", "#FF0000", "rgb(255, 0, 0)") | string\[\]        | \['blue', 'green', '#FFFF00', 'orange', 'rgb(255,0,0)'\] |
| difficultySymbol | Karakter(s) dat voor elk niveau verschijnt. Dit karakter wordt \[difficulty\] keer neergezet.                                                                                                          | string            | ★                                                        |
| EmptySymbol      | Karakter(s) dat neergezet wordt voor missende difficulty vergeleken tot de maximale. Dit karakter wordt \[maxDifficulty - Difficulty\] keer neergezet zodat er altijd evenveel karakters staan.        | string            | ☆                                                        |
| showEmptySymbol  | Als deze instelling op false staat worden de emptySymbols niet toegevoegd.                                                                                                                             | boolean           | true                                                     |

#### functie
Binnen de functie zelf wordt er eerst gekeken of de difficulty tag aanwezig is en een numerieke waarde heeft. Als dit niet zo is verschijnt de difficulty niet op de pagina.

vervolgens wordt de difficulty tussen 1 en de maximale waarde gezet en de bijbehorende kleur uitgekozen, als er geen kleur is (bijvoorbeeld wanneer de array met kleuren te kort is) wordt de kleur op zwart gezet.

```ts
const difficulty = Math.min(Math.max(props.fileData.frontmatter?.difficulty,1),opts.maxDifficulty)

const color = opts.colors[difficulty - 1] || 'black'
```
Binnen deze code is `props` meegegeven aan de functie bij het aanmaken van de component en `opts` de instellingen. Deze mogen alleen uitgelezen worden omdat deze voor elk object hergebruikt worden.

Als laatste wordt er een `<p>` met de difficulty karakters teruggeven die op de pagina verschijnt zoals in dit voorbeeld van een pagina met difficulty 2:

```html
<p class="difficulty-indicator", style="color: green">★★☆☆☆</p>
```

Resultaat:

<p class="difficulty-indicator", style="color: green">★★☆☆☆</p>
De difficulty-indicator klasse heeft op dit moment als enige regel `display:inline` zodat deze naast de leestijd komt te staan.

### Frontmatter

Om de difficulty tag te kunnen gebruiken binnen het programma is de `difficulty` key toegevoegd frontmatter datamap in `quartz\plugins\transformers\frontmatter.ts`. 
```ts
interface DataMap {

	frontmatter: { [key: string]: unknown } & {

		title: string

	} & Partial<{
		//andere optionele waardes
		difficulty: number
		//andere optionele waardes
	}>
}
```
De functionaliteit van de plugin zelf is niet aangepast omdat deze de waarde al op slaat. 
## Onderhouden

### Component

Het difficulty component is geïsoleerd en heeft waarschijnlijk weinig onderhoudt nodig tenzij de structuur van instellingen of pagina's veranderd. 

De css-class is aan te passen binnen `quartz\styles\custom.css`.

enige mogelijke verbeteringen zouden wel mogelijk zijn. Bijvoorbeeld screen reader support of meer instellingen zoals een default color, screen reader support en tooltips voor het element.
### Frontmatter

Het is mogelijk nodig om later een aparte plugin te schrijven die waardes toevoegt aan de frontmatter datamap. Dit kan nodig zijn als de waarde gecontroleerd of bewerkt moet worden voor het toevoegen aan de datamap aangezien dit merge conflicten op kan leveren wanneer quartz zelf deze plugin updatet.


---
# Code runner

## Werking

De codeblokken worden aan de pagina toegevoegd door middel van een Quartz-plugin die Markdown codeblokken omzet naar html-components, dit component maakt gebruik van de Monaco editor en een websocket om met een lokaal draaiende api op een docker container te communiceren die de code uitvoert.
### Quartz plugin

De plugin staat in `quartz\plugins\transformers\codeRunner.ts`. 
```js
return (tree) => {
	visit(tree, 'code', (node: any) => {})
}
```
En wordt geregistreerd in `quartz\plugins\transformers\index.ts`.
```js
export { CodeRunner } from "./codeRunner"
```

Er zijn 3 soorten codeblokken. Deze kunnen geselecteerd worden met:

| Type      | Obsidian  | Html        | Beschrijving                                                              |
| --------- | --------- | ----------- | ------------------------------------------------------------------------- |
| read-only |           | "read-only" | standaard codeblok met monaco styling. Dit is de default binnen obsidian. |
| runner    | "runner"  |             | uitvoerbaar codeblok. Dit is de default binnen de webcomponent            |
| sandbox   | "sandbox" | "sandbox"   | bewerkbaar en uitvoerbaar codeblok.                                       |

De plugin is verantwoordelijk voor deze vertaling van obsidian codeblok-type naar html codeblok-type en het doorgeven van de taal. Dit wordt gedaan door met behulp van de visit functie die een stuk code op elk codeblok uit voert.

De visit functie is onderdeel van een package van [unist visit](https://www.npmjs.com/package/unist-util-visit), met behulp van deze functie wordt voor elk codeblok gekeken of er een taal aanwezig is. Als er een taal aanwezig is wordt deze samen met het type (sandbox runner of geen) in een html element gezet. Het type van de node wordt ook op html gezet.

hieronder een versimpelt voorbeeld:
```js
props.push(`language="${node.lang}"`)
props.push('sandbox')

node.type = 'html'
node.value = `<code-block ${props.join(" ")}>${code}</code-block>`
```

Het webcomponent wordt toegevoegd aan de website via [cdn.jsdelivr.net](https://cdn.jsdelivr.net/gh/Windesheim-HBO-ICT/Coderunner@latest/CodeBlock/codeBlock.js) en is als html element te gebruiken als `<code-block language='[taal]' [type]> </code-block>`. Jsdelivr haalt de code op van de laatste release van [CodeRunner/main/CodeBlock/codeBlock.js](https://github.com/Windesheim-HBO-ICT/Coderunner/blob/main/CodeBlock/codeBlock.js) op GitHub. 

Deze wordt in `quartz\plugins\index.ts` toegevoegd als `--serve` meegegeven wordt als argument bij het opstarten in de commandline:
```js
staticResources.js.push({
	loadTime: "afterDOMReady",
	contentType: "external",
	src: "https://cdn.jsdelivr.net/gh/Windesheim-HBO-ICT/Coderunner@latest/CodeBlock/codeBlock.js",
	moduleType: "module",
    })
```

### Webcomponent

De webcomponent heeft zijn eigen shadowroot die in de constructor aangemaakt wordt. meer uitleg is te vinden op de [repo van de coderunner](https://github.com/Windesheim-HBO-ICT/Coderunner). 
```js
class CodeBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
}

window.customElements.define("code-block", CodeBlock);
```

## Onderhouden

De plugin moet aangepast worden als de naam of props van de coderunner worden gewijzigd. Deze kunnen worden aangepast binnen de functie die aan 'visit' mee wordt gegeven.

Het webcomponent is de verantwoordelijkheid van de coderunner en wordt hier dus niet besproken