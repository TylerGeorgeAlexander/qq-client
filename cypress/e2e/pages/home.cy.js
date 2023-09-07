// cypress/integration/home.spec.js

describe('Home Component', () => {
    beforeEach(() => {
      // Visit the home page or set the URL where your Home component is rendered
      cy.visit('http://localhost:3000/');
    });
  
    it('should display the hero image', () => {
      // Assert that the hero image is displayed
      cy.get('.bg-cover').should('have.css', 'background-image').and('include', 'chip-design');
    });
  
    it('should have a title', () => {
      // Assert that the title is present
      cy.contains('Welcome to Chat GPT API Generator').should('exist');
    });
  
    it('should have a description', () => {
      // Assert that the description is present
      cy.contains("Chat GPT API Generator is an innovative tool").should('exist');
    });
  
    it('should have a list of features', () => {
      // Assert that the list of features is present and contains items
      cy.get('.list-disc').should('exist');
      cy.get('.list-disc li').should('have.length', 3); // Assuming there are 3 features
    });
  
    it('should have a "Getting Started" section', () => {
      // Assert that the "Getting Started" section is present
      cy.contains('Getting Started').should('exist');
    });
  });
  