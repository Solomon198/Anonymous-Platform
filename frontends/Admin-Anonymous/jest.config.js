const { defaults: tsjPreset } = require('ts-jest/presets')
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\](?:(?!@crazy-devz).+)\\.(js|jsx|mjs|cjs|ts|tsx)$",
  ],
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    ...tsjPreset.transform,
    // [...]
  },
//   moduleNameMapper: {
//     "axios": "axios/dist/node/axios.cjs"
//   }
}