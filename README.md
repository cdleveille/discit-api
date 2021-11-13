# DiscIt

RESTful API for disc golf discs.

Enables developers to programmatically access public disc information from the [Marshall Street Disc Golf Interactive Flight Guide](https://www.marshallstreetdiscgolf.com/flightguide) web page.

Check it out live on Heroku! [discitapi.herokuapp.com/disc](https://discitapi.herokuapp.com/disc)

## Fields

| Field       | Search Operator   | Description                                                                                                             |
|-------------|-------------------|-------------------------------------------------------------------------------------------------------------------------|
| `name`      | `LIKE`            | Name/title of the disc mold ['Aviar', 'Buzz', 'Crank SS', etc.]. A *slug* of the name is used for searches (see below).   |
| `brand`     | `LIKE`            | Brand/manufacturer of the disc ['innova', 'discraft', 'discmania', etc.]                                                |
| `category`  | `LIKE`            | ['distance-driver', 'hybrid-driver', 'control-driver', 'midrange', 'putter']                                            |
| `speed`     | `=`               | The rate at which a disc can travel through the air [1 to 15]                                                           |
| `glide`     | `=`               | The ability of a disc to maintain loft during its flight [1 to 7]                                                       |
| `turn`      | `=`               | The tendency of a disc to turn over or bank to the right (for RHBH throws) at the initial part of its flight [+1 to -5] |
| `fade`      | `=`               | The tendency of a disc to hook left (for RHBH throws) at the end of its flight [0 to 5]                                 |
| `stability` | `=`               | ['stable', 'overstable', 'very-overstable', 'understable', 'very-understable']                                          |
| `link`      | N/A               | Link to search for this disc in the Marshall Street Disc Golf web store                                                 |
| `pic`       | N/A               | Link to a picture showing the approximate flight shape of this disc                                                     |
| `slug`      | `LIKE`            | A simplified, URL-friendly version of the disc name used for search comparisons ['kc-aviar', 'nuke-ss', 'd1-max', etc.] |

## Endpoints

| Method | Route                   | Description                       |
|--------|-------------------------|-----------------------------------|
| `GET`  | `/disc`                 | Get all discs                     |
| `GET`  | `/disc/?query`          | Search by query string            |
| `GET`  | `/disc/name/:val`       | Search by name/title              |
| `GET`  | `/disc/brand/:val`      | Search by brand/manufacturer      |
| `GET`  | `/disc/category/:val`   | Search by category/type           |
| `GET`  | `/disc/speed/:val`      | Search by speed flight number     |
| `GET`  | `/disc/glide/:val`      | Search by glide flight number     |
| `GET`  | `/disc/turn/:val`       | Search by turn flight number      |
| `GET`  | `/disc/fade/:val`       | Search by fade flight number      |
| `GET`  | `/disc/stablility/:val` | Search by stability flight number |

See [/dev/requests.rest](https://github.com/cdleveille/discit/blob/main/dev/requests.rest) for example requests.

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
