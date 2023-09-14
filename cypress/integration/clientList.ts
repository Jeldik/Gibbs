describe('Client list tests', () => {
    const USER = "user1"
    const PASSWORD = "Pass1234"
    var timestamp = new Date().getTime();

    beforeEach(() => {
        cy.visit("/")

        // //switch to en
        window.localStorage.setItem("lng", "en")

        // login
        window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyNDkxNzUyLCJleHAiOjE2MjUwODM3NTJ9.ZKiG8bs8ZaMUF6IknSGUVf-ewRBh7OPfA3Lqcg-Wn1I")

        cy.reload()

        cy.contains("Calendar")
        cy.contains("span", "Client list").click({ force: true })
    });

    it('adds new client', () => {
        cy.contains("button", "Add new").click({ force: true })

        // Name
        cy.get(".k-textbox").first()
            .type("1Tomas")

        // Orgnumber
        cy.get(".k-textbox").eq(1)
            .type("KP")

        // City
        cy.get(".k-textbox").eq(2)
            .type("Havlickuv Brod" + timestamp)

        // Zipcode
        cy.get("input[type='tel']")
            .type("58001")

        // Address
        cy.get(".k-textbox").eq(3)
            .type("Bechynova 4109")

        // add button
        cy.get(".k-grid-save-command").click({ force: true })

        cy.contains(timestamp)
    });

    it('edits first client in the list', () => {
        cy.contains("button", "Edit").click({ force: true })

        // name
        cy.get(".k-textbox").first()
            .clear()
            .type("1Jan")

        // organization
        cy.get(".k-textbox").eq(1)
            .clear()
            .type("KB")

        // city
        cy.get(".k-textbox").eq(2)
            .clear()
            .type("Jihlava" + timestamp)

        // postcode
        cy.get("input[type='tel']")
            .clear()
            .type("58002")

        // street
        cy.get(".k-textbox").eq(3)
            .clear()
            .type("Jihlavska 4109")

        cy.contains("Update").click({ force: true })

        cy.contains(timestamp)
    });

    it('opens client detail', () => {
        cy.contains("button", "OPEN").click({ force: true })
        cy.contains("Club info")
    });

    let countBefore: string;
    let countAfter: string;
    it('removes first client from the list', () => {
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

    it('adds contact person in client list', () => {
        cy.contains("button", "OPEN").click({ force: true })
        cy.contains("Club info")
        cy.wait(2000)
        cy.contains("button", "Add new")
            .first()
            .click({ force: true })
        // Person Name
        cy.get(".k-textbox")
            .first()
            .type("Tomas")
        // Email
        cy.get(".k-textbox")
            .eq(1)
            .type("tomas@seznam.cz")
        // Tel
        cy.get("input[type='tel']")
            .type("732183674")
        cy.get(".k-button.k-grid-save-command")
            .click({ force: true })
        cy.contains("Tomas")
    });

    it('updates first contact person in client list', () => {
        cy.contains("button", "OPEN").click({ force: true })
        cy.contains("Club info")
        cy.wait(2000)
        cy.get(".k-grid-edit-command")
            .first()
            .click({ force: true })
        // Person Name
        cy.get(".k-textbox")
            .first()
            .clear()
            .type("Jan")
        // Email
        cy.get(".k-textbox")
            .eq(1)
            .clear()
            .type("jan@seznam.cz")
        // Tel
        cy.get("input[type='tel']")
            .clear()
            .type("602183674")
        cy.contains("button", "Update").click({ force: true })
        cy.contains("602183674")
        cy.contains("jan@seznam.cz")
    });

    let countBeforePerson: number;
    let countAfterPerson: number;
    it('removes first contact person in client list', () => {
        cy.contains("button", "OPEN").click({ force: true })
        cy.contains("Club info")
        cy.wait(2000)

        // find element's count before delete
        cy.get(".k-master-row").then(($el) => {
            countBeforePerson = $el.length
        })

        cy.contains("button", "Remove")
            .click({ force: true })
            .then(() => {
                cy.wait(2000)
                cy.get(".k-master-row")
                    .then(($el) => {
                        countAfterPerson = $el.length
                    }).then(() => {
                        expect(countBeforePerson).is.not.eq(countAfterPerson)
                    })
            })
    });

    it('adds team in client list', () => {
        cy.contains("button", "OPEN").click({ force: true })
        cy.contains("Club info")
        cy.wait(2000)
        cy.get("button[title='Add new']")
            .eq(1)
            .click({ force: true })

        // Name
        cy.get(".k-textbox")
            .first()
            .type("HC Dukla")

        // Members
        cy.get(".k-textbox")
            .eq(1)
            .type("999")

        // Location
        cy.get(".k-textbox")
            .eq(2)
            .type("Jihlava")

        cy.get(".k-grid-save-command")
            .click({ force: true })

        cy.contains("HC Dukla")
        cy.contains("999")
        cy.contains("Jihlava")
    });

    it('updates last team in client list', () => {
        cy.contains("button", "OPEN").click({ force: true })
        cy.contains("Club info")
        cy.wait(2000)
        cy.get(".k-grid-edit-command")
            .last()
            .click({ force: true })

        // Name
        cy.get(".k-textbox")
            .first()
            .clear()
            .type("HC Rebel")

        // Members
        cy.get(".k-textbox")
            .eq(1)
            .clear()
            .type("888")

        // Location
        cy.get(".k-textbox")
            .eq(2)
            .clear()
            .type("Brno")

        cy.contains("Update").click({ force: true })

        cy.contains("Brno")
        cy.contains("888")
        cy.contains("HC Rebel")
    });

    let countBeforeTeam: number
    let countAfterTeam: number
    it('removes last team in client list', () => {
        cy.contains("button", "OPEN").click({ force: true })
        cy.contains("Club info")
        cy.wait(2000)

        // find element's count before delete
        cy.get(".k-master-row").then(($el) => {
            countBeforeTeam = $el.length
        })

        cy.contains("button", "Remove")
            .last()
            .click({ force: true })
            .then(() => {
                cy.wait(2000)
                cy.get(".k-master-row")
                    .then(($el) => {
                        countAfterTeam = $el.length
                    }).then(() => {
                        expect(countBeforeTeam).is.not.eq(countAfterTeam)
                    })
            })
    });

    it.only('edits club info for the first team in the list', () => {
        cy.contains("button", "OPEN").click({ force: true })
        cy.contains("Club info")
        cy.contains("button", "Edit").click({ force: true })
        cy.wait(2000)

        // Name
        cy.get(".k-textbox")
            .first()
            .clear()
            .type("Buldog team")

        // Orgnumber
        cy.get(".k-textbox")
            .eq(1)
            .clear()
            .type("123456")

        // City
        cy.get(".k-textbox")
            .eq(2)
            .clear()
            .type("Prague")

        // Zipcode
        cy.get(".k-textbox")
            .eq(3)
            .clear()
            .type("021")

        // Address
        cy.get(".k-textbox")
            .eq(4)
            .clear()
            .type("Bechynova 123")

        cy.contains("button", "Save").click({ force: true })
        cy.contains("Buldog team")
        cy.contains("123456")
        cy.contains("Prague")
        cy.contains("021")
        cy.contains("Bechynova 123")
    });
});