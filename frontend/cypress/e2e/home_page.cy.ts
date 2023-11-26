describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')

    // Test that the "enter" button exists
    cy.get('.button').should('exist')

    // Click on the "enter" button
    cy.get('.button').click()

    // Assert that it navigates to a certain page
    cy.url().should('include', '/Feed') 
   })
})