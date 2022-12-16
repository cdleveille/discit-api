# 🥏 DiscIt API

RESTful API for disc golf discs.

Enables developers to programmatically access public disc information from the [Marshall Street Disc Golf Interactive Flight Guide](https://www.marshallstreetdiscgolf.com/flightguide) web page. Disc data is refreshed nightly.

Check it out live on fly.io! [discit-api.fly.dev](https://discit-api.fly.dev)

## Endpoints

| Method | Route         | Description              | 404 Response Body |
| ------ | ------------- | ------------------------ | ----------------- |
| `GET`  | `/disc`       | Get all discs            | N/A               |
| `GET`  | `/disc?`      | Search discs by field(s) | `[]`              |
| `GET`  | `/disc/:id`   | Get disc by id           | `null`            |
| `GET`  | `/disc/:name` | Get disc by name         | `null`            |

## Example Requests

-   All discs: `/disc`
-   By one field: `/disc?stability=very-overstable`
-   By multiple fields: `/disc?brand=innova&category=control-driver`
-   By id: `/disc/8ddd0d56-b63c-5d65-9737-1a380b93cc23`
-   By name: `/disc/buzzz`

Refer to the **Fields** section below for all possible query string parameters.

## Fields

| Field              | Is Searchable | Search Operator | Description                                                                                                                  |
| ------------------ | ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `id`               | Yes           | `=`             | Unique identifier for the disc hashed from its `name` and `brand` values                                                     |
| `name`\*           | Yes           | `LIKE`          | Name of the disc: `Aviar`, `Buzz`, `Crank SS`, etc.                                                                          |
| `brand`\*          | Yes           | `LIKE`          | Brand of the disc: `Innova`, `Discraft`, `Dynamic Discs`, etc.                                                               |
| `category`\*       | Yes           | `LIKE`          | `Distance Driver`, `Hybrid Driver`, `Control Driver`, `Midrange`, `Putter`                                                   |
| `speed`            | Yes           | `=`             | The relative rate at which the disc can travel through the air: `1` to `15`                                                  |
| `glide`            | Yes           | `=`             | The relative ability of the disc to maintain loft during its flight: `1` to `7`                                              |
| `turn`             | Yes           | `=`             | The tendency of the disc to turn over or bank to the right (for RHBH throws) at the initial part of its flight: `+1` to `-5` |
| `fade`             | Yes           | `=`             | The tendency of the disc to hook left (for RHBH throws) at the end of its flight: `0` to `5`                                 |
| `stability`\*      | Yes           | `=`             | `Stable`, `Overstable`, `Very Overstable`, `Understable`, `Very Understable`                                                 |
| `link`             | No            | N/A             | Link to search for the disc in the Marshall Street Disc Golf web store                                                       |
| `pic`              | No            | N/A             | Link to a picture showing the approximate flight shape of the disc                                                           |
| `color`            | No            | N/A             | Text color for the disc on the Marshall Street Flight Guide page                                                             |
| `background_color` | No            | N/A             | Background color for the disc on the Marshall Street Flight Guide page                                                       |

\* This field uses a URL-friendly **slug** string for searches. All non-alphanumeric characters are stripped out, and each space is replaced with a hyphen (e.g. `Crank SS` = `crank-ss`, `#1 Driver` = `1-driver`).

## Setup

-   Install prerequisites:
    -   [Node.js](https://nodejs.org/en/download/)
    -   [Visual Studio Code](https://code.visualstudio.com/download) (with [Docker Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker))
    -   [Docker Desktop](https://www.docker.com/)
-   Clone repo and open in VS Code.
-   Install yarn: `npm i -g yarn`
-   Install package dependencies: `yarn`
-   Create and populate a `.env` file based on `.env.example`.
-   Launch Docker Desktop. In VS Code, right-click `.discit-dev-container\docker-compose.yml` and select `Compose Up` to initialize database container.
-   Press `F5` or run `yarn dev` to run in dev mode (server restarts on file save).
-   Server will listen for requests on [localhost:3000](http://localhost:3000/).

## Technologies

-   [TypeScript](https://www.typescriptlang.org/)
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)

## See Also

-   [DiscIt](https://github.com/cdleveille/discit)
-   [Marshall Street Disc Golf Interactive Flight Guide](https://www.marshallstreetdiscgolf.com/flightguide)
-   [PDGA REST API Services](https://www.pdga.com/dev/api/rest/v1/services)
-   [Flight Ratings System](https://www.innovadiscs.com/home/disc-golf-faq/flight-ratings-system/)
