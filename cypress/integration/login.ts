describe('Login tests', () => {
    const USER = "user1"
    const PASSWORD = "Pass1234"

    beforeEach(() => {
        cy.visit("/")

        // switch to en
        window.localStorage.setItem("lng", "en")
    });

    it('should login by form', () => {
        cy.getBySel("login").click({ force: true })
        cy.getBySel("username").type(USER)
        cy.getBySel("password").type(PASSWORD)
        cy.getBySel("login_button").click({ force: true })

        cy.contains("Calendar")
    });

    it('should sign up new user', () => {
        cy.intercept("POST", "https://backend.dev.sesongbooking.gibbs.no/auth/local/register").as("signUp")

        cy.getBySel("login").click({ force: true })
        cy.getBySel("sign-up").click({ force: true })
        cy.get("input[name='firstname']").type("Tomas")
        cy.get("input[name='lastname']").type("Jelinek")
        cy.get("input[name='email']").type("cypress@test.com")
        cy.getBySel("password").type(PASSWORD)
        cy.get("input[name='acceptRules']").check()
            .should("be.checked")
            .then(() => {
                cy.contains("button", "Sign Up").click({ force: true })
            })
        
        cy.wait("@signUp")

        cy.get("#section").click({ force: true })
            .type("downarrow}")
            .type("downarrow}")
            .type("{enter}")

        cy.contains("span", "Apply").click({ force: true })

        cy.contains("Client Info")
    });
});