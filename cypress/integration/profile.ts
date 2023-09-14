describe('Profile tests', () => {
    beforeEach(() => {
        cy.visit("/")

        //switch to en
        window.localStorage.setItem("lng", "en")

        // login
        window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyNDkxNzUyLCJleHAiOjE2MjUwODM3NTJ9.ZKiG8bs8ZaMUF6IknSGUVf-ewRBh7OPfA3Lqcg-Wn1I")

        cy.reload()

        cy.contains("Calendar")
    });

    it.only('should update profile', () => {
        cy.contains("span", "You Applied As").click({ force: true })
        cy.contains("span", "Profile").as("profile").should("be.visible")
        cy.get("a[href='/login']").should("be.visible")
        cy.get("@profile").click({ force: true })

        cy.contains("span", "You Applied As").click({ force: true })

        cy.get(".MuiPaper-root.MuiMenu-paper.Component-paper-14.MuiPopover-paper.MuiPaper-elevation0.MuiPaper-rounded").invoke("hide")
        cy.get("input[name='firstName']")
            .clear({ force: true })
            .type("Updated first name", { force: true })

        cy.get("input[name='lastName']")
            .clear({ force: true })
            .type("Updated last name", { force: true })

        cy.get("input[name='email']")
            .clear({ force: true })
            .type("cypres@test.com", { force: true })

        cy.get("input[type='tel']")
            .clear({ force: true })
            .type("123456789", { force: true })

        cy.get("#country-select-demo").click({ force: true })
            .type("{downarrow}")
            .type("{enter}")

        cy.contains("span", "Save").click({ force: true })

        cy.contains("Your data has been saved.")
    });

});