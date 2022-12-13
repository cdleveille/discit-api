# 🥏 DiscIt API

RESTful API for disc golf discs.

Enables developers to programmatically access public disc information from the [Marshall Street Disc Golf Interactive Flight Guide](https://www.marshallstreetdiscgolf.com/flightguide) web page.

Check it out live on fly.io! [discit-api.fly.dev](https://discit-api.fly.dev)

## Endpoints

| Method | Route   | Description   |
| ------ | ------- | ------------- |
| `GET`  | `/disc` | Get all discs |

## Fields

| Field              | Is Searchable | Search Operator | Description                                                                                                                  |
| ------------------ | ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
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

## Example Requests

-   All discs: `/disc`
-   By one field: `/disc?stability=very-overstable`
-   By multiple fields: `/disc?brand=innova&category=control-driver`

See the **Fields** section above for all possible query string parameters.

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
