/* eslint-disable no-undef */
describe('Test du formulaire de création d\'employé', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
    cy.viewport(1440, 1080)
  })

  it('Doit remplir le formulaire et soumettre avec succès', () => {

    // Remplir le formulaire
    cy.fillFormWithFixture('employee1.json')

    // Soumettre le formulaire
    cy.get('form').submit();

    // Vérifier le succès
    cy.contains('Employee added successfully !');

  });

  it('Doit gérer les erreurs de validation du formulaire', () => {

    // Soumettre le formulaire vide
    cy.get('form').submit();

    // Vérifier les erreurs de validation
    cy.contains('No empty inputs are allowed');
    cy.get('#modal').click({force:true})
    
    cy.get('#first-name').clear();
    cy.get('#last-name').clear();
    cy.get('#date-of-birth').clear();
    cy.get('#start-date').clear();
    cy.get('#street').clear();
    cy.get('#city').clear();
    cy.get('#zip-code').clear();

    cy.fillFormWithFixture('dateOutOfBound.json')
    cy.get('form').submit();

    cy.contains('Date should be between');
    cy.get('#modal').click({force:true})

    cy.get('#first-name').clear();
    cy.get('#last-name').clear();
    cy.get('#date-of-birth').clear();
    cy.get('#start-date').clear();
    cy.get('#street').clear();
    cy.get('#city').clear();
    cy.get('#zip-code').clear();

    cy.fillFormWithFixture('tooYoung.json')
    cy.get('form').submit();

    cy.contains('Employee must be at least 18 years old');
    cy.get('#modal').click({force:true})
    
    cy.get('#first-name').clear();
    cy.get('#last-name').clear();
    cy.get('#date-of-birth').clear();
    cy.get('#start-date').clear();
    cy.get('#street').clear();
    cy.get('#city').clear();
    cy.get('#zip-code').clear();

    cy.fillFormWithFixture('incorrectName.json')
    cy.get('form').submit();
    
    cy.contains('No special characters are allowed');
    cy.get('#modal').click({force:true})
  });
  
  it("Doit laisser le choix à l'utilisateur s'il y a potentiellement le même employé dans la base de donnée", () => {

    // Remplir le formulaire
    cy.fillFormWithFixture('employee1.json')
    cy.get('form').submit();
    cy.get('#modal').click({force:true})
    
    // Remplir le formulaire
    cy.fillFormWithFixture('employee1.json')
    cy.get('form').submit();
    cy.get('#modal').click({force:true})
    
    cy.contains('Employee already exists');
  });
});
