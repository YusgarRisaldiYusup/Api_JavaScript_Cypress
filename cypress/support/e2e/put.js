import "@shelex/cypress-allure-plugin";

const { generateUniqueEmail } = require("../emailGenerator"); // mengimpr email generator
describe("gorest Put User testing", () => {
  it("Create and then update user - POST and PUT", () => {
    // Membuat user baru
    const uniqueEmail = generateUniqueEmail(); // Menyimpan generator email kedlm variabel unique email

    const createPayload = {
      name: "Yusgar Risaldi",
      email: uniqueEmail, // menggunakan unique email
      gender: "male",
      status: "active",
    };

    // Melakukan permintaan POST untuk membuat user
    cy.request({
      method: "POST",
      url: "public/v2/users", // URL relatif dari baseUrl
      headers: Cypress.env("apiHeaders"), // Menggunakan konfigurasi headers dari env
      body: createPayload,
    }).as("Test_Create");

    cy.get("@Test_Create").then((createResponse) => {
      expect(createResponse.status).to.equal(201);
      expect(createResponse.body).to.have.property("name", "Yusgar Risaldi");
      expect(createResponse.body).to.have.property("email");
      expect(createResponse.body).to.have.property("status", "active");
      expect(createResponse.body).to.have.property("gender", "male");

      const userId = createResponse.body.id; // Ambil ID dari user yang baru dibuat

      // Mendapatkan user yang baru dibuat
      cy.request({
        method: "GET",
        url: `public/v2/users/${userId}`, // URL untuk mendapatkan user yang baru dibuat
        headers: Cypress.env("apiHeaders"), // Menggunakan konfigurasi headers dari env
      }).as("Test_Get_One");

      cy.get("@Test_Get_One").then((getResponse) => {
        expect(getResponse.status).to.equal(200);
        expect(getResponse.body).to.be.an("object");
        const userAktif = getResponse.body;
        expect(userAktif).to.have.property("id");
        expect(userAktif).to.have.property("name");
        expect(userAktif).to.have.property("email");

        // Menyiapkan payload dengan perubahan
        const updatePayload = {
          ...userAktif, // Menggunakan data yang diambil dari get one
          name: "yusgar edit", // Mengubah nama
        };

        // Melakukan permintaan PUT untuk memperbarui user
        cy.request({
          method: "PUT",
          url: `public/v2/users/${userId}`, // URL untuk memperbarui user yang baru dibuat
          body: updatePayload,
          headers: Cypress.env("apiHeaders"),
        }).then((putResponse) => {
          // Verifikasi hasil permintaan PUT
          expect(putResponse.status).to.equal(200);
          expect(putResponse.body).to.be.an("object");
          expect(putResponse.body).to.have.property("name", "yusgar edit");
        });
      });
    });
  });
});
