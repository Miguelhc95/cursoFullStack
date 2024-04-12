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
        it('user can login 3', function () {
          cy.get('#username').type('rooteo')
          cy.get('#password').type('123456')
          cy.get('#logButton').click()
        })
      })

      it('like a blog', function() {
        cy.get('#username').type('rooteo')
        cy.get('#password').type('123456')
        cy.get('#logButton').click()
        cy.contains('a blog title created by cypress')
        .parent()
        .contains('show/hide').click()
        .parent()
        .contains('like').click()   
      })
  })

  describe('A blog can be deleted', function() {
      beforeEach(function() {
        it('user can login 4', function () {
          cy.get('#username').type('rooteo')
          cy.get('#password').type('123456')
          cy.get('#logButton').click()
        })
      })

      it('delete a blog', function() {
        cy.get('#username').type('rooteo')
        cy.get('#password').type('123456')
        cy.get('#logButton').click()
        cy.contains('a blog title created by cypress')
        .parent()
        .contains('show/hide').click()
        .parent()
        .contains('remove').click()   
      })
  })

  describe('Only blog creator can see delete button', function() {
    beforeEach(function() {
      it('user can login 6', function () {
        cy.get('#username').type('rooteo')
        cy.get('#password').type('123456')
        cy.get('#logButton').click()
      })
    })
  
    it('Delete button is not visible for non-creator user', function() {
      cy.contains('a blog title created by cypress').should('not.exist')
    })
  
    it('Delete button is visible for creator user', function() {
      cy.get('#username').type('rooteo')
      cy.get('#password').type('123456')
      cy.get('#logButton').click()

      cy.contains('Add blog').click()
        cy.get('#titleBlog').type('a blog title created by cypress')
        cy.get('#authorBlog').type('a blog author created by cypress')
        cy.get('#urlBlog').type('a blog url created by cypress')
        cy.contains('create').click()   

        cy.reload()
  
      cy.contains('a blog title created by cypress')
        .parent()
        .contains('show/hide')
        .click()
  
      cy.contains('remove').should('exist')
    })
  })
  
  describe('Blogs are ordered by likes', function() {
  beforeEach(function() {
    it('user can login 7', function () {
      cy.get('#username').type('rooteo')
      cy.get('#password').type('123456')
      cy.get('#logButton').click()
    })

  })
  it('Blogs are ordered by likes', function() {
    cy.get('.blog').each(($blog, index) => {
      if (index < 2) {
         cy.wrap($blog).find('.likes').then(($likes) => {
          const currentLikes = parseInt($likes.text())
          const nextBlogLikes = parseInt($blog.next().find('.likes').text())
          expect(currentLikes).to.be.greaterThan(nextBlogLikes)
        })
      }
    })
  })
 
})



})