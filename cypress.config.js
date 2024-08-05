const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: process.env.CYPRESS_DASHBOARD_PROJECT_ID, // Mengambil Project ID dari variabel lingkungan
  e2e: {
    baseUrl: "https://gorest.co.in/",
    specPattern: "cypress/support/e2e",
    supportFile: false,
    setupNodeEvents(on, config) {
      // Menyiapkan header yang nantinya dapat dipanggil
      config.env.apiHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer 0a169a5976f1eaf948eebc375c879a1422812aae6ffda94e9ce18214b54d1daf",
      };

      // Menambahkan variabel lingkungan untuk Cypress Dashboard
      config.env.CYPRESS_DASHBOARD_PROJECT_ID = process.env.CYPRESS_DASHBOARD_PROJECT_ID;
      config.env.CYPRESS_DASHBOARD_RECORD_KEY = process.env.CYPRESS_RECORD_KEY;

      return config;
    },
  },
});
