import Homepage from "../support/pageobjects/Homepage";
import EventSignupPage from "../support/pageobjects/EventSignupPage";

describe("Feature - Event sign up : Tests execution date and time : " + new Date(), () => {
	const searchForEvent = new Homepage();
	const eventSignup = new EventSignupPage();

	beforeEach(function () {
		cy.fixture("event-signup-test-data").then((testData) => {
			this.testData = testData;
		});
		cy.navigateToPage("/events");
	});

	it("Verify pages response", function () {
		cy.verifyPageResponse("/event_categories/train-to-teach-events");
		cy.verifyPageResponse("/event_categories/online-events");
		cy.verifyPageResponse("/event_categories/school-and-university-events");
		cy.verifyPageResponse("/event_categories/online-events/archive");
	});

	it("It shows the Sign up complete message - for new candidate", function () {
		let signedUpeventName;
		let rnum = Math.floor(Math.random() * 10000000 + 1);
		let email = "testuser" + rnum + "email@gmail.com";
		cy.updateEventMonth(this.testData.eventsType, this.testData.eventLocation);
		cy.setEventMonth(this.testData.eventsType, this.testData.eventLocation).then((month) => {
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
						cy.signupForEvent(this.testData.firstName, this.testData.lastName, email);
						eventSignup.getBackButton().should("exist").should("have.text", "Back");
						eventSignup.getPhoneNumber().type(this.testData.phoneNumber);
						eventSignup.getNextStep().click();
						eventSignup.getPrivacyPolicy().click();
						cy.wouldYouLikeToReceiveEmailUpdate("No");
						cy.VerifySignupCompleteMessage();
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
					});
			}
		});
	});

	it("It shows the Sign up complete message - for existing candidate", function () {
		let signedUpeventName;
		let rnum = Math.floor(Math.random() * 1000000 + 1);
		let firstName = "Testuser_" + rnum + "_firstname";
		let lastName = "Testuser_" + rnum + "_lastname";
		cy.setEventMonth(this.testData.eventsType, this.testData.eventLocation).then((month) => {
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
						cy.signupForEvent(firstName, lastName, this.testData.email);
						eventSignup.getBackButton().should("exist").should("have.text", "Back");
						eventSignup.getPhoneNumber().type(this.testData.phoneNumber);
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
				cy.wait(5000);
				cy.contains("Find an event near you").click();
				searchForEvent.getEventsType().select(this.testData.eventsType);
				searchForEvent.getEventLocation().select(this.testData.eventLocation);
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
						cy.signupForEvent(firstName, lastName, this.testData.email);
						cy.contains(eventName.text()).should("exist");
						cy.enterEmailVerificationCode(this.testData.email, this.testData.userKey).then(
							(otp) => {
								cy.get("#events-steps-authenticate-timed-one-time-password-field").type(otp);
							}
						);
						eventSignup.getNextStep().click();
						eventSignup.getBackButton().should("exist").should("have.text", "Back");
						cy.verifyMobileFieldAndDisplayedValue(this.testData.phoneNumber);
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
