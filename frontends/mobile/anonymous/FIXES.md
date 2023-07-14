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

#### FIX RUNING APP SCRIPT

After adding react-native-navigation from wix we experienced an issue where runing `react-native run-android` returns this error

```bash
   Build file '/Users/user/Documents/Work/Personal/Projects/Anonymous/frontends/mobile/anonymous/node_modules/react-native-navigation/lib/android/app/build.gradle' line: 47

* What went wrong:
Execution failed for task ':tasks'.
> Could not create task ':react-native-navigation:testReactNative71DebugUnitTest'.
   > No signature of method: org.gradle.api.reporting.internal.TaskGeneratedSingleDirectoryReport.enabled() is applicable for argument types: (Boolean) values: [true]

```

Looking at the error critically we observed that at `build.gradle` in react-native-navigation/lib in node_modules at line 47 this line of code at line 47 causes the failure and when commented out everything works fine.

```java
            reports {
                html.enabled true // this line
            }
```

**SOLUTION**
To Avoid manual removing of that line, we modified the run script in package.json to

```js
  "android": "cd ./android && ./gradlew app:assembleDebug && ./gradlew installDebug && npm start",
  ...
```
