import Homepage from "../support/pageobjects/Homepage";
import EventSignupPage from "../support/pageobjects/EventSignupPage";

describe("Get-into-teaching - Event sign up flow", () => {
	const searchForEvent = new Homepage();
	const eventSignup = new EventSignupPage();
	beforeEach(function () {
		cy.fixture("event-signup-test-data").then((testData) => {
			this.testData = testData;
		});
		cy.visit("/events", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptCookie();
	});

	it("It shows the Search for events page", function () {
		searchForEvent
			.getSearchforEventsHeading()
			.should("exist")
			.should("have.text", "Search for events");
	});
	it("It shows the Sign up for this event page", function () {
		let signedUpeventName;
		searchForEvent.getEventsType().select(this.testData.eventsType);
		searchForEvent.getEventLocation().select(this.testData.eventLocation);
		searchForEvent.getEventsMonth().select(this.testData.eventsMonth);
		searchForEvent.getUpdateResultsButton().click();
		eventSignup.getSearchedEventName().then(function (eventName) {
			cy.contains(eventName.text().trim()).click();
			eventSignup.getSignupForThisEventButton().click();
			eventSignup
				.getEventNameHeader()
				.should("have.text", eventName.text().trim());
			signedUpeventName = eventName.text().trim();
		});
	});

	it("It shows the Sign up complete message - for new candidate", function () {
		let signedUpeventName;
		searchForEvent.getEventsType().select(this.testData.eventsType);
		searchForEvent.getEventLocation().select(this.testData.eventLocation);
		searchForEvent.getEventsMonth().select(this.testData.eventsMonth);
		searchForEvent.getUpdateResultsButton().click();
		eventSignup.getSearchedEventName().then(function (eventName) {
			eventSignup.getSearchedEventName().click();
			eventSignup.getSignupForThisEventButton().click();
			eventSignup
				.getEventNameHeader()
				.should("have.text", eventName.text().trim());
			signedUpeventName = eventName.text().trim();

			eventSignup.getFirstName().type(this.testData.firstName);
			eventSignup.getLastName().type(this.testData.lastName);
			let rnum = Math.floor(Math.random() * 1000000 + 1);
			let email = "testuser" + rnum.toString() + "@gmail.co.uk";
			eventSignup.getEmail().type(email);
			eventSignup.getNextStep().click();
			eventSignup.getBackButton().should("exist").should("have.text", "Back");
			eventSignup.getPhoneNumber().type(this.testData.phoneNumber);
			eventSignup.getNextStep().click();
			eventSignup.getPrivacyPolicy().click();
			eventSignup.getFutureEventInfo().click();
			eventSignup.getPersonalisedInfo().click();
			eventSignup.getPostcode().type(this.testData.postcode);
			eventSignup.getCompleteSignup().click();
			eventSignup
				.getSignupCompleteMessage()
				.should("have.text", "Sign up complete");
			eventSignup.getSignupEventName().should("have.text", signedUpeventName);
		});
	});

	it("It shows the Sign up complete message - for existing candidate", function () {
		let signedUpeventName;
		searchForEvent.getEventsType().select(this.testData.eventsType);
		searchForEvent.getEventLocation().select(this.testData.eventLocation);
		searchForEvent.getEventsMonth().select(this.testData.eventsMonth);
		searchForEvent.getUpdateResultsButton().click();
		eventSignup
			.getSearchedEventName()
			.first()
			.then(function (eventName) {
				cy.contains(eventName.text().trim()).click();
				eventSignup.getSignupForThisEventButton().click();
				eventSignup
					.getEventNameHeader()
					.should("have.text", eventName.text().trim());
				signedUpeventName = eventName.text().trim();

				eventSignup.getFirstName().type(this.testData.firstName);
				eventSignup.getLastName().type(this.testData.lastName);
				eventSignup.getEmail().type(this.testData.email);
				eventSignup.getNextStep().click();
				cy.enterEmailVerificationCode();
				eventSignup.getNextStep().click();
				eventSignup.getBackButton().should("exist").should("have.text", "Back");
				cy.log(this.testData.phoneNumber);
				eventSignup.getPhoneNumber().clear();
				eventSignup.getPhoneNumber().type(this.testData.phoneNumber);
				eventSignup.getNextStep().click();
				eventSignup.getPrivacyPolicy().click();
				eventSignup
					.getWouldYouLikeToReceiveInformationAboutFutureEventsInYourArea("Yes")
					.click();
				eventSignup
					.getWouldYouLikeToReceivePersonalisedInformationToHelpYouGetIntoTeaching(
						"Yes"
					)
					.click();
				eventSignup.getPostcode().clear();
				eventSignup.getPostcode().type(this.testData.postcode);
				eventSignup.getCompleteSignup().click();
				eventSignup
					.getSignupCompleteMessage()
					.should("have.text", "Sign up complete");
				eventSignup.getSignupEventName().should("have.text", signedUpeventName);
			});
	});

	it('It sends the another email evrification code if user clicks on "resend verification" link', function () {
		let signedupEventName;
		searchForEvent.getEventsType().select(this.testData.eventsType);
		searchForEvent.getEventLocation().select(this.testData.eventLocation);
		searchForEvent.getEventsMonth().select(this.testData.eventsMonth);
		searchForEvent.getUpdateResultsButton().click();
		eventSignup
			.getSearchedEventName()
			.first()
			.then(function (eventName) {
				cy.contains(eventName.text().trim()).click();
				eventSignup.getSignupForThisEventButton().click();
				eventSignup
					.getEventNameHeader()
					.should("have.text", eventName.text().trim());
				signedupEventName = eventName.text().trim();
				eventSignup.getFirstName().type(this.testData.firstName);
				eventSignup.getLastName().type(this.testData.lastName);
				eventSignup.getEmail().type(this.testData.email);
				eventSignup.getNextStep().click();
				cy.enterVerificationCode("123456");
				eventSignup.getNextStep().click();
				eventSignup
					.getErrorTitle()
					.should("exist")
					.should("have.text", "There is a problem");
				eventSignup.getResendVerificationLink().click();
				cy.enterEmailVerificationCode();
				eventSignup.getNextStep().click();
				eventSignup.getBackButton().should("exist").should("have.text", "Back");
				cy.log(this.testData.phoneNumber);
				eventSignup.getPhoneNumber().clear();
				eventSignup.getPhoneNumber().type(this.testData.phoneNumber);
				eventSignup.getNextStep().click();
				eventSignup.getPrivacyPolicy().click();
				eventSignup
					.getWouldYouLikeToReceiveInformationAboutFutureEventsInYourArea("Yes")
					.click();
				eventSignup
					.getWouldYouLikeToReceivePersonalisedInformationToHelpYouGetIntoTeaching(
						"Yes"
					)
					.click();
				eventSignup.getPostcode().clear();
				eventSignup.getPostcode().type(this.testData.postcode);
				eventSignup.getCompleteSignup().click();
				eventSignup
					.getSignupCompleteMessage()
					.should("have.text", "Sign up complete");
				eventSignup.getSignupEventName().should("have.text", signedupEventName);
			});
	});

	it("It shows error message if user enters wrong email verification code", function () {
		let signedupEventName;
		let error = false;
		searchForEvent.getEventsType().select(this.testData.eventsType);
		searchForEvent.getEventLocation().select(this.testData.eventLocation);
		searchForEvent.getEventsMonth().select(this.testData.eventsMonth);
		searchForEvent.getUpdateResultsButton().click();
		eventSignup
			.getSearchedEventName()
			.first()
			.then(function (eventName) {
				cy.contains(eventName.text().trim()).click();
				eventSignup.getSignupForThisEventButton().click();
				eventSignup
					.getEventNameHeader()
					.should("have.text", eventName.text().trim());
				signedupEventName = eventName.text().trim();
				eventSignup.getFirstName().type(this.testData.firstName);
				eventSignup.getLastName().type(this.testData.lastName);
				eventSignup.getEmail().type(this.testData.email);
				eventSignup.getNextStep().click();
				cy.enterVerificationCode("12345", (error = false));
				eventSignup.getNextStep().click();
				eventSignup
					.getErrorTitle()
					.should("exist")
					.should("have.text", "There is a problem");
				cy.get(".govuk-list > li > a")
					.should("exist")
					.should("have.text", "The verification code should be 6 digits");
				cy.enterVerificationCode("1234567", true);
				eventSignup.getNextStep().click();
				eventSignup
					.getErrorTitle()
					.should("exist")
					.should("have.text", "There is a problem");
				cy.get(".govuk-list > li > a")
					.should("exist")
					.should("have.text", "The verification code should be 6 digits");

				cy.enterVerificationCode("123456", true);
				eventSignup.getNextStep().click();
				eventSignup
					.getErrorTitle()
					.should("exist")
					.should("have.text", "There is a problem");
				cy.get(".govuk-list > li > a")
					.should("exist")
					.should(
						"have.text",
						"Please enter the latest verification code sent to your email address"
					);

				cy.get("#events-steps-authenticate-timed-one-time-password-error")
					.should("exist")
					.should(
						"have.text",
						"Error: Please enter the latest verification code sent to your email address"
					);
			});
	});

	it("It shows the error message if user clicks next button without entering the mandatory details", function () {
		let signedupEventName;
		searchForEvent.getEventsType().select(this.testData.eventsType);
		searchForEvent.getEventLocation().select(this.testData.eventLocation);
		searchForEvent.getEventsMonth().select(this.testData.eventsMonth);
		searchForEvent.getUpdateResultsButton().click();
		eventSignup
			.getSearchedEventName()
			.first()
			.then(function (eventName) {
				cy.contains(eventName.text().trim()).click();
				eventSignup.getSignupForThisEventButton().click();
				eventSignup
					.getEventNameHeader()
					.should("have.text", eventName.text().trim());
				signedupEventName = eventName.text().trim();

				eventSignup.getNextStep().click();
				eventSignup
					.getErrorTitle()
					.should("exist")
					.should("have.text", "There is a problem");
				cy.get(".govuk-error-summary__list")
					.children()
					.should("exist")
					.next()
					.should("exist")
					.next()
					.should("exist");
				cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)")
					.should("have.text", "Enter your full email address")
					.next()
					.should("have.text", "Enter your first name")
					.next()
					.should("have.text", "Enter your last name");
			});
	});

	it("Error message link navigates to its respective field", function () {
		let signedupEventName;
		searchForEvent.getEventsType().select(this.testData.eventsType);
		searchForEvent.getEventLocation().select(this.testData.eventLocation);
		searchForEvent.getEventsMonth().select(this.testData.eventsMonth);
		searchForEvent.getUpdateResultsButton().click();
		eventSignup
			.getSearchedEventName()
			.first()
			.then(function (eventName) {
				cy.contains(eventName.text().trim()).click();
				eventSignup.getSignupForThisEventButton().click();
				eventSignup
					.getEventNameHeader()
					.should("have.text", eventName.text().trim());
				signedupEventName = eventName.text().trim();

				eventSignup.getNextStep().click();
				cy.contains("Enter your full email address")
					.should((el) => {
						expect(el).to.have.attr(
							"href",
							"#events-steps-personal-details-email-field-error"
						);
					})
					.click()
					.type("Test_email@gmail.com");
				eventSignup.getNextStep().click();
				cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)")
					.should("have.text", "Enter your first name")
					.next()
					.should("have.text", "Enter your last name");

				cy.contains("Enter your first name")
					.should((el) => {
						expect(el).to.have.attr(
							"href",
							"#events-steps-personal-details-first-name-field-error"
						);
					})
					.click()
					.type("Test_First_Name");
				eventSignup.getNextStep().click();
				cy.get(
					".govuk-list.govuk-error-summary__list > li:nth-child(1)"
				).should("have.text", "Enter your last name");

				cy.contains("Enter your last name")
					.should((el) => {
						expect(el).to.have.attr(
							"href",
							"#events-steps-personal-details-last-name-field-error"
						);
					})
					.click()
					.type("Test_Last_Name");
				eventSignup.getNextStep().click();
			});
		cy.get(".govuk-back-link").should("exist").should("have.text", "Back");
	});
});
