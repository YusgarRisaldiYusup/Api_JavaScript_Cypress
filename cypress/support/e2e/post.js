import "@shelex/cypress-allure-plugin";

const { generateUniqueEmail } = require("../emailGenerator"); // Sesuaikan path-nya // Sesuaikan path-nya

describe("gorest post API User testing", () => {
  it("Post new user - POST", () => {
    const uniqueEmail = generateUniqueEmail();

    // Set Up Payload
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
    });
  });
});
