import Homepage from "../support/pageobjects/Homepage";
import EventSignupPage from "../support/pageobjects/EventSignupPage";

describe("Feature - Event sign up : Tests execution date and time : " + new Date(), () => {
	const searchForEvent = new Homepage();
	const eventSignup = new EventSignupPage();

	beforeEach(function () {
		cy.fixture("event-signup-test-data").then((eventSignupTestData) => {
			this.eventSignupTestData = eventSignupTestData;
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
						cy.contains(eventName.text().trim()).click();
						eventSignup.getSignupForThisEventButton().click();
						eventSignup.getEventNameHeader().should("have.text", eventName.text().trim());
					});
			}
		});
	});

	it("It shows the Sign up complete message - for new candidate who doesn't like to receive email updates", function () {
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
						eventSignup.getSignupCompleteMessage().should("have.text", "Sign up complete");
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
						eventSignup.getSignupCompleteMessage().should("have.text", "Sign up complete");
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
						eventSignup.getSignupCompleteMessage().should("have.text", "Sign up complete");
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
						eventSignup
							.getSignupEventName()
							.next()
							.next()
							.should("have.text", "You've also signed up for email updates");
					});
				cy.wait(5000);
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
						eventSignup.getSignupCompleteMessage().should("have.text", "Sign up complete");
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
					});
			}
		});
	});

	it('It sends the another email verification code if user clicks on "resend verification" link', function () {
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
						eventSignup.getSignupCompleteMessage().should("have.text", "Sign up complete");
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
						eventSignup
							.getSignupEventName()
							.next()
							.next()
							.should("have.text", "You've also signed up for email updates");
					});
				cy.wait(5000);
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
						cy.enterVerificationCode("123456");
						eventSignup.getNextStep().click();
						eventSignup.getErrorTitle().should("exist").should("have.text", "There is a problem");
						eventSignup.getResendVerificationLink().click();
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
						eventSignup.getSignupCompleteMessage().should("have.text", "Sign up complete");
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
					});
			}
		});
	});

	it("It shows error message if user enters wrong email verification code", function () {
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
						eventSignup.getSignupCompleteMessage().should("have.text", "Sign up complete");
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
						eventSignup
							.getSignupEventName()
							.next()
							.next()
							.should("have.text", "You've also signed up for email updates");
					});

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
						cy.enterVerificationCode("12345", false);
						eventSignup.getNextStep().click();
						eventSignup.getErrorTitle().should("exist").should("have.text", "There is a problem");
						cy.get(".govuk-list > li > a")
							.should("exist")
							.should("have.text", "The verification code should be 6 digits");
						cy.enterVerificationCode("1234567", true);
						eventSignup.getNextStep().click();
						eventSignup.getErrorTitle().should("exist").should("have.text", "There is a problem");
						cy.get(".govuk-list > li > a")
							.should("exist")
							.should("have.text", "The verification code should be 6 digits");

						cy.enterVerificationCode("123456", true);
						eventSignup.getNextStep().click();
						eventSignup.getErrorTitle().should("exist").should("have.text", "There is a problem");
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
			}
		});
	});

	it("It shows the error message if user clicks next button without entering the mandatory details", function () {
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
						cy.contains(eventName.text().trim()).click();
						eventSignup.getSignupForThisEventButton().click();
						eventSignup.getEventNameHeader().should("have.text", eventName.text().trim());
						eventSignup.getNextStep().click();
						eventSignup.getErrorTitle().should("exist").should("have.text", "There is a problem");
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
			}
		});
	});

	it("Error message link navigates to its respective field", function () {
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
						cy.contains(eventName.text().trim()).click();
						eventSignup.getSignupForThisEventButton().click();
						eventSignup.getEventNameHeader().should("have.text", eventName.text().trim());
						eventSignup.getNextStep().click();
						cy.contains("Enter your full email address")
							.should((el) => {
								expect(el).to.have.attr("href", "#events-steps-personal-details-email-field-error");
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
						cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)").should(
							"have.text",
							"Enter your last name"
						);

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
			}
		});
	});

	it("Links through to feedback survey page", function () {
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
						eventSignup.getSignupCompleteMessage().should("have.text", "Sign up complete");
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
					});
				cy.contains("a", "feedback on this website").invoke("removeAttr", "target").click();
				cy.get(".freebirdFormviewerViewHeaderTitle")
					.should("exist")
					.should("have.text", "Get into Teaching: Feedback Survey");
			}
		});
	});

	it('It hides the feedback bar if user clicks on "Hide" link', function () {
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
						eventSignup.getSignupCompleteMessage().should("have.text", "Sign up complete");
						eventSignup.getSignupEventName().should("have.text", signedUpeventName);
					});
				cy.get("#hide-feedback-bar").click();
				cy.contains("a", "feedback on this website").should("not.be.visible");
			}
		});
	});
});

describe(`Feature - 404 Not Found unknown_route : ${new Date()}`, () => {
	it('It should show "404	Not Found unknown_route" if the user enters a bad URL', () => {
		cy.visit({
			url: "https://get-into-teaching-apps-test.london.cloudapps.digital/events",
			method: "GET",
			failOnStatusCode: false,
		});
		cy.verify404ErrorMessage();
	});
});

describe("Verify page load " + new Date(), () => {
	const searchForEvent = new Homepage();
	it('It shows the "Train to Teach Events" page', function () {
		cy.visit("/events/category/train-to-teach-events", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptCookie();
		cy.verifyPageHeading("Train to Teach Events");
		searchForEvent
			.getSearchforEventsHeading()
			.should("exist")
			.should("have.text", "Search for Train to Teach Events");
	});
	it('It shows the "Online Events" page', function () {
		cy.visit("/events/category/online-events", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptCookie();
		cy.verifyPageHeading("Online Events");
		searchForEvent
			.getSearchforEventsHeading()
			.should("exist")
			.should("have.text", "Search for Online Events");
	});
	it('It shows the "School and University Events" page', function () {
		cy.visit("/events/category/school-and-university-events", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptCookie();
		cy.verifyPageHeading("School and University Events");
		searchForEvent
			.getSearchforEventsHeading()
			.should("exist")
			.should("have.text", "Search for School and University Events");
	});

	it("It shows the selected month events only", function () {
		cy.visit("/events/category/school-and-university-events", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptCookie();
		cy.verifyPageHeading("School and University Events");
		searchForEvent
			.getSearchforEventsHeading()
			.should("exist")
			.should("have.text", "Search for School and University Events");
		cy.get("#events_search_month")
			.as("month")
			.children()
			.first()
			.next()
			.then((option) => {
				cy.get("@month").select(option.text());
				cy.get(".event-box__datetime").each((displayedOption, index, $list) => {
					expect(displayedOption.text().trim()).contains(option.text());
				});
			});
	});
});
