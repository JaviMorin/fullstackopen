describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Prueba1',
      username: 'prueba1',
      password: 'prueba2'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('prueba1')
      cy.get('#password').type('prueba2')
      cy.get('#login-button').click()

      cy.contains('Prueba1 is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('prueba3')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong username or password')
    })
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('prueba1')
      cy.get('#password').type('prueba2')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('A blog created by cypress')
      cy.get('#author').type('An author created by cypress')
      cy.get('#url').type('An url created by cypress')
      cy.get('#create-button').click()
      cy.contains('A blog created by cypress')
    })
    describe('And a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('A blog created by cypress')
        cy.get('#author').type('An author created by cypress')
        cy.get('#url').type('An url created by cypress')
        cy.get('#create-button').click()
      })
  
      it('Push like button', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('#like').contains('1')
      })
      describe('View button is pushed', function () {
        beforeEach(function () {
          cy.contains('view').click()
        })
    
        it('Push remove button', function () {
          cy.contains('remove').click()
          cy.contains('A blog created by cypress').should('not.exist')
        })
      })
      describe('All blog are order by number of likes', function () {
        beforeEach(function () {
          cy.contains('new blog').click()
          cy.get('#title').type('A blog created by cypress2')
          cy.get('#author').type('An author created by cypress2')
          cy.get('#url').type('An url created by cypress2')
          cy.get('#create-button').click()
          cy.contains('A blog created by cypress2')
        })
        it('Push like button', function () {
          cy.get('button:last').click()
          cy.contains('like').click()
          cy.contains('like').click()
          cy.visit('http://localhost:3000')
          cy.get('#view').click()
          cy.get('#view').click()
          let like1;
          cy.get('#like').then(($div) => {
            like1 = $div.text();
          });
          cy.get('#hide').click()
          cy.get('#like').then(($div) => {
            let like2 = $div.text();
            expect(parseInt(like1)).to.be.greaterThan(parseInt(like2));
        });
        })
      })
    }) 
  })
})