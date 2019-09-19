# Dijkstra Visualizer

A Dijkstra Visualizer built with React.

**Note:** This project is in early development stage (we still evaluate the idea). You should expect hard fails, security vulnerabilities and non-tested code.

## Clone the repository

We use [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). To clone the repo, be sure to pass the `--recursive` option to `git clone` command and fetch all the required sub-modules.

```bash
git clone --recursive https://github.com/GeorgeGkas/dijkstra-visualizer.git
```

## Configuration

We provide separate development and production configuration options using `.env` files. Before build and/or run the app, navigate to `config` folder and set the appropriate configuration variables.

## Build & Run

1. Install Node.js dependencies (using `yarn`).
2. Build the project using `yarn build`.
3. Start the project with `yarn start`.

This repository contains both the front-end, built with **React**, and the back-end, built with **Express** and **MongoDB**. Refer to each folder respectively for more details about the source code.

## Development

- To run the React app navigate to `frontend` and execute `yarn start`.
- To run the Express server navigate to `backend` and execute `yarn dev`.

## License

The source code of this project is licensed under MIT. See [LICENSE.md](LICENSE.md) for details.
