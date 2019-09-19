# Dijkstra Visualizer API

Back-end services for Dijkstra Visualizer.

## Architecture

- Platform: **Node.js v12**
- Language: **Typescript** _(built with ES2018, compiles down to ES5 for backwards compatibility with older Node versions)_
- Authentication: **Google OAuth 2.0** and **JWT**
- Database: **MongoDB**
- Web Server: **Express v4**

## Running the server

1. Set up MongoDB.
2. Go to `config/auth.ts` and provide your own credentials.
3. Go to `config/dev.ts` and change `db` to your own MongoDB URI. Optionally specify another `server.port`. The configurations apply to development environment (`yarn dev`).
4. Go to `config/dev.ts` and change `db` to your own MongoDB URI. Optionally specify another `server.port`. The configurations apply to production environment (`yarn start`).
5. Build the project using `yarn build` or `npm run build`.
6. Start the production server with `yarn start` or `npm start`.

## Development

Start the development server with `yarn dev` (provides hot-reload functionality using [nodemon](https://nodemon.io/)).

### Env

We expose the following environmental variables:

- `MONGO_URI`: A mongodb URI.
- `PORT`: Server port to run the server.
- `NODE_ENV`: Either `production` or `dev`.

## License

The source code of this project is licensed under MIT. See [LICENSE.md](LICENSE.md) for details.
