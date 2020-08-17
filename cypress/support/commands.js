Cypress.Commands.add("logintoApp", () => {
	cy.visit(Cypress.env("baseUrl"), {
		auth: { username: "getintoteaching", password: "userneeds" },
	});
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
		cy.get("#identity-first-name-field").type(firstName);
		cy.get("#identity-last-name-field").type(lastName);
		cy.get("#identity-email-field").type(email);
		cy.get(".govuk-button").click();
	}
);

Cypress.Commands.add("clickOnContinueButton", () => {
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("returningToTeaching", (returner) => {
	if (returner) {
		cy.get("#returning-teacher-returning-to-teaching-true-field").click();
	} else {
		cy.get("#returning-teacher-returning-to-teaching-field").click();
	}
	cy.get(".govuk-button").click();
});

Cypress.Commands.add(
	"havePreviousTeacherReferenceNumber",
	(havePreviousTeacherReferenceNumber) => {
		if (havePreviousTeacherReferenceNumber) {
			cy.get("#has-teacher-id-has-id-true-field").click();
			cy.get(".govuk-button").click();
		} else {
			cy.get("#has-teacher-id-has-id-field").click();
			cy.get(".govuk-button").click();
		}
	}
);

Cypress.Commands.add(
	"enterPreviousTeacherReferenceNumber",
	(teacherReferenceNumber) => {
		cy.get("#previous-id-teacher-id-field").type(teacherReferenceNumber);
		cy.get(".govuk-button").click();
	}
);

Cypress.Commands.add("selectPreviuosMainSubject", (previousSubject) => {
	cy.get("#previous-subject-subject-taught-id-field").select(previousSubject);
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("selectSubjectLikeToTeach", (subject) => {
	switch (subject) {
		case "Maths":
			cy.get(
				"#subject-like-to-teach-preferred-teaching-subject-id-a42655a1-2afa-e811-a981-000d3a276620-field"
			).click();
			break;
		case "Physics":
			cy.get(
				"#subject-like-to-teach-preferred-teaching-subject-id-ac2655a1-2afa-e811-a981-000d3a276620-field"
			).click();
			break;
		case "Modern foreign language":
			cy.get(
				"#subject-like-to-teach-preferred-teaching-subject-id-a22655a1-2afa-e811-a981-000d3a276620-field"
			).click();
			break;
	}
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("youLiveIn", (location) => {
	if (location == "UK") {
		cy.get("#degree-uk-or-overseas-uk-or-overseas-uk-field").click();
	} else {
		cy.get("#degree-uk-or-overseas-uk-or-overseas-overseas-field").click();
		cy.get(".govuk-button").click();
		cy.get("#degree-overseas-country-country-id-field").select(location);
	}
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("whereDoYouLive", (location) => {
	if (location == "UK") {
		cy.get("#uk-or-overseas-uk-or-overseas-uk-field").click();
	} else {
		cy.get("#uk-or-overseas-uk-or-overseas-overseas-field").click();
		cy.get(".govuk-button").click();
		cy.get("#overseas-country-country-id-field").select(location);
	}
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("enterUKTelephoneNumber", (number) => {
	cy.get("#uk-telephone-telephone-field").type(number);
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("enterTelephoneNumber", (number, country = "UK") => {
	if (country == "UK") {
		cy.get("#degree-uk-telephone-telephone-field").type(number);
	} else {
		cy.get("#degree-overseas-telephone-telephone-field").type(number);
	}
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("doYouHaveDegree", (degree) => {
	switch (degree) {
		case "Yes":
			cy.get("#have-a-degree-degree-status-id-222750000-field").click();
			break;
		case "No":
			cy.get("#have-a-degree-degree-status-id-222750004-field").click();
			break;
		case "I'm studying for a degree":
			cy.get("#have-a-degree-degree-status-id-studying-field").click();
			break;
		case "I have an equivalent qualification from another country":
			cy.get("#have-a-degree-degree-status-id-222750005-field").click();
			break;
	}
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("selectWhatSubjectIsYourDegree", (subject) => {
	cy.get("#degree-what-subject-degree-degree-subject-field").select(subject);
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("selectWhichClassIsYourDegree", (degreeClass) => {
	cy.get("#degree-what-degree-class-uk-degree-grade-id-field").select(
		degreeClass
	);
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("whichSubjectAreYouInterestedInTeaching", (subject) => {
	cy.get("#degree-subject-interested-teaching-teaching-subject-field").select(
		subject
	);
	cy.get(".govuk-button").click();
});

Cypress.Commands.add(
	"doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent",
	(haveGrade, stage) => {
		if (stage == "Primary") {
			if (haveGrade == "Yes") {
				cy.get(
					"#degree-primary-maths-english-grade4-has-gcse-maths-and-english-id-222750000-field"
				).click();
			} else {
				cy.get(
					"#degree-primary-maths-english-grade4-has-gcse-maths-and-english-id-222750001-field"
				).click();
			}
		} else {
			if (haveGrade == "Yes") {
				cy.get(
					"#degree-secondary-maths-english-grade4-has-gcse-maths-and-english-id-222750000-field"
				).click();
			} else {
				cy.get(
					"#degree-secondary-maths-english-grade4-has-gcse-maths-and-english-id-222750001-field"
				).click();
			}
		}

		cy.get(".govuk-button").click();
	}
);

Cypress.Commands.add(
	"whenDoYouWantToStartYourTeacherTraining",
	(trainingYear) => {
		cy.get(
			"#degree-start-teacher-training-intital-teacher-training-year-id-field"
		).select(trainingYear);
		cy.get(".govuk-button").click();
	}
);

Cypress.Commands.add(
	"areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent",
	(planning, stage) => {
		if (stage == "Primary") {
			if (planning == "Yes") {
				cy.get(
					"#degree-primary-retake-english-maths-planning-to-retake-gcse-maths-and-english-id-222750000-field"
				).click();
			} else {
				cy.get(
					"#degree-primary-retake-english-maths-planning-to-retake-gcse-maths-and-english-id-222750001-field"
				).click();
			}
		} else {
			if (planning == "Yes") {
				cy.get(
					"#degree-retake-english-maths-planning-to-retake-gcse-maths-and-english-id-222750000-field"
				).click();
			} else {
				cy.get(
					"#degree-retake-english-maths-planning-to-retake-gcse-maths-and-english-id-222750001-field"
				).click();
			}
		}

		cy.get(".govuk-button").click();
	}
);

Cypress.Commands.add(
	"doYouHaveGrade4CorAboveInGCSEScienceorEquivalent",
	(grade) => {
		if (grade == "Yes") {
			cy.get(
				"#degree-science-grade4-has-gcse-science-id-222750000-field"
			).click();
		} else {
			cy.get(
				"#degree-science-grade4-has-gcse-science-id-222750001-field"
			).click();
		}
		cy.get(".govuk-button").click();
	}
);

Cypress.Commands.add("selectStage", (stage) => {
	if (stage == "Primary") {
		cy.get(
			"#degree-stage-interested-teaching-preferred-education-phase-id-222750000-field"
		).click();
	} else {
		//stage=secondary
		cy.get(
			"#degree-stage-interested-teaching-preferred-education-phase-id-222750001-field"
		).click();
	}
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("enteroverseasTelephoneNumber", (number) => {
	cy.get("#overseas-telephone-telephone-field").type(number);
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("acceptPolicy", () => {
	cy.get(
		"#accept-privacy-policy-accepted-policy-id-0a203956-e935-ea11-a813-000d3a44a8e9-field"
	).click();
	cy.get(".govuk-button").click();
});

Cypress.Commands.add("enterDateOfBirth", (day, month, year, returner) => {
	if (returner) {
		cy.get("#date_of_birth_date_of_birth_3i").type(day);
		cy.get("#date_of_birth_date_of_birth_2i").type(month);
		cy.get("#date_of_birth_date_of_birth_1i").type(year);
	} else {
		cy.get("#degree_date_of_birth_date_of_birth_3i").type(day);
		cy.get("#degree_date_of_birth_date_of_birth_2i").type(month);
		cy.get("#degree_date_of_birth_date_of_birth_1i").type(year);
	}
	cy.get(".govuk-button").click();
});

Cypress.Commands.add(
	"enterUKCandidateAddress",
	(addressline1, addressline2, city, postcode, returner) => {
		if (returner) {
			cy.get("#uk-candidate-address-line-1-field").type(addressline1);
			cy.get("#uk-candidate-address-line-2-field").type(addressline2);
			cy.get("#uk-candidate-address-city-field").type(city);
			cy.get("#uk-candidate-address-postcode-field").type(postcode);
		} else {
			cy.get("#degree-uk-candidate-address-line-1-field").type(addressline1);
			cy.get("#degree-uk-candidate-address-line-2-field").type(addressline2);
			cy.get("#degree-uk-candidate-address-city-field").type(city);
			cy.get("#degree-uk-candidate-address-postcode-field").type(postcode);
		}
		cy.get(".govuk-button").click();
	}
);
