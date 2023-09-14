import { is } from "cypress/types/bluebird";

describe('Price group tests', () => {
    const USER = "user1"
    const PASSWORD = "Pass1234"
    var timestamp = new Date().getTime();

    beforeEach(() => {
        cy.visit("/")

        // switch to en
        window.localStorage.setItem("lng", "en")

        // login
        window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyNDkxNzUyLCJleHAiOjE2MjUwODM3NTJ9.ZKiG8bs8ZaMUF6IknSGUVf-ewRBh7OPfA3Lqcg-Wn1I")

        cy.reload()

        cy.contains("Calendar")
        cy.contains("span", "Price group").click({ force: true })
    });

    it('adds new price group', () => {
        cy.contains("button", "Add new").click({ force: true })

        // find the group
        cy.get(".k-textbox").first()
            .type("Group 1" + timestamp)

        // find the 
        cy.get(".k-input").first()
            .click({ force: true })
            .type("{enter}")

        // find the hour price
        cy.get(".k-input").eq(1)
            .type("50")

        // find the day price
        cy.get(".k-input").eq(2)
            .type("150")

        // add button
        cy.get(".k-grid-save-command").click({ force: true })

        cy.contains(timestamp)
    });

    it('edits first price group in the list', () => {
        cy.contains("button", "Edit").click({ force: true })

        // group
        cy.get(".k-textbox").first()
            .clear()
            .type("Group edit" + timestamp)

        // 
        cy.get(".k-input").first()
            .click({ force: true })
            .type("{downarrow}")
            .type("{enter}")

        // hour price
        cy.get(".k-input").eq(1)
            .clear()
            .type("40")

        // day price
        cy.get(".k-input").eq(2)
            .clear()
            .type("140")

        cy.contains("Update").click({ force: true })

        cy.contains(timestamp)
    });

    let countBefore: string;
    let countAfter: string;
    it('removes first price group from the list', () => {
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
});