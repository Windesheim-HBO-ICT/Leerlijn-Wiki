# Leertaken

Go into the quartz folder:

```SH
cd .\quartz\
```

And start with:

```SH
docker run --rm -itp 8080:8080 $(docker build -q .)
```

Or with:

`docker build -t windesheim-leertaken-quartz .`
`docker run -dp 80:80 windesheim-leertaken-quartz`

The website is accesible on <http://localhost:8080/>
