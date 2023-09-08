// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

Cypress.Commands.add('login', () => {
    const username = Cypress.env('CYPRESS_USERNAME');
    const password = Cypress.env('CYPRESS_PASSWORD');

    // Visit the main page
    cy.visit('https://quickquestion-client-ab1c2fa4677d.herokuapp.com');

    // Access the login
    cy.contains('Login').click();

    // Enter login credentials
    // cy.get('input[data-cy=email]').type(username);
    // cy.get('input[data-cy=password]').type(password);

    // Submit the login form
    // cy.get('button[type=submit]').click();

    // Access the Demo Login
    cy.contains('Demo Login').click();

    // Add a hardcoded pause of 5 seconds (adjust the duration as needed)
    cy.wait(5000); // Pause for 5 seconds
    
    // Wait for the page transition or a specific element to appear after login
    // cy.url().should('include', '/dashboard'); // Wait for URL change to '/dashboard'

    cy.get('label[for="chat-prompt"]').should('be.visible');    // Wait for a specific element to become visible
    // cy.contains('Input chatGPT prompt(s):').should('exist'); // Wait for a specific text to appear on the page

});
