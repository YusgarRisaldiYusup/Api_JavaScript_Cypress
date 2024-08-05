describe("gorest get API User testing", () => {
  it("get all users - GET", () => {
    cy.request("public/v2/users").as("Test_Get_All");
    cy.get("@Test_Get_All").then((Response) => {
      expect(Response.status).to.equal(200);
      expect(Response.body).to.be.an("array");
      const firstUser = Response.body[0];
      expect(firstUser).to.have.property("id");
      expect(firstUser).to.have.property("name");
      expect(firstUser).to.have.property("email");
    });
  });
});
