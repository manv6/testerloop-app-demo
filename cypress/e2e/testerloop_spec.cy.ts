describe("template spec", () => {
  it("verify testerloop page", () => {
    cy.visit(
      "https://otf.overloop.io/run/bc60e106-f508-405c-ae7b-c50cad7dbc6b/test/c00e02af-c440-4a9e-bd65-510a94147f4e"
    );
    //verify summary
    cy.contains("Scenario: Contact page").should("be.visible");
    cy.get(".Tag_tag__SqJC7").should("have.text", "Failed");
    //verify error component
    cy.get(".FrameworkError_errorName__DvnwQ").should(
      "have.text",
      "Assertion Error"
    );
    cy.get(".FrameworkError_errorContent__qk7vi > :nth-child(2)").should(
      "have.text",
      'Timed out retrying after 4000ms: Expected to find element: `input[name="email"]`, but never found it.'
    );
    //verify step definitions
    cy.get("#stepsHeader").should("have.text", "Scenario");
    cy.contains("I visit overloop's website").should("be.visible");
    cy.contains("I navigate to contact page").should("be.visible");
    cy.contains("I fill in contact form details").should("be.visible");
    cy.contains("I visit overloop's website").should("be.visible");

    cy.get(".DomPreview_expandableDom__05a9S").should("be.visible");
    cy.scrollTo(0, 1000);
    //verify at least one console log
    cy.get(".ConsolePanel_expandableConsole__txJbV").should("be.visible");
    cy.contains(
      "SENTRY WAS __NOT__ INITIALIZED. Logs will be forwarded to console instead."
    ).should("be.visible");
    //verify at least one network event
    cy.get(".Network_expandableNetwork__Wh5Ft").should("be.visible");
    cy.contains("https://www.overloop.io/").should("be.visible");
  });
});
