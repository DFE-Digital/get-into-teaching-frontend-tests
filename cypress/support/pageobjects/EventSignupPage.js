class EventSignupPage {
	getSignupForThisEventButton() {
		return cy.get(":nth-child(4) > .call-to-action-button");
	}
	getEventNameHeader() {
		return cy.get(".event-reg-main > h2");
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
		return cy.get(".event-box__header > h4");
	}
	getNextStep() {
		return cy.contains("Next Step");
	}
	getBackButton() {
		return cy.contains("Back");
	}
	getPhoneNumber() {
		return cy.get("#events-steps-contact-details-telephone-field");
	}
	getPrivacyPolicy() {
		return cy.get("#events-steps-further-details-privacy-policy-true-field");
	}

	getWouldYouLikeToReceiveInformationAboutFutureEventsInYourArea(futureEventDetails) {
		if (futureEventDetails == "Yes") {
			return cy.get("#events-steps-further-details-future-events-true-field");
		} else {
			return cy.get("#events-steps-further-details-future-events-field");
		}
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
	getSignupEventName() {
		return cy.get("#main-content > b");
	}
	getResendVerificationLink() {
		return cy.get("#wizard-steps-authenticate-timed-one-time-password-hint > a");
	}

	getErrorTitle() {
		return cy.get("#error-summary-title");
	}
}
export default EventSignupPage;
