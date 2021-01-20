/// <reference types="cypress" />

context("Salaries", () => {
  beforeEach(() => {
    cy.visit("/salaries");
  });

  it("should be able to see the report grouped by technology ", () => {
    cy.get("button#technology").click();
    cy.get('[data-testid="salary-report-item"]').should(($items) => {
      expect($items).to.have.length.greaterThan(0);
    });
  });

  it("should be able to see the report grouped by position ", () => {
    cy.get("button#position").click();
    cy.get('[data-testid="salary-report-item"]').should(($items) => {
      expect($items).to.have.length.greaterThan(0);
    });
  });

  it("should be able to see the report grouped by city ", () => {
    cy.get("button#city").click();
    cy.get('[data-testid="salary-report-item"]').should(($items) => {
      expect($items).to.have.length.greaterThan(0);
    });
  });
});
