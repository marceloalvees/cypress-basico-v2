/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('prenche os campos obrigatórios e envia o formulário', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.get('#firstName').type('Marcelo')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('marcelo@teste,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    it('Campo telefone continua vazio',function(){
        cy.get('#phone')
        .type('afsdfasdf')
        .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#phone-checkbox').click()
        cy.get('#firstName').type('Marcelo')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('marcelo@teste.com')
        cy.get('#open-text-area').type('Ajuda ajuda', {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName').type('Marcelo').should('have.value', 'Marcelo')
            .clear()
                .should('have.value', '')
        cy.get('#lastName').type('Alves').should('have.value', 'Alves')
            .clear()
                .should('have.value', '')
        cy.get('#email').type('marcelo@teste.com').should('have.value', 'marcelo@teste.com')
            .clear()
                .should('have.value', '')

        cy.get('#phone')
                .type(81).should('have.value', '81')
                    .clear()
                        .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.',function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('teste dropdown',function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('teste radio',function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })
    it('marca todos os radios',function(){
        cy.get('input[type="radio"]').should('have.length', 3).each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it.only('selecione um arquivo',function(){
        cy.get('input[type="file"]#file-upload').should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input) {
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
})