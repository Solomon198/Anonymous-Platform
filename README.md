#### 1. Monorepo Setup

To start using the monorepo the following instruction will help you kickstart using the monorepo

#### 2. Intial Setup

- Assuming you have not `cloned` this repo before, you can run the following on the directory you want to manage project.

````bash
  git clone https://github.com/Solomon198/Anonymous-Platform.git

- To install all dependecies in all workspaces run the following command. make sure you run this command to ensure that all dependencies are synced.

```bash
  npm ci
````

#### 3. Setting up pre-push and pre-commit hooks

- Run `git config --local include.path ../.gitconfig` on the monorepo root directory

#### 4. Project Management Scripts

- To deletes `build`, `dist` and `node_modules` directory in the monorepo run

```bash
   npm run clean
```

- To run lint for the entire project run

```bash
npm run lint
```

- `Note` Since we are using a monorepo this command is important for you to this command before attempting to run any main project(frontends,backends). because each of the frontends and backends will rely on packages to be built before they can run in `developement` or during production build. In cases where you update any shared library you have to run this command before starting the main project.

```bash
npm run build:libs
```

- To deletes all node_modules directories in the monorepo run

```bash
npm run clean:node_modules
```

- To run test in all the monorepo you can run this

```bash
 npm run test
```

## Runing Anonymous

- To run the project you have run the following in the monorepo root directory. Incase you don't want to run project from the monorepo root directory, you can build the libraries and then navigate to the project you want and start it.

```bash
npm run build:libs # build libraries in the monorepo
npm run start:anonymous
```
