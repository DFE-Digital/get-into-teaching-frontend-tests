import Homepage from "../../support/pageobjects/Homepage";
import EventSignupPage from "../../support/pageobjects/EventSignupPage";

describe("Feature - Event sign up : Tests execution date and time : " + new Date(), () => {
	const searchForEvent = new Homepage();
	const eventSignup = new EventSignupPage();
	let firstName;
	let lastName;

	beforeEach(function () {
		cy.fixture("event-signup-test-data").then((eventSignupTestData) => {
			this.eventSignupTestData = eventSignupTestData;
		});
		cy.navigateToPage("/events");
	});

	it("It shows the Sign up for this event page", function () {
		cy.updateEventMonth(this.eventSignupTestData.eventsType, this.eventSignupTestData.eventLocation);
		cy.setEventMonth(this.eventSignupTestData.eventsType, this.eventSignupTestData.eventLocation).then((month) => {
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
						cy.contains(eventName.text().trim()).click();
						eventSignup.getSignupForThisEventButton().click();
						cy.VerifyEventName(eventName.text());
					});
			}
		});
	});

	// Disabled while we don't have any TTT events live.
	//
	// it("It shows the Sign up complete message - for new candidate who doesn't like to receive email updates", function () {
	// 	let signedUpeventName;
	// 	let rnum = Math.floor(Math.random() * 10000000 + 1);
	// 	firstName = "Testuser_" + rnum + "_firstname";
	// 	lastName = "Testuser_" + rnum + "_lastname";
	// 	cy.setEventMonth(this.eventSignupTestData.eventsType, this.eventSignupTestData.eventLocation).then((month) => {
	// 		if (month == "") {
	// 			searchForEvent.getUpdateResultsButton().click();
	// 			cy.get(".search-for-events-no-results").should(
	// 				"include.text",
	// 				"Sorry your search has not found any events, try a different type, location or month."
	// 			);
	// 		} else {
	// 			searchForEvent.getEventsMonth().select(month);
	// 			searchForEvent.getUpdateResultsButton().click();
	// 			eventSignup
	// 				.getSearchedEventName()
	// 				.first()
	// 				.then(function (eventName) {
	// 					eventSignup.getSearchedEventName().first().click();
	// 					eventSignup.getSignupForThisEventButton().click();
	// 					cy.VerifyEventName(eventName.text());
	// 					signedUpeventName = eventName.text().trim();
	// 					cy.signupForEvent(firstName, lastName, this.eventSignupTestData.eventUserEmail);
	// 					eventSignup.getBackButton().should("exist").should("have.text", "Back");
	// 					eventSignup.getPhoneNumber().type(this.eventSignupTestData.phoneNumber);
	// 					eventSignup.getNextStep().click();
	// 					eventSignup.getPrivacyPolicy().click();
	// 					cy.wouldYouLikeToReceiveEmailUpdate("No");
	// 					cy.VerifySignupCompleteMessage();
	// 					cy.VerifyEventName(signedUpeventName);
	// 				});
	// 		}
	// 	});
	// });
	// it("It shows the Sign up complete message - for existing candidate", function () {
	// 	cy.waitForRegistrationToComplete(5000);
	// 	let signedUpeventName;
	// 	cy.setEventMonth(this.eventSignupTestData.eventsType, this.eventSignupTestData.eventLocation).then((month) => {
	// 		if (month == "") {
	// 			searchForEvent
	// 				.getEventsMonth()
	// 				.as("selectMonth")
	// 				.children()
	// 				.first()
	// 				.then((month) => {
	// 					cy.get("@selectMonth").select(month.text());
	// 				});
	// 			searchForEvent.getUpdateResultsButton().click();
	// 			cy.get(".no-results").should(
	// 				"include.text",
	// 				"Sorry your search has not found any events, try a different type, location or month."
	// 			);
	// 		} else {
	// 			searchForEvent.getEventsMonth().select(month);
	// 			searchForEvent.getUpdateResultsButton().click();
	// 			eventSignup
	// 				.getSearchedEventName()
	// 				.first()
	// 				.then(function (eventName) {
	// 					eventSignup.getSearchedEventName().first().click();
	// 					eventSignup.getSignupForThisEventButton().click();
	// 					cy.VerifyEventName(eventName.text());
	// 					signedUpeventName = eventName.text().trim();
	// 					cy.signupForEvent(firstName, lastName, this.eventSignupTestData.eventUserEmail);
	// 					cy.contains(eventName.text()).should("exist");
	// 					cy.enterEmailVerificationCode(this.eventSignupTestData.eventUserEmail, Cypress.env("EVENT_USER_EMAIL_API_KEY"));
	// 					cy.clickOnNextStepButton();
	// 					eventSignup.getBackButton().should("exist").should("have.text", "Back");
	// 					eventSignup.getPrivacyPolicy().click();
	// 					eventSignup.getCompleteSignup().click();
	// 					cy.VerifySignupCompleteMessage();
	// 					cy.VerifyEventName(signedUpeventName);
	// 				});
	// 		}
	// 	});
	// });

	// it("It shows the Sign up complete message - for new candidate who like to receive email updates", function () {
	// 	// Scenario - candidate who like to receive email updateslike to receive email updates
	// 	let signedUpeventName;
	// 	cy.setEventMonth(this.eventSignupTestData.eventsType, this.eventSignupTestData.eventLocation).then((month) => {
	// 		if (month == "") {
	// 			searchForEvent.getUpdateResultsButton().click();
	// 			cy.get(".search-for-events-no-results").should(
	// 				"include.text",
	// 				"Sorry your search has not found any events, try a different type, location or month."
	// 			);
	// 		} else {
	// 			searchForEvent.getEventsMonth().select(month);
	// 			searchForEvent.getUpdateResultsButton().click();
	// 			eventSignup
	// 				.getSearchedEventName()
	// 				.first()
	// 				.then(function (eventName) {
	// 					eventSignup.getSearchedEventName().eq(0).click();
	// 					eventSignup.getSignupForThisEventButton().click();
	// 					cy.VerifyEventName(eventName.text());
	// 					signedUpeventName = eventName.text().trim();
	// 					eventSignup.getFirstName().type(this.eventSignupTestData.firstName);
	// 					eventSignup.getLastName().type(this.eventSignupTestData.lastName);
	// 					let rnum = Math.floor(Math.random() * 1000000 + 1);
	// 					let email = "testuser" + rnum.toString() + "@gmail.co.uk";
	// 					eventSignup.getEmail().type(email);
	// 					eventSignup.getNextStep().click();
	// 					eventSignup.getBackButton().should("exist").should("have.text", "Back");
	// 					eventSignup.getPhoneNumber().type(this.eventSignupTestData.phoneNumber);
	// 					eventSignup.getNextStep().click();
	// 					eventSignup.getPrivacyPolicy().click();
	// 					cy.wouldYouLikeToReceiveEmailUpdate("Yes");
	// 					eventSignup.getNextStep().click();
	// 					cy.get("#events-steps-personalised-updates-degree-status-id-field").select("Final year");
	// 					cy.get("#events-steps-personalised-updates-consideration-journey-stage-id-field").select(
	// 						"I’m fairly sure and exploring my options"
	// 					);
	// 					cy.get("#events-steps-personalised-updates-preferred-teaching-subject-id-field").select("English");
	// 					eventSignup.getCompleteSignup().click();
	// 					cy.VerifySignupCompleteMessage();
	// 					cy.VerifyEventName(signedUpeventName);
	// 				});
	// 		}
	// 	});
	// });

	// it('It sends the another email verification code if user clicks on "resend verification" link', function () {
	// 	let signedUpeventName;
	// 	let rnum = Math.floor(Math.random() * 1000000 + 1);
	// 	let firstName = "User_" + rnum + "_firstname";
	// 	let lastName = "User_" + rnum + "_lastname";
	// 	cy.setEventMonth(this.eventSignupTestData.eventsType, this.eventSignupTestData.eventLocation).then((month) => {
	// 		if (month == "") {
	// 			searchForEvent.getUpdateResultsButton().click();
	// 			cy.get(".search-for-events-no-results").should(
	// 				"include.text",
	// 				"Sorry your search has not found any events, try a different type, location or month."
	// 			);
	// 		} else {
	// 			searchForEvent.getEventsMonth().select(month);
	// 			searchForEvent.getUpdateResultsButton().click();
	// 			eventSignup
	// 				.getSearchedEventName()
	// 				.first()
	// 				.then(function (eventName) {
	// 					eventSignup.getSearchedEventName().first().click();
	// 					eventSignup.getSignupForThisEventButton().click();
	// 					cy.VerifyEventName(eventName.text());
	// 					signedUpeventName = eventName.text().trim();
	// 					eventSignup.getFirstName().type(firstName);
	// 					eventSignup.getLastName().type(lastName);
	// 					eventSignup.getEmail().type(this.eventSignupTestData.eventUserEmail);
	// 					eventSignup.getNextStep().click();
	// 					eventSignup.getBackButton().should("exist").should("have.text", "Back");
	// 					eventSignup.getPhoneNumber().type(this.eventSignupTestData.phoneNumber);
	// 					eventSignup.getNextStep().click();
	// 					eventSignup.getPrivacyPolicy().click();
	// 					cy.wouldYouLikeToReceiveEmailUpdate("Yes");
	// 					eventSignup.getNextStep().click();
	// 					cy.get("#events-steps-personalised-updates-degree-status-id-field").select("Final year");
	// 					cy.get("#events-steps-personalised-updates-consideration-journey-stage-id-field").select(
	// 						"I’m fairly sure and exploring my options"
	// 					);
	// 					cy.get("#events-steps-personalised-updates-preferred-teaching-subject-id-field").select("English");
	// 					eventSignup.getCompleteSignup().click();
	// 					cy.VerifySignupCompleteMessage();
	// 					cy.VerifyEventName(signedUpeventName);
	// 					cy.VerifyEventName(signedUpeventName)
	// 						.next()
	// 						.next()
	// 						.should("have.text", "You've also signed up for email updates");
	// 				});
	// 			cy.wait(5000);
	// 			cy.contains("Find an event near you").click();
	// 			searchForEvent.getEventsType().select(this.eventSignupTestData.eventsType);
	// 			searchForEvent.getEventLocation().select(this.eventSignupTestData.eventLocation);
	// 			searchForEvent.getEventsMonth().select(month);
	// 			searchForEvent.getUpdateResultsButton().click();
	// 			eventSignup
	// 				.getSearchedEventName()
	// 				.first()
	// 				.then(function (eventName) {
	// 					cy.contains(eventName.text().trim()).click();
	// 					eventSignup.getSignupForThisEventButton().click();
	// 					cy.VerifyEventName(eventName.text());
	// 					signedUpeventName = eventName.text().trim();
	// 					eventSignup.getFirstName().type(firstName);
	// 					eventSignup.getLastName().type(lastName);
	// 					eventSignup.getEmail().type(this.eventSignupTestData.eventUserEmail);
	// 					eventSignup.getNextStep().click();
	// 					cy.enterVerificationCode("123456");
	// 					eventSignup.getNextStep().click();
	// 					eventSignup.getErrorTitle().should("exist").should("have.text", "There is a problem");
	// 					eventSignup.getResendVerificationLink().click();
	// 					cy.enterEmailVerificationCode(this.eventSignupTestData.eventUserEmail, Cypress.env("EVENT_USER_EMAIL_API_KEY"));
	// 					eventSignup.getNextStep().click();
	// 					eventSignup.getBackButton().should("exist").should("have.text", "Back");
	// 					eventSignup.getPrivacyPolicy().click();
	// 					eventSignup.getCompleteSignup().click();
	// 					cy.VerifySignupCompleteMessage();
	// 					cy.VerifyEventName(signedUpeventName);
	// 				});
	// 		}
	// 	});
	// });
});

