// cypress/integration/dashboard.spec.js

describe('Dashboard', () => {
    // beforeEach(() => {
    //     // Log in before each test
    //     cy.login(); // Custom command to log in
    //     // The login visits the Dashboard page before each test

    // });

    // it('should display the Dashboard component', () => {
    //     // Verify that the Dashboard component is displayed
    //     cy.get('#Dashboard').should('exist');
    // });

    // it('should interact with the Dashboard', () => {
    //     // Interact with the Dashboard component as needed
    //     // Example: Type text into InputChatGPT component
    //     cy.get('input[data-cy=input-chat]').type('Hello from Cypress!');

    //     // You can add more interaction tests as needed
    // });

    // it('should render the InputChatGPT component', () => {
    //     cy.get('input[data-cy=input-chat]').should('exist');
    // });

    describe("InputChatGPT Component", () => {
        beforeEach(() => {
            // Visit the page with InputChatGPT component
            // Log in before each test
            cy.login(); // Custom command to log in
        });

        it("should render the component", () => {
            // Verify that the InputChatGPT component exists
            cy.get("#InputChatGPT").should("exist");
        });

        it("should handle user input and generate output", () => {
            // Type text into the input textarea
            cy.get("textarea").type("test");

            // Click the generate button
            cy.contains("Generate").click();

            // Verify that the output is generated and displayed
            cy.get(".prose").should("exist");
        });

        it("should handle loading state", () => {
            // Stub the API request to simulate loading
            cy.intercept("POST", "https://quickquestion-server-52abd9886244.herokuapp.com/api/users/chat", {
                statusCode: 200,
                body: {
                    output: "Generated Output",
                },
                delay: 2000, // Simulate a 2-second delay
            }).as("generateOutput");

            // Type text into the input textarea
            cy.get("textarea").type("test");

            // Click the generate button
            cy.contains("Generate").click();

            // Verify that loading spinner is displayed
            cy.get(".loading-spinner").should("exist");

            // Wait for the API request to complete
            cy.wait("@generateOutput");

            // Verify that loading spinner disappears and output is displayed
            cy.get(".loading-spinner").should("not.exist");
            cy.get(".prose").should("exist");
        });

        it("should handle search history", () => {
            // Stub the API request to fetch search history
            cy.intercept("GET", "https://quickquestion-server-52abd9886244.herokuapp.com/api/users/search-history", {
                statusCode: 200,
                body: {
                    searchHistory: [
                        {
                            _id: "1",
                            query: "Search Query 1",
                            assertion: "Search Assertion 1",
                            timestamp: "Timestamp 1",
                        },
                        {
                            _id: "2",
                            query: "Search Query 2",
                            assertion: "Search Assertion 2",
                            timestamp: "Timestamp 2",
                        },
                    ],
                },
            }).as("fetchSearchHistory");

            // Verify that the search history is displayed
            cy.get(".search-history-item").should("have.length", 2);

            // Click on a search history item
            cy.get(".search-history-item").first().click();

            // Verify that the selected search is displayed
            cy.get(".flash-card").should("exist");
        });
    });

});
