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

  describe("when an article allows comments", () => {
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

      cy.contains("Sign in to leave a comment").click();
      cy.get("input#email").type(Cypress.env('USER_EMAIL'));
      cy.get("input#password").type(Cypress.env('USER_PASSWORD'));
      cy.get("button").contains("Sign In").click();

      const newCommentText = "Wow, nice article!";
      cy.get('[data-testid="new-comment-form"]').within(() => {
        cy.get("textarea#new-comment").type(newCommentText);
        cy.get("button").contains("Leave a comment").click();
      });
      cy.get('[data-testid="comment"]').contains(newCommentText);
    });
  });

  describe("when an article does not allow comments", () => {
    it("should not be able to comment an article", () => {
      cy.get('[data-testid="article-preview"][data-are-comments-enabled="false"]')
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
      cy.contains("Comments are disabled.");
    });
  });
});
