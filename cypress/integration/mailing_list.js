describe('Mailing list sign up', () => {
  var email

  beforeEach(() => {
    cy.authVisit('/mailinglist/signup')
    cy.acceptCookie()

    cy.fixture('test_data.json').then((testData) => {
      email = testData.mailingList.email
    })
  })

  it('Sign up as a new candidate', () => {    
    cy.random().then((rand) => {
      const firstName = `First-${rand}`
      const lastName = `Last-${rand}`

      signUp(firstName, lastName)
    })
  })

  it('Match back an existing candidate (resends verification code)', () => {    
    cy.random().then((rand) => {
      const firstName = `First-${rand}`
      const lastName = `Last-${rand}`

      signUp(firstName, lastName)

      cy.waitForJobs()

      cy.authVisit('/mailinglist/signup')

      submitPersonalDetails(firstName, lastName)

      cy.clickWithText('resend verification')
      cy.contains('We\'ve sent you another email.')

      cy.waitForJobs()

      cy.retrieveVerificationCode(email).then((code) => {
        cy.contains('Verify your email address')
        cy.getByLabel(`Check your email and enter the verification code sent to ${email}`).type(code)
        cy.clickNext()

        cy.contains('You’ve already signed up')
      })
    })
  })

  const signUp = (firstName, lastName) => {
    submitPersonalDetails(firstName, lastName)

    cy.contains('Do you have a degree?')
    cy.clickWithText('Yes, I already have a degree')
    cy.clickNext()

    cy.contains('How close are you to applying for teacher training?')
    cy.clickWithText('I’m not sure and finding out more')
    cy.clickNext()

    cy.getByLabel('Which subject do you want to teach?').select('Chemistry')
    cy.clickNext()

    cy.getByLabel('Your postcode (optional)').type('TE5 1NG')
    cy.clickNext()

    cy.contains('Accept privacy policy')
    cy.clickWithText('Yes')
    cy.clickCompleteSignUp()

    cy.contains('You\'ve signed up')
  }

  const submitPersonalDetails = (firstName, lastName) => {
    cy.contains('Get personalised guidance to your inbox')
    cy.getByLabel('First name').type(firstName)
    cy.getByLabel('Last name').type(lastName)
    cy.getByLabel('Email address').type(email)
    cy.clickNext()
  }
})
