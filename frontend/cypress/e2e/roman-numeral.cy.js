describe('Roman Numeral Converter', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should convert valid numbers to Roman numerals', () => {
    cy.get('input[type="number"]').type('34');
    cy.get('button[type="submit"]').click();
    cy.contains('Result:').should('be.visible');
    cy.contains('XXXIV').should('be.visible');
  });

  it('should handle invalid input', () => {
    cy.get('input[type="number"]').type('4000');
    cy.get('button[type="submit"]').click();
    cy.contains('Please enter a number between 1 and 3999').should('be.visible');
  });

  it('should handle empty input', () => {
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should convert multiple numbers in sequence', () => {
    // Test 1
    cy.get('input[type="number"]').type('3');
    cy.get('button[type="submit"]').click();
    cy.contains('III').should('be.visible');

    // Test 2
    cy.get('input[type="number"]').clear().type('9');
    cy.get('button[type="submit"]').click();
    cy.contains('IX').should('be.visible');

    // Test 3
    cy.get('input[type="number"]').clear().type('2024');
    cy.get('button[type="submit"]').click();
    cy.contains('MMXXIV').should('be.visible');
  });

  it('should handle API errors gracefully', () => {
    // Force the API to fail by using an invalid number format
    cy.get('input[type="number"]').type('1e6');
    cy.get('button[type="submit"]').click();
    cy.contains('Error:').should('be.visible');
  });
}); 