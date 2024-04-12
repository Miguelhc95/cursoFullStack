describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
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

  describe('A blog can be created', function() {
      beforeEach(function() {
        it('user can login 2', function () {
          cy.get('#username').type('rooteo')
          cy.get('#password').type('123456')
          cy.get('#logButton').click()
        })
      })

      it('create new blog', function() {
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

  describe('A blog can be liked', function() {
      beforeEach(function() {
        it('user can login 2', function () {
          cy.get('#username').type('rooteo')
          cy.get('#password').type('123456')
          cy.get('#logButton').click()
        })
      })

      it('like a blog', function() {
        cy.get('#username').type('rooteo')
        cy.get('#password').type('123456')
        cy.get('#logButton').click()
        cy.contains('show/hide').click()
        cy.contains('like').click()    
      })
  })

})