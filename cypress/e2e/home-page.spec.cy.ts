describe('Home page', (): void => {
  it('should display application name', (): void => {
    cy.visit('http://localhost:3000/')

    cy.contains('La célérité c\'est bien mais avec modération')
  });

  it('should navigate to login page', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Connexion').click();

    cy.url().should('include', '/login.html');

    cy.contains('Login de demo (vous serez redirigés vers )')
  })
})
