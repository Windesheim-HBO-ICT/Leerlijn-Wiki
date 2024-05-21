# Leertaken

Ga in de Quartz folder met:

```SH
cd .\quartz\
```

En start met:

```SH
docker run --rm -itp 8080:8080 $(docker build -q .)
```

Of met:

```SH
docker build -t windesheim-leertaken-quartz .
docker run -dp 80:80 windesheim-leertaken-quartz
```

The website is accesible on <http://localhost/>

## Coderunner

Om de coderunner te laten werken moet ook het volgende commando uitgevoerd worden:

```SH
docker run -v /var/run/docker.sock:/var/run/docker.sock -p 8080:8080 --rm -d ghcr.io/windesheim-hbo-ict/coderunner
```

Voor meer informatie zie: <https://github.com/Windesheim-HBO-ICT/Deeltaken/wiki/Getting-Started>
