# DiscIt

RESTful API for disc golf discs.

Enables developers to programatically access public disc information from the [Marshall Street Disc Golf Interactive Flight Guide](https://www.marshallstreetdiscgolf.com/flightguide) web page.

```text
GET    /disc                  Get all discs
GET    /disc/name/:val        Search by name/title
GET    /disc/brand/:val       Search by brand/manufacturer
GET    /disc/category/:val    Search by category/type
GET    /disc/speed/:val       Search by speed flight number
GET    /disc/glide/:val       Search by glide flight number
GET    /disc/turn/:val        Search by turn flight number
GET    /disc/fade/:val        Search by fade flight number
GET    /disc/stability/:val   Search by stability rating
```

The `/disc` route also supports query strings which can be used to search by multiple fields:

```text
GET    /disc?brand=innova&category=putter&stability=overstable
```

---

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [MikroORM](https://mikro-orm.io/)
- [PostgreSQL](https://www.postgresql.org/)

---

## Local Setup

Install prerequisites:

- [Node.js](https://nodejs.org/en/download/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (plus [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-manual) if on Windows)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Yarn](https://classic.yarnpkg.com/en/) (`npm i -g yarn`)

Also recommended:

- [Azure Data Studio](https://azure.microsoft.com/en-us/services/developer-tools/data-studio/) (plus [PostgreSQL extension](https://docs.microsoft.com/en-us/sql/azure-data-studio/extensions/postgres-extension?view=sql-server-ver15))

Set up dev environment:

- Clone repo and open root folder in VS Code.
- Install recommended VSCode extensions `Docker` and `ESLint`.
- Run `yarn install` to install package dependencies.
- Create and populate a `.env` file in the root folder based on the `.env.template` file.

Set up local dev database:

- Open Docker Desktop and leave it running in the background.
- In VS Code, right-click on `discit-dev-container\docker-compose.yml` and select `Compose Up`.
- Run `yarn db:up` to execute the default database migration checked into source control.
  - If schema changes are subsequently made, run `yarn db:create` to generate a new migration and `yarn db:up` to execute it.

Launch:

- Run `yarn start` to start the server. Disc data will be loaded into the database if none already exists.
  - Alternatively, run the `debug` launch configuration in VS Code (press `F5`).

## See Also

- [Marshall Street Disc Golf Interactive Flight Guide](https://www.marshallstreetdiscgolf.com/flightguide)
- [PDGA REST API Services](https://www.pdga.com/dev/api/rest/v1/services)
