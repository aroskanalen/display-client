describe('Setup data sync', () => {
  it('should start loading data when startDataSync event is triggered', () => {
    cy.visit('/');
    cy.get('#startDataSync').click();
    cy.contains('Slide 1');
  });
});