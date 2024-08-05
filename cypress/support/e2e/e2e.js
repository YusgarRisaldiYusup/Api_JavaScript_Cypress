const { generateUniqueEmail } = require("../emailGenerator"); // Sesuaikan path-nya

describe("gorest End-to-End User Testing", () => {
  it("Create, update, and then delete user - POST, GET, PUT, and DELETE", () => {
    // 1. Ambil semua user
    cy.request({
      method: "GET",
      url: "public/v2/users", // URL untuk mendapatkan semua user
      headers: Cypress.env("apiHeaders"),
    }).as("Test_Get_All_Users");

    cy.get("@Test_Get_All_Users").then((allUsersResponse) => {
      expect(allUsersResponse.status).to.equal(200);
      expect(allUsersResponse.body).to.be.an("array");

      // 2. Buat user baru
      const uniqueEmail = generateUniqueEmail(); // Menyimpan generator email dalam variabel uniqueEmail

      const createPayload = {
        name: "Yusgar Risaldi",
        email: uniqueEmail,
        gender: "male",
        status: "active",
      };

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

        // 3. Ambil user yang baru dibuat
        cy.request({
          method: "GET",
          url: `public/v2/users/${userId}`, // URL untuk mendapatkan user yang baru dibuat
          headers: Cypress.env("apiHeaders"),
        }).as("Test_Get_One");

        cy.get("@Test_Get_One").then((getResponse) => {
          expect(getResponse.status).to.equal(200);
          expect(getResponse.body).to.be.an("object");
          const userAktif = getResponse.body;
          expect(userAktif).to.have.property("id");
          expect(userAktif).to.have.property("name");
          expect(userAktif).to.have.property("email");

          // 4. Update user yang baru dibuat
          const updatePayload = {
            ...userAktif, // Menggunakan data yang diambil dari get one
            name: "yusgar edit", // Mengubah nama
          };

          cy.request({
            method: "PUT",
            url: `public/v2/users/${userId}`, // URL untuk memperbarui user yang baru dibuat
            body: updatePayload,
            headers: Cypress.env("apiHeaders"),
          }).as("Test_Update");

          cy.get("@Test_Update").then((putResponse) => {
            expect(putResponse.status).to.equal(200);
            expect(putResponse.body).to.be.an("object");
            expect(putResponse.body).to.have.property("name", "yusgar edit");

            // 5. Hapus user yang baru dibuat
            cy.request({
              method: "DELETE",
              url: `public/v2/users/${userId}`, // URL untuk menghapus user yang baru dibuat
              headers: Cypress.env("apiHeaders"),
            }).as("Test_Delete");

            cy.get("@Test_Delete").then((deleteResponse) => {
              expect(deleteResponse.status).to.equal(204); // Status 204 menunjukkan penghapusan berhasil
            });
          });
        });
      });
    });
  });
});
