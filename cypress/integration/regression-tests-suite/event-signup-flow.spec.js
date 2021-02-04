import Homepage from "../../support/pageobjects/Homepage";
import EventSignupPage from "../../support/pageobjects/EventSignupPage";

describe("Feature - Event sign up : Tests execution date and time : " + new Date(), () => {
	const searchForEvent = new Homepage();
	const eventSignup = new EventSignupPage();
	let firstName;
	let lastName;

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
		firstName = "Testuser_" + rnum + "_firstname";
		lastName = "Testuser_" + rnum + "_lastname";
		cy.updateEventMonth(this.testData.eventsType, this.testData.eventLocation);
		cy.setEventMonth(this.testData.eventsType, this.testData.eventLocation).then((month) => {
			if (month == "") {
				searchForEvent
					.getEventsMonth()
					.as("selectMonth")
					.children()
					.first()
					.then((month) => {
						cy.get("@selectMonth").select(month.text());
					});
				searchForEvent.getUpdateResultsButton().click();
				cy.get(".no-results").should(
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
						cy.VerifyEventName(eventName.text());
						signedUpeventName = eventName.text().trim();
						cy.signupForEvent(firstName, lastName, this.testData.eventUserEmail);
						eventSignup.getBackButton().should("exist").should("have.text", "Back");
						eventSignup.getPhoneNumber().type(this.testData.phoneNumber);
						cy.clickOnNextStepButton();
						eventSignup.getPrivacyPolicy().click();
						cy.wouldYouLikeToReceiveEmailUpdate("No");
						cy.VerifySignupCompleteMessage();
						cy.VerifyEventName(signedUpeventName);
					});
			}
		});
	});

	it("It shows the Sign up complete message - for existing candidate", function () {
		let signedUpeventName;
		cy.setEventMonth(this.testData.eventsType, this.testData.eventLocation).then((month) => {
			if (month == "") {
				searchForEvent
					.getEventsMonth()
					.as("selectMonth")
					.children()
					.first()
					.then((month) => {
						cy.get("@selectMonth").select(month.text());
					});
				searchForEvent.getUpdateResultsButton().click();
				cy.get(".no-results").should(
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
						cy.VerifyEventName(eventName.text());
						signedUpeventName = eventName.text().trim();
						cy.signupForEvent(firstName, lastName, this.testData.eventUserEmail);
						cy.contains(eventName.text()).should("exist");
						cy.enterEmailVerificationCode(
							this.testData.eventUserEmail,
							this.testData.eventUserKey
						).then((otp) => {
							cy.get("#events-steps-authenticate-timed-one-time-password-field").type(otp);
						});
						cy.clickOnNextStepButton();
						eventSignup.getBackButton().should("exist").should("have.text", "Back");
						cy.verifyMobileFieldAndDisplayedValue(this.testData.phoneNumber);
						cy.clickOnNextStepButton();
						eventSignup.getPrivacyPolicy().click();
						eventSignup.getCompleteSignup().click();
						cy.VerifySignupCompleteMessage();
						cy.VerifyEventName(signedUpeventName);
					});
			}
		});
	});
});
