/* eslint-disable no-undef */

Cypress.Commands.add('fillFormWithFixture', (fixtureName) => {
    cy.fixture(fixtureName).then((employee) => {
      cy.get('#first-name').type(employee.firstName);
      cy.get('#last-name').type(employee.lastName);
      cy.get('#date-of-birth').type(employee.birthDate);
      cy.get('#start-date').type(employee.startDate);
  
      cy.get('#department').closest('div').click();
      cy.get('#department')
        .closest('div')
        .find('ul')
        .find(`li[value="${employee.department}"]`)
        .click();
      
      cy.get('#street').type(employee.street);
      cy.get('#city').type(employee.city);
  
      cy.get('#state').closest('div').click();
      cy.get('#state')
        .closest('div')
        .find('ul')
        .find(`li[value="${employee.state}"]`)
        .click();
      
      cy.get('#zip-code').type(employee.zipCode);
    });
  });
  