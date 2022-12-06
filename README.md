# 🥏 DiscIt API

RESTful API for disc golf discs.

Enables developers to programmatically access public disc information from the [Marshall Street Disc Golf Interactive Flight Guide](https://www.marshallstreetdiscgolf.com/flightguide) web page.

Check it out live on fly.io! [discit-api.fly.dev/disc](https://discit-api.fly.dev/disc)

## Fields

| Field              | Search Operator   | Description                                                                                                                   |
|--------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `name`*            | `LIKE`            | Name of the disc: `Aviar`, `Buzz`, `Crank SS`, etc.                                                                           |
| `brand`*           | `LIKE`            | Brand of the disc: `Innova`, `Discraft`, `Dynamic Discs`, etc.                                                                |
| `category`*        | `LIKE`            | `Distance Driver`, `Hybrid Driver`, `Control Driver`, `Midrange`, `Putter`                                                    |
| `speed`            | `=`               | The relative rate at which the disc can travel through the air: `1` to `15`                                                   |
| `glide`            | `=`               | The relative ability of the disc to maintain loft during its flight: `1` to `7`                                               |
| `turn`             | `=`               | The tendency of the disc to turn over or bank to the right (for RHBH throws) at the initial part of its flight: `+1` to `-5`  |
| `fade`             | `=`               | The tendency of the disc to hook left (for RHBH throws) at the end of its flight: `0` to `5`                                  |
| `stability`*       | `=`               | `Stable`, `Overstable`, `Very Overstable`, `Understable`, `Very Understable`                                                  |
| `link`             | N/A               | Link to search for the disc in the Marshall Street Disc Golf web store                                                        |
| `pic`              | N/A               | Link to a picture showing the approximate flight shape of the disc                                                            |
| `color`            | N/A               | Text color for the disc on the Marshall Street Flight Guide page                                                              |
| `background_color` | N/A               | Background color for the disc on the Marshall Street Flight Guide page                                                        |

\* This field uses a URL-friendly *slug* string for searches (e.g. `Crank SS` = `crank-ss`, `#1 Driver` = `1-driver`)

## Endpoints

| Method | Route              | Description                   |
|--------|--------------------|-------------------------------|
| `GET`  | `/disc`            | Get all discs                 |

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## See Also

- [DiscIt](https://github.com/cdleveille/discit)
- [Marshall Street Disc Golf Interactive Flight Guide](https://www.marshallstreetdiscgolf.com/flightguide)
- [PDGA REST API Services](https://www.pdga.com/dev/api/rest/v1/services)
- [Flight Ratings System](https://www.innovadiscs.com/home/disc-golf-faq/flight-ratings-system/)
