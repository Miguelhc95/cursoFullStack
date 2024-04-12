describe('Blog app', function() {

  beforeEach(function() {
    //cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
    cy.contains('application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('rooteo')
      cy.get('#password').type('123456')
      cy.get('#logButton').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('rooteo')
      cy.get('#password').type('1234567')
      cy.get('#logButton').click()
    })
  })

})