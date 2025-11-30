
## Description

Proyecto hecho en nest, con el objetivo de practicar pruebas de estrés y de carga.

Consiste en un crud de juegos.
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


La configuración de la base de datos se realiza en el archivo app.module.ts, donde se indica en la configuración de la base de datos, que cree las tablas necesarias de acuerdo a las entidades.


ejecución de tests de estrés y carga

```bash
$ k6 run performance/simple-test.js

```
Para ejecutar con grafana cloud

```bash
$ ks cloud login --token GRAFANA_API_KEY
$ k6 run --out cloud=GRAFANA_API_KEY performance/simple-test.js
```