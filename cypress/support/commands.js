Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Marcelo')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('marcelo@teste.com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
})