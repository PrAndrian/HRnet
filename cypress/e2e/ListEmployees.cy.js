/* eslint-disable no-undef */
describe('Test de la page ListEmployees', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/')
        cy.viewport(1980, 1080)
        
        cy.fillFormWithFixture('employee1.json')
        cy.get('form').submit();
        cy.get('#modal').click({force:true})
        
        // Remplir le formulaire
        cy.fillFormWithFixture('employee2.json')
        cy.get('form').submit();
        cy.get('#modal').click({force:true})
        cy.get('a[href="/employees"]').find('svg').click()
      })


    it('Doit afficher la liste des employés', () => {
      // Vérifier que la page contient le titre "Current Employees"
      cy.contains('Current Employees');
  
      // Vérifier que la liste des employés est affichée
      cy.get('table').should('exist'); // Remplacez par le sélecteur correct de votre tableau
      cy.contains('John') // Remplacez par le sélecteur correct de votre tableau
      cy.contains('Bob') // Remplacez par le sélecteur correct de votre tableau
    });
  
    it('Doit effectuer une recherche d\'employé', () => {
      // Saisir un terme de recherche dans la barre de recherche
      cy.get('#table-searchbar').type('John');
  
      // Attendre un court instant pour la mise à jour des résultats
      cy.wait(500);
  
      // Vérifier que les résultats de la recherche sont affichés dans le tableau
      cy.get('table').should('contain', 'John');
    });
  
    it('Doit changer le nombre d\'éléments affichés par page', () => {
      // Sélectionner un nombre différent d'éléments par page dans le sélecteur
      cy.get('#show-rows').select('25'); // Remplacez par la valeur souhaitée
  
      // Attendre un court instant pour la mise à jour de la page
      cy.wait(500);
  
      // Vérifier que le nombre d'éléments affichés correspond à la valeur sélectionnée
      cy.get('table tbody tr').should('have.length', 20); // Remplacez par le nombre attendu
    });
  
    it('Doit changer de page dans la pagination', () => {
      // Sélectionner une page différente dans la pagination
      cy.get('nav ul li').contains('2').click(); // Remplacez par le numéro de page souhaité
  
      // Attendre un court instant pour la mise à jour de la page
      cy.wait(500);
  
      // Vérifier que la page affiche les éléments de la deuxième page
      cy.get('table tbody tr').should('exist'); // Assurez-vous qu'il y a des éléments sur la deuxième page
    });
  });
  