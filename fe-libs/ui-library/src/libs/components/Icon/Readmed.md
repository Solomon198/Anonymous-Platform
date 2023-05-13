##### Icon

-   You have to create context from the method `createIconContext` exposed from this component and pass your icons pack to the context then you can use the `Icon` component returned by the `createIconContext` and wrap your application around the `Provider` returned also;

-   For the icon context provider the `icons` props from pack needs to be passed.

-   Note don't pass this icon to `startIcon` or `endIcon` of the Button component. It will not adjust well with variant `contained` on the button component but works well with other variant. Note this incase you still want to use it. To be safe and not have to worry about anything Just import the Icon like you will from your default export and pass it to Button component.

| props  | value  | description                                                          |
| ------ | ------ | -------------------------------------------------------------------- |
| size?  | number | size of icon                                                         |
| color? | string | color of icon matching theme configured colors `primary`,`secondary` |
| name   | string | Icon name as exported from Icon pack configured                      |

```js
// doSomeWhere.js
// do this first somewhere in your application
import { createIconContext } from '..' // path to the main icon component
import * as DefaultIcons from '../../libs/components/Icon/defaultIconImport.unicorn'

const IconContext = createIconContext({ icons: DefaultIcons })

export const Icon = IconContext.Icon
export const IconProvider = IconContext.Provider
```

```js
import { Provider as IconProvider } from 'doSomeWhere'

//Wrap it around the root of your application
```

```js
import { Grid, Box } from '@mui/material'
import {Icon} from 'doSomeWhere'

<Box justifyContent="space-around">
  <Icon name="ArrowUp" />
  <Icon name="ArrowDown" />
  <Icon name="Minus" />
  <Icon name="Plus" />
  <Icon name="Copy" />
  <Icon name="Calender" />
  <Icon name="Check" />
  <Icon name="CheckCircle" />
  <Icon name="Trash" />
</Boxlex>;
```

```js
<Box>
    <Icon size={50} color="primary" name="Calender" />
    <Icon size={100} color="secondary" name="Calender" />
    <Icon size={150} color="primary" name="Calender" />
    <Icon size={200} color="secondary" name="Calender" />
    <Icon size={250} color="primary" name="Calender" />
</Box>
```
