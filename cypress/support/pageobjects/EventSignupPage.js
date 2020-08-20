class EventSignupPage {
	getSignupForThisEventButton() {
		return cy.get(".content__left > .call-to-action-button");
	}
	getEventNameHeader() {
		return cy.get(".content__left > h2");
	}
	getFirstName() {
		return cy.get("#events-steps-personal-details-first-name-field");
	}
	getLastName() {
		return cy.get("#events-steps-personal-details-last-name-field");
	}
	getEmail() {
		return cy.get("#events-steps-personal-details-email-field");
	}
	getSearchedEventName() {
		return cy.get(
			'[href="/events/1203_-_TTT_-_London3-Summer_2020-Test300589108"] > .event-resultbox > .event-resultbox__header > h2'
		);
	}
	getNextStep() {
		return cy.contains("Next Step");
	}
	getBackButton() {
		return cy.get(".govuk-back-link");
	}
	getPhoneNumber() {
		return cy.get("#events-steps-contact-details-telephone-field");
	}
	getPrivacyPolicy() {
		return cy.get("#events-steps-further-details-privacy-policy-true-field");
	}
	getFutureEventInfo() {
		return cy.get("#events-steps-further-details-future-events-true-field");
	}
	getPersonalisedInfo() {
		return cy.get("#events-steps-further-details-mailing-list-true-field");
	}

	getPostcode() {
		return cy.get("#events-steps-further-details-address-postcode-field");
	}

	getCompleteSignup() {
		return cy.contains("Complete sign up");
	}
}
export default EventSignupPage;
