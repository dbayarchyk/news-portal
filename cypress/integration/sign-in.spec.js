/// <reference types="cypress" />

context("Sign In", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });

  it("should be able to sing in", () => {
    cy.get("input#email").type(Cypress.env('USER_EMAIL'));
    cy.get("input#password").type(Cypress.env('USER_PASSWORD'));
    cy.get("button").contains("Sign In").click();
    cy.location("pathname").should("be.equal", "/");
  });
});
