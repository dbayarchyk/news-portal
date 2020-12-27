/// <reference types="cypress" />

const getRandomNumber = (upperBound) => Math.floor(Math.random() * upperBound);

context("Articles", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to read an article", () => {
    let articleTitleText;

    cy.get('[data-testid="article-preview"]')
      .then(($articlePreviews) => {
        const randomArticlePreviewIndex = getRandomNumber(
          $articlePreviews.length
        );
        const $randomArticlePreview =
          $articlePreviews[randomArticlePreviewIndex];

        cy.wrap($randomArticlePreview);
      })
      .within(() => {
        cy.get('[data-testid="article-title"]').then(($articleTitle) => {
          articleTitleText = $articleTitle.text();

          cy.wrap($articleTitle).click();
        });
      })
      .then(() => {
        cy.location("pathname").should("include", "/articles");
        cy.contains(articleTitleText);
        cy.get('[data-testid="article-preview-image"]');
        cy.get('[data-testid="article-content"]').should(($articleContent) => {
          const articleContentText = $articleContent.text();

          expect(articleContentText).to.have.length.greaterThan(0);
        });
      });
  });

  it("should be able to comment an article", () => {
    cy.get('[data-testid="article-preview"][data-are-comments-enabled="true"]')
      .then(($articlePreviews) => {
        const randomArticlePreviewIndex = getRandomNumber(
          $articlePreviews.length
        );
        const $randomArticlePreview =
          $articlePreviews[randomArticlePreviewIndex];

        cy.wrap($randomArticlePreview);
      })
      .within(() => {
        cy.get('[data-testid="article-title"]').click();
      });
  });
});
