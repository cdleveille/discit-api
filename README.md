# 🥏 DiscIt

RESTful API for disc golf discs.

Enables developers to programmatically access public disc information from the [Marshall Street Disc Golf Interactive Flight Guide](https://www.marshallstreetdiscgolf.com/flightguide) web page.

Check it out live on Heroku! [discitapi.herokuapp.com](https://discitapi.herokuapp.com)

## Fields

| Field        | Search Operator   | Description                                                                                                                   |
|--------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `name`*      | `LIKE`            | Name of the disc: `Aviar`, `Buzz`, `Crank SS`, etc.                                                                           |
| `brand`*     | `LIKE`            | Brand of the disc: `Innova`, `Discraft`, `Dynamic Discs`, etc.                                                                |
| `category`*  | `LIKE`            | `Distance Driver`, `Hybrid Driver`, `Control Driver`, `Midrange`, `Putter`                                                    |
| `speed`      | `=`               | The relative rate at which the disc can travel through the air: `1` to `15`                                                   |
| `glide`      | `=`               | The relative ability of the disc to maintain loft during its flight: `1` to `7`                                               |
| `turn`       | `=`               | The tendency of the disc to turn over or bank to the right (for RHBH throws) at the initial part of its flight: `+1` to `-5`  |
| `fade`       | `=`               | The tendency of the disc to hook left (for RHBH throws) at the end of its flight: `0` to `5`                                  |
| `stability`* | `=`               | `Stable`, `Overstable`, `Very Overstable`, `Understable`, `Very Understable`                                                  |
| `link`       | N/A               | Link to search for the disc in the Marshall Street Disc Golf web store                                                        |
| `pic`        | N/A               | Link to a picture showing the approximate flight shape of the disc                                                            |

\* This field uses a URL-friendly *slug* string for searches (e.g. `Crank SS` = `crank-ss`)

## Endpoints

| Method | Route              | Description                   |
|--------|--------------------|-------------------------------|
| `GET`  | `/disc`            | Get all discs                 |
| `GET`  | `/disc?`           | Search by custom query string |
| `GET`  | `/disc/name`       | Search by `name` field        |
| `GET`  | `/disc/brand`      | Search by `brand` field       |
| `GET`  | `/disc/category`   | Search by `category` field    |
| `GET`  | `/disc/speed`      | Search by `speed` field       |
| `GET`  | `/disc/glide`      | Search by `glide` field       |
| `GET`  | `/disc/turn`       | Search by `turn` field        |
| `GET`  | `/disc/fade`       | Search by `fade` field        |
| `GET`  | `/disc/stablility` | Search by `stability` field   |

See [/tools/requests.rest](https://github.com/cdleveille/discit/blob/main/tools/requests.rest) for example requests.

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

- Run `yarn start` to start the server. Disc data will be automatically upserted into the database at launch, and also every night at midnight.
  - Alternatively, run the `debug` launch configuration in VS Code (press `F5`).

## See Also

- [Marshall Street Disc Golf Interactive Flight Guide](https://www.marshallstreetdiscgolf.com/flightguide)
- [PDGA REST API Services](https://www.pdga.com/dev/api/rest/v1/services)
- [Flight Ratings System](https://www.innovadiscs.com/home/disc-golf-faq/flight-ratings-system/)
