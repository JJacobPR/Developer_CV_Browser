/// <reference types="cypress" />

// This is a Cypress test for adding a new project in the application
// It fills out the project form and submits it, then verifies that the project appears in the list of projects
describe("Add new project", () => {
  it("fills and submits project form", () => {
    cy.visit("http://localhost:5173");

    cy.get("form").submit();

    cy.contains("Add Project").click();

    cy.get("label").contains("Project Name").parent().find("input").type("Project X");
    cy.get("label").contains("Company Name").parent().find("input").type("Company X");
    cy.get("label").contains("Role").parent().find("input").type("Lead");
    cy.get("label").contains("Description").parent().find("textarea").type("Description for Project X");

    cy.get("label").contains("Start Date").parent().find("input[type=date]").type("2025-10-01");
    cy.get("label").contains("End Date").parent().find("input[type=date]").type("2026-10-01");

    cy.get("span").contains("React").click();
    cy.get("span").contains("Node.js").click();

    cy.get("button[type=submit]").click();

    cy.contains("Confirm").click();

    cy.contains("Project X").should("exist");
    cy.contains("Company X").should("exist");
    cy.contains("Lead").should("exist");
    cy.contains("Description for Project X").should("exist");
  });
});
