import Homepage from "../support/pageobjects/Homepage";
import EventSignupPage from "../support/pageobjects/EventSignupPage";

describe("Get-into-teaching - Event sign up flow", () => {
	const searchForEvent = new Homepage();
	const eventSignup = new EventSignupPage();
	let signedUpeventName;
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
		searchForEvent.getEventsType().select(this.testData.eventsType);
		searchForEvent.getEventLocation().select(this.testData.eventLocation);
		searchForEvent.getEventsMonth().select(this.testData.eventsMonth);
		searchForEvent.getUpdateResultsButton().click();
		eventSignup.getSearchedEventName().then(function (eventName) {
			eventSignup.getSearchedEventName().click();
			eventSignup.getSignupForThisEventButton().click();
		});
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
		cy.get(".content__left > .strapline").should(
			"have.text",
			"Sign up complete"
		);
		cy.get(".content__left > b").should("have.text", signedUpeventName);
	});

	it("It shows the Sign up complete message - for existing candidate", function () {
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
			});
		eventSignup.getFirstName().type(this.testData.firstName);
		eventSignup.getLastName().type(this.testData.lastName);
		eventSignup.getEmail().type(this.testData.email);
		eventSignup.getNextStep().click();
		cy.enterEmailVerificationCode();
		cy.get(
			"#edit_events_steps_authenticate_authenticate > .call-to-action-button"
		).click();
		eventSignup.getBackButton().should("exist").should("have.text", "Back");
		cy.log(this.testData.phoneNumber);
		eventSignup.getPhoneNumber().clear();
		eventSignup.getPhoneNumber().type(this.testData.phoneNumber);
		eventSignup.getNextStep().click();
		eventSignup.getPrivacyPolicy().click();
		eventSignup.getPostcode().clear();
		eventSignup.getPostcode().type(this.testData.postcode);
		eventSignup.getCompleteSignup().click();
		cy.get(".content__left > .strapline").should(
			"have.text",
			"Sign up complete"
		);
		cy.log("======= " + signedUpeventName);
		cy.get(".content__left > b").should("have.text", signedUpeventName);
	});
});
