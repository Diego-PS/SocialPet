describe('AddNewCat Page', () => {
  it('should add a new cat and show success modal', () => {
    cy.visit('/NewCat'); 

    // @ts-ignore
    const cyAny = cy as any;

    cyAny.fixture('test-cat.jpg').then((fileContent) => {
      cyAny.get('input[type="file"]').attachFile({
        fileContent,
        fileName: 'test-cat.jpg',
        mimeType: 'image/jpeg',
      },
        { subjectType: 'input' }
      );
    });

    // Simulate entering cat's name
    cy.get('#catsname').type('Fluffys');

    // Simulate entering cat's nickname
    cy.get('#username').type('Fluffsters');

    // Click the "Add" button to submit the new cat
    cy.contains('Add').click();

    // Check if the success modal is displayed
    cy.get('.modal').should('be.visible');

    // Check if the success message is displayed
    cy.contains('New cat created successfully!').should('be.visible');

    // Close the modal
    cy.contains('Close').click();

    // Verify the redirection to the Feed page
    cy.url().should('include', '/Feed'); 
  });
});
