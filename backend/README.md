# Dijkstra Visualizer API

Back-end services for Dijkstra Visualizer.

## Architecture

- Platform: **Node.js v12**
- Language: **Typescript** _(built with ES2018, compiles down to ES5 for backwards compatibility with older Node versions)_
- Authentication: **Google OAuth 2.0** and **JWT**
- Database: **MongoDB**
- Web Server: **Express v4**

## Running the server

1. Clone the repo `https://github.com/GeorgeGkas/dijkstra-visualizer.git`.
2. Set up MongoDB.
3. Install Node.js v12 (you can use [nvm](https://github.com/nvm-sh/nvm)) if you are using another Node version.
4. Install Node.js dependencies (using `yarn` or `npm i`).
5. Go to `config/auth.ts` and provide your own credentials.
6. Go to `config/dev.ts` and change `db` to your own MongoDB URI. Optionally specify another `server.port`. The configurations apply to development environment (`yarn dev`).
7. Go to `config/dev.ts` and change `db` to your own MongoDB URI. Optionally specify another `server.port`. The configurations apply to production environment (`yarn start`).
8. Build the project using `yarn build` or `npm run build`.
9. Start the production server with `yarn start` or `npm start`.

## Development

Start the development server with `yarn dev` (provides hot-reload functionality using [nodemon](https://nodemon.io/)).

## License

The source code of this project is licensed under MIT. See [LICENSE.md](LICENSE.md) for details.
