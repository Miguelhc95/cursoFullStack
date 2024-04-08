describe('Blog app', function() {

  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
    cy.contains('application')
  })
/*
  it('user can login', function () {
    cy.get('#username').type('rooteo')
    cy.get('#password').type('123456')
    cy.get('#logButton').click()
  })

  describe('when logged in', function() {
      beforeEach(function() {
        it('user can login 2', function () {
          cy.get('#username').type('rooteo')
          cy.get('#password').type('123456')
          cy.get('#logButton').click()
        })
      })

      it('a new blog can be created', function() {
        cy.get('#username').type('rooteo')
        cy.get('#password').type('123456')
        cy.get('#logButton').click()
        cy.contains('Add blog').click()
        cy.get('#titleBlog').type('a blog title created by cypress')
        cy.get('#authorBlog').type('a blog author created by cypress')
        cy.get('#urlBlog').type('a blog url created by cypress')
        cy.contains('create').click()    
      })
  })
*/
})