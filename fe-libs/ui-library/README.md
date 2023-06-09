## @dixre/ui-library

This is the ui-library that allows us to build reusable react components that we can share throughout the monorepo.

`Note`

-   We use this library directly in our frontends which means changes made here are immediately applied and not versioned, we might decide to change this design and publish to `npm repository` in the future.
-   The components here are highly reusable and are subject to change as far as changes don't defy any of our rules.

## Setting up Library

To setup library simply run `npm i` or ignore if you have run `npm ci` from the root directory of the monorepo. Regardeless follow this commands and you should be fine.

```bash
  npm i ## install dependecies
  npm run start # starts the ui-library
```

## How to contribute

In other to contribute to this library please follow the guidelines.

-   Goto the `src/playgrounds` copy a playground e.g `Chatto` and change the folder name to your name e.g Somebody
-   Goto `src/playgrounds/index.ts` and import your folder and add it to the exports like this

```js
import Solomon from './Solomon'
import Chatto from './Chatto'
import Somebody from './Somebody'

export default {
    Solomon,
    Chatto,
    Somebody,
}
```

That is it!. save and you will see your name at the left side of the menu. click on your workspace to see the content.you can modify the content of `index.tsx` on your folder and see how it changes.

-   There is also a moon icon at the top left corner, you can toggle it change theme of the application. Any component you build must adhere to theme convention, the toggle is there to help you see that your component is compatible with theme.

## Scripts

To test library the following command. You can apply all jest command option to test as you desire.

```bash
npm run test # run all test in the library
```

To build project simply run the following

```bash
 npm run build
```

Other scripts are available in the package.json scripts.
