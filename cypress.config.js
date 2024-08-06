const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  reporter: "junit", // Menyediakan reporter untuk Allure
  reporterOptions: {
    mochaFile: "allure-results/results-[hash].xml",
    toConsole: true,
  },

  projectId: "jbonux",
  e2e: {
    baseUrl: "https://gorest.co.in/",
    specPattern: "cypress/support/e2e/*.js",
    supportFile: false,
    setupNodeEvents(on, config) {
      config.env.apiHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer 0a169a5976f1eaf948eebc375c879a1422812aae6ffda94e9ce18214b54d1daf",
      };

      config.env.CYPRESS_DASHBOARD_PROJECT_ID = process.env.CYPRESS_DASHBOARD_PROJECT_ID;
      config.env.PERSONAL_TOKEN = process.env.PERSONAL_TOKEN;

      allureWriter(on, config);
      return config;
    },
  },
});
