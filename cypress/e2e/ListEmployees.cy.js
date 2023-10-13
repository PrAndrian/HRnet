/* eslint-disable no-undef */
import  employees  from '../../src/data/employeeMock';

describe('Test de la page ListEmployees', () => {
  beforeEach(()=>{
    cy.viewport(1980, 1080)
    cy.visit('http://127.0.0.1:5173/employees')
  })

    it('Doit afficher la liste des employés', () => {

      cy.contains('Current Employees');

      cy.get('table').should('exist');

      cy.get('table').each((employee, index) => {
        cy.wrap(employee).should('contain', employees[index].firstName);
      });
  
    });
  
    it('Doit effectuer une recherche d\'employé', () => {

      cy.get('#table-searchbar').type('John',{delay: 500});
  
      cy.get('table').should('contain', 'John');
    });
  
    it('Doit changer le nombre d\'éléments affichés par page', () => {
      cy.get('#show-rows').select('25'); 
      
      cy.get('table tbody tr').should('have.length', 20);
    });
  
    it('Doit changer de page dans la pagination', () => {
      cy.get('.inline-flex').find('button').contains('2').click();
      
      cy.get('table tbody tr').should('exist');
    });
  });
  