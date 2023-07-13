## Fixes

We try to document any hack or fixes to this codebase so we keep in sync why certains things are done.

#### USE OF `intl-pluralrules`

We use this package `intl-pluralrules` which is a polyfill because of the following error

```bash
  ERROR  i18next::pluralResolver: Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.
```

At index.js we import this package before the main `i18next` like this

```js
import 'intl-pluralrules';
import './i18next';
```
