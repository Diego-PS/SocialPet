describe('New Post Addition', () => {
  beforeEach(() => {
    // Visit the New Post page before each test
    cy.visit('/UploadPage') 
  })

  it('should successfully add a new post for a specific user and redirect to the feed page', () => {
   
    // @ts-ignore
    const cyAny = cy as any;

    cyAny.fixture('test.jpg').then((fileContent) => {
      cyAny.get('input[type="file"]').attachFile({
        fileContent,
        fileName: 'test.jpg',
        mimeType: 'image/jpg',
      },
        { subjectType: 'input' }
      );
    });

    // Select a specific user from the dropdown selector
    cy.get('#petNickname').select('Fluffsters') 

    // Add a caption
    cy.get('textarea').type('This is a test caption') 

    // Click the "Add" button to submit the new post
    cy.get('button').contains('Add').click() 

    // Check if the user is redirected to the feed page after adding the post
    cy.url().should('include', '/Feed') 
  
    cy.request('DELETE', 'https://social-pet-backend.onrender.com/pet/delete/Fluffsters', {})
  })
})
