describe('Feed Page Footer Icons', () => {
  beforeEach(() => {
    // Visit the feed page before each test
    cy.visit('/Feed') 
  })

  it('should redirect to the correct page when clicking on Icon 1', () => {
   
    cy.get('.home-button').click() 

    // Check the element to ensure redirection to the expected page
    cy.url().should('include', '/Feed') 
  })

  it('should redirect to the correct page when clicking on Icon 2', () => {
    
    cy.get('.add-button').click() 

    // Check the element to ensure redirection to the expected page
    cy.url().should('include', '/UploadPage') 
  })

  it('should redirect to the correct page when clicking on Icon 3', () => {
    
    cy.get('.add-cat-button').click() 

    // Check the element to ensure redirection to the expected page
    cy.url().should('include', '/NewCat') 
  })
})
