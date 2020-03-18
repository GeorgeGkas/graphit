# graph IT

Interactive graph editor for Computer Science enthusiasts.

- Choose between various visualizers such as Dijkstra SPF and Automata (NFA, DFA).
- Specifically designed for educators and students.
- Feature rich interactive editor for all supported projects.
- Unlimited online storage for sign in members to save their projects.
- Ability to download project files.

## Clone the repository

We use [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). To clone the repo, be sure to pass the `--recursive` option to `git clone` command and fetch all the required sub-modules.

```bash
git clone --recursive https://github.com/GeorgeGkas/dijkstra-visualizer.git
```

## Configuration

We provide separate development and production configuration options using `.env` files. Before build and/or run the app, navigate to `config` folder and set the appropriate configuration variables.

## Front End (React)

The front-end was built with React. Navigate to `client` directory for more info.

## Back End (Firebase)

The back-end was built with firebase SDK. Navigate to `functions` directory for more info.

## License

The source code of this project is licensed under MIT. See [LICENSE.md](LICENSE.md) for details.
