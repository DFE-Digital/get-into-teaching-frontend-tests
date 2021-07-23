Cypress.Commands.add('getByLabel', (label) => {
  cy.contains('label', label)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get('#' + id)
    })
})

Cypress.Commands.add('acceptCookie', () => {
	cy.get('#biscuits-agree').click()
})

Cypress.Commands.add('random', () => {
	const rand = Math.floor(Math.random() * 100000000 + 1)
	cy.wrap(rand)
})

Cypress.Commands.add('authVisit', (path) => {
	cy.visit(path, {
		auth: {
			username: Cypress.env('HTTPAUTH_USERNAME'),
			password: Cypress.env('HTTPAUTH_PASSWORD'),
		},
	})
})

Cypress.Commands.add('clickWithText', (text) => {
	cy.contains(text).click()
})

Cypress.Commands.add('clickNext', () => {
	cy.clickWithText('Next Step')
})

Cypress.Commands.add('clickContinue', () => {
	cy.clickWithText('Continue')
})

Cypress.Commands.add('clickCompleteSignUp', () => {
	cy.clickWithText('Complete sign up')
})

Cypress.Commands.add('clickComplete', () => {
	cy.clickWithText('Complete')
})

Cypress.Commands.add('waitForJobs', () => {
	cy.wait(8000)
})

Cypress.Commands.add('anEventExists', () => {
  cy.get('body').then(body => {
    cy.wrap(body.find('.events-featured__list__item').length > 0)
  })
})

Cypress.Commands.add('retrieveVerificationCode', (email) => {	
	const apiKey = Cypress.env('MAILING_LIST_USER_EMAIL_API_KEY')
	cy.request(`https://mailsac.com/api/addresses/${email}/messages?_mailsacKey=${apiKey}`).as('emails')

	cy.get("@emails").then((emailsResponse) => {
		const latestEmailId = emailsResponse.body[0]._id
		const emailUrl = `https://mailsac.com/api/text/${email}/${latestEmailId}?_mailsacKey=${apiKey}`
		cy.request(emailUrl).as('latestEmail');

		cy.get("@latestEmail").then((latestEmailResponse) => {
			const pos = latestEmailResponse.body.search('is');
			const code = latestEmailResponse.body.toString().substr(pos + 2, 7)
			cy.wrap(code);
		});
	});
});
