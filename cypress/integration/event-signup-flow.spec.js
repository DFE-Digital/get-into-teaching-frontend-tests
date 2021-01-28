import Homepage from "../support/pageobjects/Homepage";
import EventSignupPage from "../support/pageobjects/EventSignupPage";

describe("Feature - Event sign up : Tests execution date and time : " + new Date(), () => {
	const searchForEvent = new Homepage();
	const eventSignup = new EventSignupPage();

	beforeEach(function () {
		cy.fixture("event-signup-test-data").then((eventSignupTestData) => {
			this.eventSignupTestData = eventSignupTestData;
		});
		cy.navigateToPage("/events");
	});

	it("It shows the Sign up complete message - for new candidate who doesn't like to receive email updates", function () {
		let signedUpeventName;
		cy.updateEventMonth(
			this.eventSignupTestData.eventsType,
			this.eventSignupTestData.eventLocation
		);
		cy.setEventMonth(
			this.eventSignupTestData.eventsType,
			this.eventSignupTestData.eventLocation
		).then((month) => {
			if (month == "") {
				searchForEvent.getUpdateResultsButton().click();
				cy.get(".search-for-events-no-results").should(
					"include.text",
					"Sorry your search has not found any events, try a different type, location or month."
				);
			} else {
				searchForEvent.getEventsMonth().select(month);
				searchForEvent.getUpdateResultsButton().click();
				eventSignup
					.getSearchedEventName()
					.first()
					.then(function (eventName) {
						eventSignup.getSearchedEventName().first().click();
						eventSignup.getSignupForThisEventButton().click();
						eventSignup.getEventNameHeader().should("have.text", eventName.text().trim());
						signedUpeventName = eventName.text().trim();
						eventSignup.getFirstName().type(this.eventSignupTestData.firstName);
						eventSignup.getLastName().type(this.eventSignupTestData.lastName);
						let rnum = Math.floor(Math.random() * 1000000 + 1);
						let email = "testuser" + rnum.toString() + "@gmail.co.uk";
						eventSignup.getEmail().type(email);
						eventSignup.getNextStep().click();
						eventSignup.getBackButton().should("exist").should("have.text", "Back");
						eventSignup.getPhoneNumber().type(this.eventSignupTestData.phoneNumber);
						eventSignup.getNextStep().click();
						eventSignup.getPrivacyPolicy().click();
						cy.wouldYouLikeToReceiveEmailUpdate("No");
						cy.VerifySignupCompleteMessage();
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
					});
			}
		});
	});

	it("It shows the Sign up complete message - for new candidate who like to receive email updates", function () {
		// Scenario - candidate who like to receive email updateslike to receive email updates
		let signedUpeventName;
		cy.setEventMonth(
			this.eventSignupTestData.eventsType,
			this.eventSignupTestData.eventLocation
		).then((month) => {
			if (month == "") {
				searchForEvent.getUpdateResultsButton().click();
				cy.get(".search-for-events-no-results").should(
					"include.text",
					"Sorry your search has not found any events, try a different type, location or month."
				);
			} else {
				searchForEvent.getEventsMonth().select(month);
				searchForEvent.getUpdateResultsButton().click();
				eventSignup
					.getSearchedEventName()
					.first()
					.then(function (eventName) {
						eventSignup.getSearchedEventName().eq(0).click();
						eventSignup.getSignupForThisEventButton().click();
						eventSignup.getEventNameHeader().should("have.text", eventName.text().trim());
						signedUpeventName = eventName.text().trim();
						eventSignup.getFirstName().type(this.eventSignupTestData.firstName);
						eventSignup.getLastName().type(this.eventSignupTestData.lastName);
						let rnum = Math.floor(Math.random() * 1000000 + 1);
						let email = "testuser" + rnum.toString() + "@gmail.co.uk";
						eventSignup.getEmail().type(email);
						eventSignup.getNextStep().click();
						eventSignup.getBackButton().should("exist").should("have.text", "Back");
						eventSignup.getPhoneNumber().type(this.eventSignupTestData.phoneNumber);
						eventSignup.getNextStep().click();
						eventSignup.getPrivacyPolicy().click();
						cy.wouldYouLikeToReceiveEmailUpdate("Yes");
						eventSignup.getNextStep().click();
						cy.get("#events-steps-personalised-updates-degree-status-id-field").select(
							"Final year"
						);
						cy.get(
							"#events-steps-personalised-updates-consideration-journey-stage-id-field"
						).select("I’m fairly sure and exploring my options");
						cy.get("#events-steps-personalised-updates-preferred-teaching-subject-id-field").select(
							"English"
						);
						eventSignup.getCompleteSignup().click();
						cy.VerifySignupCompleteMessage();
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
					});
			}
		});
	});

	it("It shows the Sign up complete message - for existing candidate", function () {
		let signedUpeventName;
		let rnum = Math.floor(Math.random() * 1000000 + 1);
		let firstName = "User_" + rnum + "_firstname";
		let lastName = "User_" + rnum + "_lastname";
		cy.setEventMonth(
			this.eventSignupTestData.eventsType,
			this.eventSignupTestData.eventLocation
		).then((month) => {
			if (month == "") {
				searchForEvent.getUpdateResultsButton().click();
				cy.get(".search-for-events-no-results").should(
					"include.text",
					"Sorry your search has not found any events, try a different type, location or month."
				);
			} else {
				searchForEvent.getEventsMonth().select(month);
				searchForEvent.getUpdateResultsButton().click();
				eventSignup
					.getSearchedEventName()
					.first()
					.then(function (eventName) {
						eventSignup.getSearchedEventName().first().click();
						eventSignup.getSignupForThisEventButton().click();
						eventSignup.getEventNameHeader().should("have.text", eventName.text().trim());
						signedUpeventName = eventName.text().trim();
						eventSignup.getFirstName().type(firstName);
						eventSignup.getLastName().type(lastName);
						eventSignup.getEmail().type(this.eventSignupTestData.eventUserEmail);
						eventSignup.getNextStep().click();
						eventSignup.getBackButton().should("exist").should("have.text", "Back");
						eventSignup.getPhoneNumber().type(this.eventSignupTestData.phoneNumber);
						eventSignup.getNextStep().click();
						eventSignup.getPrivacyPolicy().click();
						cy.wouldYouLikeToReceiveEmailUpdate("Yes");
						eventSignup.getNextStep().click();
						cy.get("#events-steps-personalised-updates-degree-status-id-field").select(
							"Final year"
						);
						cy.get(
							"#events-steps-personalised-updates-consideration-journey-stage-id-field"
						).select("I’m fairly sure and exploring my options");
						cy.get("#events-steps-personalised-updates-preferred-teaching-subject-id-field").select(
							"English"
						);
						eventSignup.getCompleteSignup().click();
						cy.VerifySignupCompleteMessage();
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
						eventSignup
							.getSignupEventName()
							.next()
							.next()
							.should("have.text", "You've also signed up for email updates");
					});
				cy.wait(8000);
				cy.contains("Find an event near you").click();
				searchForEvent.getEventsType().select(this.eventSignupTestData.eventsType);
				searchForEvent.getEventLocation().select(this.eventSignupTestData.eventLocation);
				searchForEvent.getEventsMonth().select(month);
				searchForEvent.getUpdateResultsButton().click();
				eventSignup
					.getSearchedEventName()
					.first()
					.then(function (eventName) {
						cy.contains(eventName.text().trim()).click();
						eventSignup.getSignupForThisEventButton().click();
						eventSignup.getEventNameHeader().should("have.text", eventName.text().trim());
						signedUpeventName = eventName.text().trim();
						eventSignup.getFirstName().type(firstName);
						eventSignup.getLastName().type(lastName);
						eventSignup.getEmail().type(this.eventSignupTestData.eventUserEmail);
						eventSignup.getNextStep().click();
						cy.enterEmailVerificationCode(
							this.eventSignupTestData.eventUserEmail,
							this.eventSignupTestData.eventUserKey
						).then((otp) => {
							cy.get("#events-steps-authenticate-timed-one-time-password-field").type(otp);
						});
						eventSignup.getNextStep().click();
						eventSignup.getBackButton().should("exist").should("have.text", "Back");
						cy.verifyMobileFieldAndDisplayedValue(this.eventSignupTestData.phoneNumber);
						eventSignup.getNextStep().click();
						eventSignup.getPrivacyPolicy().click();
						eventSignup.getCompleteSignup().click();
						cy.VerifySignupCompleteMessage();
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
					});
			}
		});
	});
});

describe("Verify page load " + new Date(), () => {
	const searchForEvent = new Homepage();
	it('It shows the "Train to Teach Events" page', function () {
		cy.navigateToPage("/event_categories/train-to-teach-events");
		cy.verifyPageHeading("Train to Teach events");
		searchForEvent
			.getSearchforEventsHeading()
			.should("exist")
			.should("have.text", "Search for Train to Teach events");
	});
	it('It shows the "Online Events" page', function () {
		cy.navigateToPage("/event_categories/online-events");
		cy.verifyPageHeading("Online events");
		searchForEvent
			.getSearchforEventsHeading()
			.should("exist")
			.should("have.text", "Search for Online events");
	});
	it('It shows the "School and University Events" page', function () {
		cy.navigateToPage("/event_categories/school-and-university-events");
		cy.verifyPageHeading("School and University events");
		searchForEvent
			.getSearchforEventsHeading()
			.should("exist")
			.should("have.text", "Search for School and University events");
	});

	it('It shows the "Past Online Events" page', function () {
		cy.navigateToPage("/event_categories/online-events/archive");
		cy.verifyPageHeading("Past online events");
		searchForEvent
			.getSearchforEventsHeading()
			.should("exist")
			.should("have.text", "Search for Past online events");
	});
});
