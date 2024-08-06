import "@shelex/cypress-allure-plugin";

const { generateUniqueEmail } = require("../emailGenerator"); // Sesuaikan path-nya

describe("gorest delete API User testing", () => {
  it("Post new user and then delete it - POST and DELETE", () => {
    const uniqueEmail = generateUniqueEmail();

    const payload = {
      name: "Yusgar Risaldi",
      email: uniqueEmail,
      gender: "male",
      status: "active",
    };

    cy.request({
      method: "POST",
      url: "public/v2/users", // URL relatif dari baseUrl
      headers: Cypress.env("apiHeaders"), // Menggunakan konfigurasi headers dari env
      body: payload,
    }).as("Test_Create");

    cy.get("@Test_Create").then((Response) => {
      expect(Response.status).to.equal(201);
      expect(Response.body).to.have.property("name", "Yusgar Risaldi");
      expect(Response.body).to.have.property("email");
      expect(Response.body).to.have.property("status", "active");
      expect(Response.body).to.have.property("gender", "male");

      const userId = Response.body.id; // Ambil ID dari user yang baru dibuat

      // Menghapus pengguna yang baru dibuat
      cy.request({
        method: "DELETE",
        url: `public/v2/users/${userId}`, // Gunakan backticks untuk interpolasi variabel
        headers: Cypress.env("apiHeaders"),
      }).as("Test_Delete");

      cy.get("@Test_Delete").then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(204);
      });
    });
  });
});
