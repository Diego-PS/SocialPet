import 'cypress-file-upload'; // Import the cypress-file-upload plugin

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to upload a file using cypress-file-upload
       * @example cy.uploadFile('file-path', 'input-selector')
       */
      uploadFile(filePath: string, selector: string): Chainable<Subject>;
    }
  }
}

Cypress.Commands.add('uploadFile', (filePath, selector) => {
  cy.fixture(filePath).then((fileContent) => {
    cy.get(selector).attachFile(
      {
        fileContent,
        fileName: filePath,
        mimeType: 'image/jpeg', // Adjust the MIME type according to your file type
      },
      { subjectType: 'input' }
    );
  });
});


/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }