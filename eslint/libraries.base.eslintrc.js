module.exports = (basePath) => ({
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
    //due to vscode extension, this value should be provided by the package
    // importing this.
    tsconfigRootDir: basePath,
  },
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/no-object-literal-type-assertion": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "no-console": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-parameter-properties": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "guard-for-in": 0,
    "quotes": "off",
    "@typescript-eslint/quotes": "off"
  },
});
