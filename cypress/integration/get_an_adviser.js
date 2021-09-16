describe('Mailing list sign up', () => {
  let email
  let firstName
  let lastName

  beforeEach(() => {
    cy.authVisit(Cypress.env('TTA_ROOT_URL'))
    cy.acceptCookie()
    cy.clickWithText('Start now')
    cy.random().then((rand) => {
      firstName = `First-${rand}`
      lastName = `Last-${rand}`
    })
  })

  describe('As a new candidate', () => {
    before(() => {
      cy.random().then((rand) => {
        email = `${rand}@${rand}.never`
      })
    })

    it('Signing up', () => {    
      signUp(firstName, lastName)
    })
  })

  describe('As an existing candidate', () => {
    before(() => {
      cy.fixture('test_data.json').then((testData) => {
        email = testData.getAnAdviser.email
      })
    })

    it('Signing up (resends verification code)', () => {    
      submitPersonalDetails(firstName, lastName)

      cy.clickWithText('resend verification')
      cy.contains('We\'ve sent you another email.')

      cy.waitForJobs()

      cy.retrieveVerificationCode(email).then((code) => {
        cy.contains('Verify your email address')
        cy.getByLabel(`Check your email and enter the verification code sent to ${email}`).type(code)
        cy.clickContinue()

        cy.contains('You have already signed up to this service')
      })
    })
  })

  const signUp = (firstName, lastName) => {
    submitPersonalDetails(firstName, lastName)

    cy.contains('Are you qualified to teach in the UK?')
    cy.clickWithText('No')
    cy.clickContinue()

    cy.contains('Do you have a degree?')
    cy.clickWithText('I have, or I\'m studying for, an equivalent qualification from another country')
    cy.clickContinue()

    cy.contains('Which stage are you interested in teaching?')
    cy.clickWithText('Primary')
    cy.clickContinue()

    cy.getByLabel('When do you want to start your teacher training?').select('Not sure')
    cy.clickContinue()

    cy.contains('Enter your date of birth')
    cy.getByLabel('Day').type(23)
    cy.getByLabel('Month').type(3)
    cy.getByLabel('Year').type(1986)
    cy.clickContinue()

    cy.contains('Where do you live?')
    cy.getByLabel('UK').click()
    cy.clickContinue()

    cy.contains('What is your address?')
    cy.getByLabel('Address line 1').type('7 Main Street')
    cy.getByLabel('Town or City').type('Town')
    cy.getByLabel('Postcode').type('TE7 1NG')
    cy.clickContinue()

    cy.contains('You told us you have an equivalent degree and live in the United Kingdom')
    cy.getByLabel('Contact telephone number').type('1234567890')
    cy.clickContinue()

    cy.contains('Check your answers before you continue')
    cy.clickContinue()

    cy.contains('Read and accept the privacy policy')
    cy.clickWithText('Accept the privacy policy')
    cy.clickComplete()

    cy.contains('Sign up complete')
  }

  const submitPersonalDetails = (firstName, lastName) => {
    cy.contains('About you')
    cy.getByLabel('First name').type(firstName)
    cy.getByLabel('Last name').type(lastName)
    cy.getByLabel('Email address').type(email)
    cy.clickContinue()
  }
})
