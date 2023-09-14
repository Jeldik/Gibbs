import { getBySel } from './commands/getBySel'

Cypress.Commands.add('getBySel', getBySel);

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})