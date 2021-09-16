describe('Mailing list sign up', () => {
  let email
  let firstName
  let lastName

  beforeEach(() => {
    cy.authVisit('/mailinglist/signup')
    cy.acceptCookie()

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
        email = testData.mailingList.email
      })
    })

    it('Signing up (resends verification code)', () => {  
      cy.contains('Get personalised guidance to your inbox')
      submitPersonalDetails(firstName, lastName)
  
      cy.clickWithText('resend verification')
      cy.contains("We've sent you another email.")
  
      cy.waitForJobs()
  
      cy.retrieveVerificationCode(email).then((code) => {
        cy.contains('Verify your email address')
        cy.getByLabel(
          `Check your email and enter the verification code sent to ${email}`
        ).type(code)
        cy.clickNext()
  
        cy.contains('You’ve already signed up')
      })
    })

    it('Booking a callback on completion of the mailing list sign up', () => {
      cy.authVisit('/mailinglist/signup/completed')
  
      cy.contains('Book a callback').click()
  
      submitPersonalDetails(firstName, lastName)
      cy.clickNext()
  
      cy.clickWithText('resend verification')
      cy.contains("We've sent you another email.")
  
      cy.waitForJobs()
  
      cy.retrieveVerificationCode(email).then((code) => {
        cy.contains('Verify your email address')
        cy.getByLabel(
          `Check your email and enter the verification code sent to ${email}`
        ).type(code)
        cy.clickNext()
      })
  
      cy.getByLabel('Phone number').clear().type('1234567890')
      cy.clickNext()
  
      cy.getByLabel('Choose an option').select('Eligibility to become a teacher')
      cy.clickNext()
  
      cy.contains('Accept privacy policy')
      cy.clickWithText('Yes')
  
      cy.clickWithText('Book your callback')
      cy.contains('Callback confirmed')
    })
  })

  const signUp = (firstName, lastName) => {
    cy.contains('Get personalised guidance to your inbox')
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

    cy.contains("You've signed up")
  }

  const submitPersonalDetails = (firstName, lastName) => {
    cy.getByLabel('First name').type(firstName)
    cy.getByLabel('Last name').type(lastName)
    cy.getByLabel('Email address').type(email)
    cy.clickNext()
  }
})
