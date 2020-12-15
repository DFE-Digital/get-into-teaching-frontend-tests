import MailingListSignUp from "../support/pageobjects/MailinglistSignupPage";
import Homepage from "../support/pageobjects/Homepage";
Cypress.Commands.add("logintoApp", () => {
	cy.visit("/", {
		auth: {
			username: Cypress.env("HTTPAUTH_USERNAME"),
			password: Cypress.env("HTTPAUTH_PASSWORD"),
		},
	});
	cy.injectAxe();
	cy.get("#cookies-agree").click();
});

Cypress.Commands.add("shouldHaveTalkToUsSection", () => {
	cy.get(".talk-to-us__inner > .strapline")
		.should("exist")
		.then(function (sectionText) {
			cy.log(sectionText.text());
		});

	cy.get("div.talk-to-us__inner__table__column:nth-child(1) > a.call-to-action-button:nth-child(2)")
		.should("exist")
		.then(function (buttonText) {
			cy.log(buttonText.text());
		});
	cy.get(".talk-to-us__inner__table > :nth-child(2) > .call-to-action-button")
		.should("exist")
		.then(function (buttonText) {
			cy.log(buttonText.text());
		});
});

Cypress.Commands.add("shouldHaveFooter", () => {
	cy.get(".site-footer-top__social").should("exist").next().should("exist");
	cy.get(".site-footer-bottom__logo-container").should("exist").next().should("exist");
});

Cypress.Commands.add("shouldHavePageNavigation", () => {
	[
		"Home",
		"Funding your training",
		"Steps to become a teacher",
		"Teaching as a career",
		"My story into teaching",
		"Salaries and benefits",
		"Find an event near you",
	].forEach((text) => {
		cy.get(".navbar__desktop > ul").should("contain", text);
	});
});

Cypress.Commands.add("enterEmailVerificationCode", () => {
	cy.wait(5000);
	let newURL;
	var latestEmailID;
	var code;
	cy.request(
		"https://mailsac.com/api/addresses/testuser@mailsac.com/messages?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ"
	).as("topMostEmail");
	cy.get("@topMostEmail").then((response) => {
		latestEmailID = response.body[0]._id;
		cy.log("latestEmailID = " + latestEmailID);
		newURL =
			"https://mailsac.com/api/text/testuser@mailsac.com/" +
			latestEmailID +
			"?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ";
		cy.request(newURL).as("verificationCode");
		cy.get("@verificationCode").then((response) => {
			var startpos = response.body.search("is");
			code = response.body.toString().substr(startpos + 2, 7);
			cy.get("#events-steps-authenticate-timed-one-time-password-field")
				.as("getOTPField")
				.type(code.trim());
		});
	});
});

Cypress.Commands.add("enterEmailVerificationCodeForMailinglist", () => {
	cy.wait(5000);
	let newURL;
	var latestEmailID;
	var code;
	cy.request(
		"https://mailsac.com/api/addresses/testuser@mailsac.com/messages?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ"
	).as("topMostEmail");
	cy.get("@topMostEmail").then((response) => {
		latestEmailID = response.body[0]._id;
		cy.log("latestEmailID = " + latestEmailID);
		newURL =
			"https://mailsac.com/api/text/testuser@mailsac.com/" +
			latestEmailID +
			"?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ";
		cy.request(newURL).as("verificationCode");
		cy.get("@verificationCode").then((response) => {
			var startpos = response.body.search("is");
			code = response.body.toString().substr(startpos + 2, 7);
			cy.get("#mailing-list-steps-authenticate-timed-one-time-password-field")
				.as("getOTPField")
				.type(code.trim());
		});
	});
});

Cypress.Commands.add("acceptCookie", () => {
	cy.get("#cookies-agree").click();
});

