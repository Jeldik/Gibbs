describe('Calendar tests', () => {

    beforeEach(() => {
        cy.visit("/")

        //switch to en
        window.localStorage.setItem("lng", "en")
        
        // login
        window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI2NDY4OTY1LCJleHAiOjE2MjkwNjA5NjV9.KddKqHj8TfzDcqMCa3D44ydS5pHMgNgZd5zeAF4Sxc4")

        cy.reload()

        cy.contains("Calendar")
    });

    it('makes new single reservation', () => {
        cy.contains("span", "Calendar")
            .click({ force: true })

        cy.wait(5000)

        cy.get("div[style='user-select: none;']")
            .first()
            .dblclick({ force: true })

        cy.get('#combo-box-demo').click({ force: true })
        cy.get('#combo-box-demo').click({ force: true })
            .type("Tomas", { timeout: 20 })
            .type("{downarrow}")
            .type("{enter}", { force: true })

        cy.get("textarea[name='description']").type("single task")
        cy.contains("button", "Save").click({ force: true })
        cy.wait(15000)
        cy.contains("tomas")
    });

    it('makes new repeated reservation', () => {
        cy.contains("span", "Calendar").click({ force: true })
        cy.get("div[style='user-select: none;']")
            .first()
            .dblclick({ force: true })

        cy.get('#combo-box-demo').click({ force: true })
        cy.get('#combo-box-demo').click({ force: true })
            .type("Tomas", { timeout: 20 })
            .type("{downarrow}")
            .type("{enter}", { force: true })

        cy.get("textarea[name='description']").type("repeated task")
        cy.contains("button", "Weekly").click({ force: true })
        cy.contains("button", "Weekly").click({ force: true })
        cy.contains("button", "Save").click({ force: true })
        cy.wait(15000)
        cy.contains("tomas")
    });

});