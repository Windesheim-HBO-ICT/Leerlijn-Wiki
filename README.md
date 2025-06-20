# Leertaken

## Maken van een nieuwe release
1. Ga naar `Releases`
2. Klik op `Draft new release`
3. Maak een tag
4. Klik op `Generate release notes` of schrijf zelf nieuwe release notes
5. Klik op `Publish release`
6. Wacht tot de automatische GitHub [action]([action](https://github.com/Windesheim-HBO-ICT/Leerlijn-Wiki/actions)) klaar is en de nieuwe Docker Image is gepusht naar de container registry

## Vereisten
`Node.js` => 18.14
`npm` => 9.3.1

## Docker image
De latest release is beschikbaar als docker image met het volgende command:

```SH
docker run -p 80:80 --rm -d ghcr.io/windesheim-hbo-ict/leertaken
```

Waarna de leertaken wiki beschikbaar is op <http://localhost/>.

### Docker deployment bijwerken
Om een nieuwe versie te publishen moet binnen GitHub een nieuwe release worden gemaakt.
Dit kan onder .../releases -> Draft a new release.
De GitHub action maakt vervolgens zelf een nieuwe image en publisht deze

## Handmatig clonen
Het is ook mogelijk om handmatig te clonen en een docker image te builden door de volgende stappen uit te voeren:

Ga in de Quartz folder met:
```SH
cd .\quartz\
```

En start met:
```SH
docker run --rm -itp 80:80 $(docker build -q .)
```

Of met:
```SH
docker build -t windesheim-leertaken-quartz .
docker run -dp 80:80 windesheim-leertaken-quartz
```

## Handmatig draaien (buiten Docker)
Voor eenvoudige aanpassingen of het direct bekijken van de content kan de site ook lokaal worden gedraaid.

Voer hiervoor de onderstaande commando's uit in een terminal.
```sh
cd quartz
npm i
npx quartz build --serve
```
<sub><sub>Niet aan te raden, alleen handig voor development. Vergeet niet om handmatig de `content` map te vullen met .md bestanden</sub></sub>

De website start dan op <http://localhost/>

## Coderunner
Om de coderunner te laten werken moet ook het volgende commando uitgevoerd worden:

```SH
docker run -v /var/run/docker.sock:/var/run/docker.sock -p 8080:8080 --rm -d ghcr.io/windesheim-hbo-ict/coderunner
```

Voor meer informatie zie: <https://github.com/Windesheim-HBO-ICT/Coderunner/wiki/Getting-Started>

### CodeBlock.js
In het bestand `quartz/quartz/plugins/index.tsx` wordt `codeBlock.js` ingeladen.
Als je, voor ontwikkeling doeleinden `codeBlock.js` lokaal moet hebben moet je het bestand in de map `quartz/public` zetten.
In `quartz/quartz/plugins/index.tsx` moet het dan dit worden:
```
staticResources.js.push({
    loadTime: "afterDOMReady",
    contentType: "external",
    src: "/codeBlock.js",
    moduleType: "module",
})
```
