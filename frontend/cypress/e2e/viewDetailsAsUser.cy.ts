/// <reference types="cypress" />

// This is a Cypress test for viewing project details as a user
// It navigates to a specific project and verifies the project information
describe("template spec", () => {
  it("goes to Project Alpha and verifies project info", () => {
    cy.visit("http://localhost:5173");

    cy.get("form").submit();

    cy.contains("My Projects").click();

    cy.contains("Project Alpha").click();

    cy.contains("Company A").should("exist");
    cy.contains("Developer").should("exist");
    cy.contains("9.04.2025-9.10.2025").should("exist");
    cy.contains("First unique project for user1").should("exist");
  });
});
