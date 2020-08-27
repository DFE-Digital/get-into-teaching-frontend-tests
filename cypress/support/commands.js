/// <reference types="cypress" />
Cypress.Commands.add("logintoApp", () => {
	cy.visit(Cypress.env("baseUrl"), {
		auth: {
			username: Cypress.env("HTTPAUTH_USERNAME"),
			password: Cypress.env("HTTPAUTH_PASSWORD"),
		},
	});
	cy.injectAxe();
	cy.get(".cookie-acceptance__dialog > .call-to-action-button").click();
});

Cypress.Commands.add("shouldHaveTalkToUsSection", () => {
	cy.get(".talk-to-us__inner > .strapline")
		.should("exist")
		.then(function (sectionText) {
			cy.log(sectionText.text());
		});

	cy.get(
		"div.talk-to-us__inner__table__column:nth-child(1) > a.call-to-action-button:nth-child(2)"
	)
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
	cy.get(".footer-bottom")
		.should("exist")
		.then(function (linkText) {
			cy.log(linkText.text());
		});
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
				.type(code);
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
				.type(code);
		});
	});
});

Cypress.Commands.add("acceptCookie", () => {
	cy.get(".cookie-acceptance__dialog > .call-to-action-button").click();
});

Cypress.Commands.add(
	"enterFirstNameLastNameandEmail",
	(firstName, lastName, email) => {
		cy.contains("First name").type(firstName);
		cy.contains("Surname").type(lastName);
		cy.contains("Email address").type(email);
		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add("clickOnContinueButton", () => {
	cy.contains("Continue").click();
});

Cypress.Commands.add("returningToTeaching", (returner) => {
	if (returner) {
		cy.contains("Yes").click();
	} else {
		cy.contains("No").click();
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add(
	"havePreviousTeacherReferenceNumber",
	(havePreviousTeacherReferenceNumber) => {
		if (havePreviousTeacherReferenceNumber) {
			cy.contains("Yes").click();
		} else {
			cy.contains("No").click();
		}
		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add(
	"enterPreviousTeacherReferenceNumber",
	(teacherReferenceNumber) => {
		cy.contains("Teacher reference number (optional).").type(
			teacherReferenceNumber
		);
		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add("selectPreviuosMainSubject", (previousSubject) => {
	cy.contains("Which main subject did you previously teach?")
		.invoke("attr", "for")
		.then(function (val) {
			let id = "#" + val;
			cy.get(id).select(previousSubject);
		});
	cy.clickOnContinueButton();
});

Cypress.Commands.add("selectSubjectLikeToTeach", (subject) => {
	switch (subject) {
		case "Maths":
			cy.contains("Maths").click();
			break;
		case "Physics":
			cy.contains("Physics").click();
			break;
		case "Modern foreign language":
			cy.contains("Modern foreign language").click();
			break;
	}
	cy.clickOnContinueButton();
});
Cypress.Commands.add("whereDoYouLive", (location) => {
	if (location == "Overseas") {
		cy.contains("Overseas").click();
	} else {
		cy.get(".govuk-radios__label").first().click();
	}
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

Cypress.Commands.add("enterUKTelephoneNumber", (number) => {
	cy.contains("UK telephone number (optional)").type(number);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("doYouHaveDegree", (degree) => {
	switch (degree) {
		case "Yes":
			cy.contains("Yes").click();
			break;
		case "No":
			cy.contains("No").click();
			break;
		case "I'm studying for a degree":
			cy.contains("I'm studying for a degree").click();
			break;
		case "I have an equivalent qualification from another country":
			cy.contains(
				"I have an equivalent qualification from another country"
			).click();
			break;
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add("whatSubjectIsYourDegree", (subject) => {
	cy.contains("What subject is your degree?")
		.invoke("attr", "for")
		.then(function (val) {
			let id = "#" + val;
			cy.get(id).select(subject);
		});
	cy.clickOnContinueButton();
});
Cypress.Commands.add("whichClassIsYourDegree", (degreeClass) => {
	cy.contains("Which class is your degree?")
		.invoke("attr", "for")
		.then(function (val) {
			let id = "#" + val;
			cy.get(id).select(degreeClass);
		});
	cy.clickOnContinueButton();
});

Cypress.Commands.add("whatDegreeClassAreYouPredictedToGet", (degreeClass) => {
	cy.contains("What degree class are you predicted to get?")
		.invoke("attr", "for")
		.then(function (val) {
			let id = "#" + val;
			cy.get(id).select(degreeClass);
		});
	cy.clickOnContinueButton();
});

Cypress.Commands.add("whichSubjectAreYouInterestedInTeaching", (subject) => {
	cy.contains("Which subject are you interested in teaching?")
		.invoke("attr", "for")
		.then(function (val) {
			let id = "#" + val;
			cy.get(id).select(subject);
		});
	cy.clickOnContinueButton();
});

Cypress.Commands.add(
	"doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent",
	(haveGrade) => {
		if (haveGrade == "Yes") {
			cy.contains("Yes").click();
		} else {
			cy.contains("No").click();
		}
		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add(
	"whenDoYouWantToStartYourTeacherTraining",
	(trainingYear) => {
		cy.contains("When do you want to start your teacher training?")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).select(trainingYear);
			});
		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add(
	"areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent",
	(planning) => {
		if (planning == "Yes") {
			cy.contains("Yes").click();
		} else {
			cy.contains("No").click();
		}
		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add(
	"doYouHaveGrade4CorAboveInGCSEScienceorEquivalent",
	(grade) => {
		if (grade == "Yes") {
			cy.contains("Yes").click();
		} else {
			cy.contains("No").click();
		}
		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add("whichStageAreYouInterestedInTeaching", (stage) => {
	if (stage == "Primary") {
		cy.contains("Primary").click();
	} else {
		cy.contains("Secondary").click();
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add("enteroverseasTelephoneNumber", (number) => {
	cy.contains("Overseas telephone number (optional)").type(number);
	cy.clickOnContinueButton();
});

Cypress.Commands.add("acceptPolicy", () => {
	cy.contains("Accept the privacy policy").click();
	cy.clickOnContinueButton();
});

Cypress.Commands.add("enterDateOfBirth", (day, month, year) => {
	cy.contains("Day").type(day);
	cy.contains("Month").type(month);
	cy.contains("Year").type(year);
	cy.clickOnContinueButton();
});

Cypress.Commands.add(
	"enterUKCandidateAddress",
	(addressline1, addressline2, city, postcode) => {
		cy.contains("Address line 1 *").type(addressline1);
		cy.contains("Address line 2").type(addressline2);
		cy.contains("Town or City *").type(city);
		cy.contains("Postcode *").type(postcode);
		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add("inWhichYearAreYouStudying", (stage) => {
	switch (stage) {
		case "Final year":
			cy.contains("Final year").click();
			break;
		case "Second year":
			cy.contains("Second year").click();
			break;
		case "First year":
			cy.contains("First year").click();
			break;
		case "Other":
			cy.contains("First year").click();
			break;
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add("enterVerificationCode", (verificationCode, error) => {
	if (error) {
		cy.get(
			"#events-steps-authenticate-timed-one-time-password-field-error"
		).clear();
		cy.get(
			"#events-steps-authenticate-timed-one-time-password-field-error"
		).type(verificationCode);
	} else {
		cy.get("#events-steps-authenticate-timed-one-time-password-field").type(
			verificationCode
		);
	}
});
Cypress.Commands.add("selectCountry", (location) => {
	cy.get("#degree-overseas-country-country-id-field").select(location);
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("enterEmail", (emailAddress) => {
	cy.contains("Email address")
		.invoke("attr", "for")
		.then(function (val) {
			let id = "#" + val;
			cy.get(id).clear();
		});
	cy.contains("Email address").type(emailAddress);
});

Cypress.Commands.add("verifyEmailAddressError", () => {
	cy.get("#error-summary-title")
		.should("exist")
		.should("have.text", "There is a problem");
	cy.get("li > a").should("have.text", "You need to enter you email address");
});

Cypress.Commands.add("verifyAnswersPageHeading", () => {
	cy.get(".govuk-heading-l")
		.should("exist")
		.should("have.text", "Check your answers before you continue");
});

Cypress.Commands.add("verifySignupCompleteHeading", () => {
	cy.get(".govuk-panel__title").then(function (signuptext) {
		signuptext = signuptext.text().trim();
		expect(signuptext).to.equal("Thank you  Sign up complete");
	});
});
