describe('Locations tests', () => {
    const USER = "user1"
    const PASSWORD = "Pass1234"
    const timestamp = new Date().getTime();

    beforeEach(() => {
        cy.visit("/")

        // //switch to en
        window.localStorage.setItem("lng", "en")

        // login
        window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyNDkxNzUyLCJleHAiOjE2MjUwODM3NTJ9.ZKiG8bs8ZaMUF6IknSGUVf-ewRBh7OPfA3Lqcg-Wn1I")

        cy.reload()

        cy.contains("Calendar")
        cy.contains("span", "Locations").click({ force: true })
    });

    it('adds new location', () => {
        cy.contains("button", "Add new").click({ force: true })

        // gym
        cy.get(".k-textbox").first()
            .type("Fit HB")

        // city
        cy.get(".k-textbox").eq(1)
            .type("Havlickuv Brod" + timestamp)

        // post code
        cy.get(".k-textbox").eq(2)
            .type("58001")

        // add button
        cy.get(".k-grid-save-command").click({ force: true })

        cy.contains(timestamp)
    });

    it('edits first location in the list', () => {
        cy.contains("button", "Edit").click({ force: true })

        // gym
        cy.get(".k-textbox").first()
            .clear()
            .type("Fit People")

        // city
        cy.get(".k-textbox").eq(1)
            .clear()
            .type("Jihlava" + timestamp)

        // postcode
        cy.get(".k-textbox").eq(2)
            .clear()
            .type("58002")

        cy.contains("button", "Update").click({ force: true })

        cy.contains(timestamp)
    });

    it('opens first location in the list', () => {
        cy.contains("button", "OPEN").click({ force: true })
        cy.contains("Gym info")
    });

    let countBefore: string;
    let countAfter: string;
    it('removes first location from the list', () => {
        // find elements count before delete
        cy.get(".k-pager-info.k-label").then(($el) => {
            countBefore = $el.text()
        })

        cy.contains("button", "REMOVE").click({ force: true })
        cy.contains("Are you sure you want to continue?")
        cy.contains("button", "Yes").click({ force: true })
            .then(() => {
                cy.contains("span", "Price group").click({ force: true })
                    .then(() => {
                        cy.get(".k-pager-info.k-label").then(($el) => {
                            countAfter = $el.text()
                        }).then(() => {
                            expect(countBefore).is.not.eq(countAfter)
                        })
                    })
            })
    });

    it('adds new section into location', () => {
        cy.intercept("POST","/gym-sections").as("postGyms")

        cy.contains("button", "OPEN").click({ force: true })
        cy.contains("Gym info")
        cy.contains("Add new section").click({ force: true })
        cy.contains("new section").click({ force: true })
        cy.get("input[value='new section']").clear()
            .type("court one")
        cy.contains("button", "SAVE").click({ force: true })
        
        cy.wait("@postGyms")
        cy.contains("court one")
    });
});