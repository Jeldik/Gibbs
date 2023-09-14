declare global {
    namespace Cypress {
      interface Chainable {
        getBySel: typeof getBySel;
      }
    }
  }
  
/**
 * Selector by data attribute
 * @param selector string of selector or selectors
 */
export const getBySel = (selector: string) => {
    return cy.get(`[data-test=${selector}]`);
}