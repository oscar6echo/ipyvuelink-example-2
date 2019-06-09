# ipyvuelink-example-2

## 1- Bootstapping

This project is generated via [@vue/cli](https://cli.vuejs.org/) with the following manually selected features:

- Babel
- Linter/Formatter
- ESLint + Prettier
- Lint on save
- config in dedicated files

Then the following extra configuration was applied:

- add vuetify plugin:
  - `vue add vuetify`
  - with default options

- add dev packages `yarn add xxx`:
  - vuex
  - lodash
  - highcharts
  - vue-property-decorator
  - ag-grid-community
  - ag-grid-vue
  - d3-time-format
  - d3-array
  - d3-format

- add dev packages `yarn add -D xxx`:
  - @vue/eslint-config-prettier
  - sass-loader
  - node-sass
    `
- [.eslintrc.js](.eslintrc.js) extra config - see comments
- [.prettierrc.js](.prettierrc.js) extra config - see comments
- [vue.config.js](.prettierrc.js) extra config - see comments

_Tip_: With VSCode create a custom shortcut for doc formatting different from the standard `Alt+Shift+F` (say `Alt+Shift+G`) to avoid conflicts.

vue-property-decorator
ag-grid-community
ag-grid-vue
d3-time-format
d3-array
d3-format
d3-scale
lodash
highcharts
vuex

## 2 - Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
