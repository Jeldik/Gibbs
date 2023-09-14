describe('Language tests', () => {

    beforeEach(() => {
        cy.visit("/")
    });

    it('should change language to English', () => {
        cy.get("#demo-simple-select-outlined").click({ force: true })
        cy.contains("English").click({ force: true })
        cy.contains("English")
    });
});