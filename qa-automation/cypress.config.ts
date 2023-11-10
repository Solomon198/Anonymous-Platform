import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    failOnStatusCode: false,
  },
  e2e: {
    baseUrl: "https://anonymous.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