Cypress.Commands.add("enterFirstNameLastNameandEmail", (firstName, lastName, email) => {
	let rnum = Math.floor(Math.random() * 10000000 + 1);
	firstName = "First_" + rnum + "_name";
	lastName = "Last_" + rnum + "_name";
	cy.get("#teacher-training-adviser-steps-identity-first-name-field").type(firstName);
	cy.get("#teacher-training-adviser-steps-identity-last-name-field").type(lastName);
	cy.get("#teacher-training-adviser-steps-identity-email-field").type(email);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("clickOnContinueButton", () => {
	cy.contains("Continue").click();
});

Cypress.Commands.add("clickOnCompleteButton", () => {
	cy.contains("Complete").click();
});

Cypress.Commands.add("returningToTeaching", (returner) => {
	if (returner) {
		cy.get(
			"#teacher-training-adviser-steps-returning-teacher-returning-to-teaching-true-field"
		).click();
	} else {
		cy.get("#teacher-training-adviser-steps-returning-teacher-returning-to-teaching-field").click();
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add("havePreviousTeacherReferenceNumber", (havePreviousTeacherReferenceNumber) => {
	if (havePreviousTeacherReferenceNumber) {
		cy.get("#teacher-training-adviser-steps-has-teacher-id-has-id-true-field").click();
		cy.clickOnContinueButton();
	} else {
		cy.get("#teacher-training-adviser-steps-has-teacher-id-has-id-field").click();
		cy.clickOnContinueButton();
	}
});

Cypress.Commands.add("enterPreviousTeacherReferenceNumber", (teacherReferenceNumber) => {
	cy.get("#teacher-training-adviser-steps-previous-teacher-id-teacher-id-field").type(
		teacherReferenceNumber
	);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("selectPreviuosMainSubject", (previousSubject) => {
	cy.get("#teacher-training-adviser-steps-subject-taught-subject-taught-id-field").select(
		previousSubject
	);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("selectSubjectLikeToTeach", (subject) => {
	cy.contains(subject).click();
	cy.clickOnContinueButton();
});

Cypress.Commands.add("whichCountryDoYouLiveIn", (country) => {
	cy.contains("Which country do you live in?")
		.invoke("attr", "for")
		.then(function (val) {
			let id = "#" + val;
			cy.get(id).select(country);
		});
	cy.clickOnContinueButton();
});

Cypress.Commands.add("doYouLiveInTheUk", (uk) => {
	if (uk) {
		cy.get(".govuk-radios__label").first().click();
	} else {
		cy.contains("Overseas").click();
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add("enterUKTelephoneNumber", (number) => {
	cy.contains("UK telephone number (optional)").type(number);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("doYouHaveDegree", (degree) => {
	cy.contains(degree).click();
	cy.clickOnContinueButton();
});

Cypress.Commands.add("selectWhatSubjectIsYourDegree", (subject) => {
	cy.contains("What subject is your degree?")
		.invoke("attr", "for")
		.then(function (id) {
			cy.get(`#${id}`).select(subject);
		});
	cy.clickOnContinueButton();
});

Cypress.Commands.add("selectWhichClassIsYourDegree", (degreeClass) => {
	cy.get("#teacher-training-adviser-steps-what-degree-class-uk-degree-grade-id-field").select(
		degreeClass
	);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("whatDegreeClassAreYouPredictedToGet", (degreeClass) => {
	cy.get("#teacher-training-adviser-steps-what-degree-class-uk-degree-grade-id-field").select(
		degreeClass
	);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("whichSubjectAreYouInterestedInTeaching", (subject) => {
	cy.contains("Which subject would you like to teach?")
		.invoke("attr", "for")
		.then(function (val) {
			let id = "#" + val;
			cy.get(id).select(subject);
		});
	cy.clickOnContinueButton();
});

Cypress.Commands.add("gcseMathsAndEnglish", (haveGrade) => {
	if (haveGrade) {
		cy.contains("Yes").click();
	} else {
		cy.contains("No").click();
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add("whenDoYouWantToStartYourTeacherTraining", (trainingYear) => {
	cy.contains("When do you want to start your teacher training?")
		.invoke("attr", "for")
		.then(function (val) {
			let id = "#" + val;
			cy.get(id).select(trainingYear);
		});
	cy.clickOnContinueButton();
});

Cypress.Commands.add("retakeGcseMathsAndEnglish", (planning) => {
	if (planning) {
		cy.contains("Yes").click();
	} else {
		cy.contains("No").click();
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add("gcseScience", (grade) => {
	if (grade) {
		cy.get(
			"#teacher-training-adviser-steps-gcse-science-has-gcse-science-id-222750000-field"
		).click();
	} else {
		cy.get(
			"#teacher-training-adviser-steps-gcse-science-has-gcse-science-id-222750001-field"
		).click();
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add("selectStage", (stage) => {
	cy.contains(stage).click();
	cy.clickOnContinueButton();
});

Cypress.Commands.add("enterOverseasTelephoneNumber", (number) => {
	cy.get("#teacher-training-adviser-steps-overseas-telephone-telephone-field").type(number);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("acceptPolicy", () => {
	cy.contains("Accept the privacy policy").click();
	cy.clickOnCompleteButton();
});

Cypress.Commands.add("enterDateOfBirth", (day, month, year) => {
	cy.get("#teacher_training_adviser_steps_date_of_birth_date_of_birth_3i").type(day);
	cy.get("#teacher_training_adviser_steps_date_of_birth_date_of_birth_2i").type(month);
	cy.get("#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i").type(year);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("enterUKCandidateAddress", (addressline1, addressline2, city, postcode) => {
	cy.get("#teacher-training-adviser-steps-uk-address-address-line1-field").type(addressline1);
	cy.get("#teacher-training-adviser-steps-uk-address-address-line2-field").type(addressline2);
	cy.get("#teacher-training-adviser-steps-uk-address-address-city-field").type(city);
	cy.get("#teacher-training-adviser-steps-uk-address-address-postcode-field")
		.clear()
		.type(postcode);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("inWhichYearAreYouStudying", (stage) => {
	cy.contains(stage).click();
	cy.clickOnContinueButton();
});

Cypress.Commands.add("typeDateOfBirth", (day, month, year) => {
	cy.get("#teacher_training_adviser_steps_date_of_birth_date_of_birth_3i").type(day);
	cy.get("#teacher_training_adviser_steps_date_of_birth_date_of_birth_2i").type(month);
	cy.get("#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i").type(year);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("enterVerificationCode", (verificationCode, error) => {
	if (error) {
		cy.get("#events-steps-authenticate-timed-one-time-password-field-error").clear();
		cy.get("#events-steps-authenticate-timed-one-time-password-field-error").type(verificationCode);
	} else {
		cy.get("#events-steps-authenticate-timed-one-time-password-field").type(verificationCode);
	}
});
Cypress.Commands.add("selectCountry", (location) => {
	cy.get("#degree-overseas-country-country-id-field").select(location);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("enterEmail", (emailAddress) => {
	cy.contains("Email address").next().next().clear();
	cy.contains("Email address").type(emailAddress);
});

Cypress.Commands.add("verifyEmailAddressError", () => {
	cy.get("#error-summary-title").should("exist").should("have.text", "There is a problem");
	cy.get("li > a").should("have.text", "You need to enter your email address");
});

Cypress.Commands.add("clickOnBackButton", () => {
	//cy.get(".govuk-back-link").click();
	cy.contains("Back").click();
});

Cypress.Commands.add("retakeGcseScience", (planning) => {
	if (planning) {
		cy.contains("Yes").click();
	} else {
		cy.contains("No").click();
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add("verifyYourEmailAddress", () => {
	cy.wait(5000);
	let newURL;
	var latestEmailID;
	var code;
	cy.request(
		"https://mailsac.com/api/addresses/testuser@mailsac.com/messages?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ"
	).as("topMostEmail");
	cy.get("@topMostEmail").then((response) => {
		latestEmailID = response.body[0]._id;
		cy.log("latestEmailID = " + latestEmailID);
		newURL =
			"https://mailsac.com/api/text/testuser@mailsac.com/" +
			latestEmailID +
			"?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ";
		cy.request(newURL).as("verificationCode");
		cy.get("@verificationCode").then((response) => {
			var startpos = response.body.search("is");
			code = response.body.toString().substr(startpos + 2, 7);
			cy.get("#teacher-training-adviser-steps-authenticate-timed-one-time-password-field")
				.as("getOTPField")
				.type(code.trim());
			cy.clickOnContinueButton();
		});
	});
});
Cypress.Commands.add("clickOnStartNowButton", () => {
	cy.contains("Start now").click();
});

Cypress.Commands.add("acceptAllCookies", () => {
	cy.get("#cookies-agree").click();
});

Cypress.Commands.add("wouldYouLikeToReceiveEmailUpdate", (personalisedInformation) => {
	if (personalisedInformation == "Yes") {
		cy.get("#events-steps-further-details-subscribe-to-mailing-list-true-field").click();
	} else {
		cy.get("#events-steps-further-details-subscribe-to-mailing-list-field").click();
		cy.contains("Complete sign up").click();
	}
});

Cypress.Commands.add("enterEmailVerificationCodeForTeacherTrainingAdviser", () => {
	cy.wait(5000);
	let newURL;
	var latestEmailID;
	var code;
	cy.request(
		"https://mailsac.com/api/addresses/testuser@mailsac.com/messages?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ"
	).as("topMostEmail");
	cy.get("@topMostEmail").then((response) => {
		latestEmailID = response.body[0]._id;
		cy.log("latestEmailID = " + latestEmailID);
		newURL =
			"https://mailsac.com/api/text/testuser@mailsac.com/" +
			latestEmailID +
			"?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ";
		cy.request(newURL).as("verificationCode");
		cy.get("@verificationCode").then((response) => {
			var startpos = response.body.search("is");
			code = response.body.toString().substr(startpos + 2, 7);
			cy.get("#teacher-training-adviser-steps-authenticate-timed-one-time-password-field")
				.as("getOTPField")
				.type(code.trim());
		});
	});
});

Cypress.Commands.add("verify404ErrorMessage", () => {
	cy.get(".govuk-caption-xl").should("have.text", "404");
	cy.get(".govuk-heading-xl").should("have.text", "Not Found");
	cy.get("small").should("have.text", "unknown_route");
});

Cypress.Commands.add("acceptPrivacyPolicy", () => {
	cy.contains("Yes").click();
});

Cypress.Commands.add("enterFirstNameLastNameAndEmailAddress", (firstName, lastName, email) => {
	const mailingListSignUp = new MailingListSignUp();
	mailingListSignUp.getFirstName().type(firstName);
	mailingListSignUp.getLastName().type(lastName);
	mailingListSignUp.getEmailAddress().type(email);
});

/*Cypress.Commands.add("enterFirstNameLastNameAndEmailAddress", () => {
	const mailingListSignUp = new MailingListSignUp();
	let rnum = Math.floor(Math.random() * 1000000000 + 1);
	let firstName = `Testuser${rnum}firstname`;
	let lastName = `Testuser${rnum}lastname`;
	let email = `testuser${rnum.toString()}@mail.co.uk`;
	mailingListSignUp
		.getFirstName()
		.type(firstName)
		.then(() => {});
	mailingListSignUp
		.getLastName()
		.type(lastName)
		.then(() => {});
	mailingListSignUp
		.getEmailAddress()
		.type(email)
		.then(() => {
			return [firstName, lastName, email];
		});
});*/

Cypress.Commands.add("degreeStage", (stage) => {
	cy.contains(stage).click();
});

Cypress.Commands.add("goToUrl", (endUrl) => {
	cy.visit("https://get-teacher-training-adviser-service-test.london.cloudapps.digital/" + endUrl, {
		auth: {
			username: Cypress.env("HTTPAUTH_USERNAME"),
			password: Cypress.env("HTTPAUTH_PASSWORD"),
		},
	});
});

Cypress.Commands.add("verifySignUpCompleteMessage", () => {
	cy.get(".govuk-panel__title").then(function (signuptext) {
		signuptext = signuptext.text().trim();
		expect(signuptext).to.equal("Thank you  Sign up complete");
	});
});

Cypress.Commands.add("verifyCheckYourAnswersMessage", () => {
	cy.get(".govuk-heading-l")
		.should("exist")
		.should("have.text", "Check your answers before you continue");
});

Cypress.Commands.add("verifyGetRightGCSEMessage", () => {
	cy.get(".govuk-heading-l")
		.should("exist")
		.should("have.text", "Get the right GCSEs or equivalent qualifications");
});

Cypress.Commands.add("eventMonths", () => {
	let noEventPresent = false;
	cy.get("body")
		.then((body) => {
			if (body.find(".search-for-events-no-results").length > 0) {
				noEventPresent = true;
				cy.get(".search-for-events-no-results").should(
					"include.text",
					"Sorry your search has not found any events, try a different type, location or month."
				);
			}
		})
		.then(() => {
			return noEventPresent;
		});
});

Cypress.Commands.add("updateEventMonth", (eventsType, eventLocation) => {
	const searchForEvent = new Homepage();
	searchForEvent.getEventsType().select(eventsType);
	searchForEvent.getEventLocation().select(eventLocation);
	searchForEvent
		.getEventsMonth()
		.as("month")
		.children()
		.each(($option, index, $list) => {
			cy.get("@month").select($option.text());
			searchForEvent.getUpdateResultsButton().click();
			cy.eventMonths().then((eventNotPresent) => {
				if (!eventNotPresent) {
					cy.writeFile("cypress/fixtures/event-month.txt", $option.text());
				}
			});
		});
});

Cypress.Commands.add("setEventMonth", (eventsType, eventLocation) => {
	let month;
	const searchForEvent = new Homepage();
	searchForEvent.getEventsType().select(eventsType);
	searchForEvent.getEventLocation().select(eventLocation);
	cy.readFile("cypress/fixtures/event-month.txt")
		.then((month) => {
			month = month;
		})
		.then(() => {
			return month;
		});
});

Cypress.Commands.add("hideFeedbackBar", () => {
	cy.get("#hide-feedback-bar").click();
});
