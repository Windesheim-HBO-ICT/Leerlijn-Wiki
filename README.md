# Leertaken

## Docker image
De latest release is beschikbaar als docker image met het volgende command:

```SH
docker run -p 80:80 --rm -d ghcr.io/windesheim-hbo-ict/leertaken
```

Waarna de leertaken wiki beschikbaar is op <http://localhost/>.

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

Of met:

```sh
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

Voor meer informatie zie: <https://github.com/Windesheim-HBO-ICT/Deeltaken/wiki/Getting-Started>
