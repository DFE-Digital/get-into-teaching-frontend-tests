import TeacherTrainingAdviser from "../support/pageobjects/TeacherTrainingAdviser";
/// <reference types="Cypress" />
function terminalLog(violations) {
	cy.task(
		"log",
		`${violations.length} accessibility violation${
			violations.length === 1 ? "" : "s"
		} ${violations.length === 1 ? "was" : "were"} detected`
	);
	const violationData = violations.map(
		({ id, impact, description, nodes }) => ({
			id,
			impact,
			description,
			nodes: nodes.length,
		})
	);
	cy.task("table", violationData);
}

describe("Get-into-teaching - teachet training adviser flow", () => {
	var returner;
	var havePreviousTeacherReferenceNumber;
	const teacherTrainingAdviser = new TeacherTrainingAdviser();
	beforeEach(function () {
		cy.fixture("tta-signup-test-data.json").then((testData) => {
			this.testData = testData;
		});

		cy.visit(Cypress.env("baseurl_tta_flow"), {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.injectAxe();
	});
	it('It shows "Thank you  Sign up complete" message to UK returner user', function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = true));
		cy.havePreviousTeacherReferenceNumber(
			(havePreviousTeacherReferenceNumber = true)
		);
		cy.enterPreviousTeacherReferenceNumber(23478463);
		cy.selectPreviuosMainSubject("Computing");
		cy.selectSubjectLikeToTeach("Physics");
		cy.enterDateOfBirth("25", "02", "1986");
		cy.whereDoYouLive("UK");
		cy.enterUKCandidateAddress("55", "Hollinswood", "Telford", "TF3 2BT");
		cy.enterUKTelephoneNumber("012345678");
		cy.verifyAnswersPageHeading();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignupCompleteHeading();
	});

	it('It shows "Thank you  Sign up complete" message to overseas returner user', function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = true));
		cy.havePreviousTeacherReferenceNumber(
			(havePreviousTeacherReferenceNumber = true)
		);
		cy.enterPreviousTeacherReferenceNumber(23478463);
		cy.selectPreviuosMainSubject("Biology");
		cy.selectSubjectLikeToTeach("Maths");
		cy.enterDateOfBirth("20", "07", "2000");
		cy.whereDoYouLive("Overseas");
		cy.whichCountryDoYouLiveIn("Swaziland");
		cy.enteroverseasTelephoneNumber("0012354758");
		cy.verifyAnswersPageHeading();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignupCompleteHeading();
	});

	it('It shows "Thank you  Sign up complete" message to UK, primary stage, non-returner', function () {
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.whatSubjectIsYourDegree("Dance");
		cy.whichClassIsYourDegree("2:2");
		cy.whichStageAreYouInterestedInTeaching("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("Yes");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("No");
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985");
		cy.whereDoYouLive("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR"
		);
		cy.enterUKTelephoneNumber("0125234490");
		cy.verifyAnswersPageHeading();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignupCompleteHeading();
	});

	it('It shows "Thank you  Sign up complete" message to UK, secondery stage, non-returner', function () {
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.whatSubjectIsYourDegree("Dance");
		cy.whichClassIsYourDegree("2:2");
		cy.whichStageAreYouInterestedInTeaching("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("No");
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent("Yes");
		cy.whichSubjectAreYouInterestedInTeaching("Computing");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985");
		cy.whereDoYouLive("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR"
		);
		cy.enterUKTelephoneNumber("0125234490");
		cy.verifyAnswersPageHeading();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignupCompleteHeading();
	});

	it('It shows "Thank you  Sign up complete" message to overseas, primary stage, non- returner', function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.whatSubjectIsYourDegree("Biology");
		cy.whichClassIsYourDegree("First class");
		cy.whichStageAreYouInterestedInTeaching("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("Yes");
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth(31, 3, 1985);
		cy.whereDoYouLive("Overseas");
		cy.whichCountryDoYouLiveIn("Denmark");
		cy.enteroverseasTelephoneNumber("+50445550");
		cy.verifyAnswersPageHeading();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignupCompleteHeading();
	});

	it('It shows "Thank you  Sign up complete" message to overseas, secondary stage, non- returner', function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.whatSubjectIsYourDegree("Biology");
		cy.whichClassIsYourDegree("First class");
		cy.whichStageAreYouInterestedInTeaching("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("No");
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent("Yes");
		cy.whichSubjectAreYouInterestedInTeaching("English");
		cy.whenDoYouWantToStartYourTeacherTraining("2022");
		cy.enterDateOfBirth(31, 3, 1985);
		cy.whereDoYouLive("Overseas");
		cy.whichCountryDoYouLiveIn("Cyprus");
		cy.enteroverseasTelephoneNumber("02834830405");
		cy.verifyAnswersPageHeading();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignupCompleteHeading();
	});

	it("Has no detectable a11y violations on load", function () {
		// Test the page at initial load
		cy.checkA11y();
	});

	it("Has no detectable a11y violations on load (filtering to only include critical impact violations)", function () {
		// Test on initial load, only report and assert for critical impact items
		cy.checkA11y(null, {
			includedImpacts: ["critical"],
		});
	});

	it("Logs violations to the terminal", function () {
		cy.checkA11y(null, null, terminalLog);
	});

	it('It shows "Get the right GCSEs or equivalent qualifications" if user has no degree', function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.whatSubjectIsYourDegree("Biology");
		cy.whichClassIsYourDegree("First class");
		cy.whichStageAreYouInterestedInTeaching("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("No");
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent("No");
		cy.get(".govuk-heading-l").then(function (headingText) {
			headingText = headingText.text().trim();
			expect(headingText).to.equal(
				"Get the right GCSEs or equivalent qualifications"
			);
		});
	});

	xit("Error message link navigates to its respective field", function () {
		teacherTrainingAdviser.getFirstName();
		teacherTrainingAdviser.getLastName();
		teacherTrainingAdviser.getEmailAddress();
		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("You need to enter you email address")
			.should((el) => {
				expect(el).to.have.attr("href", "#identity-email-field-error");
			})
			.click()
			.type("Test_email@gmail.com");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)")
			.should("have.text", "You need to enter your first name")
			.next()
			.should("have.text", "You need to enter your last name");
		cy.contains("You need to enter your first name")
			.should((el) => {
				expect(el).to.have.attr("href", "#identity-first-name-field-error");
			})
			.click()
			.type("Test_First_Name");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)").should(
			"have.text",
			"You need to enter your last name"
		);
		cy.contains("You need to enter your last name")
			.should((el) => {
				expect(el).to.have.attr("href", "#identity-last-name-field-error");
			})
			.click()
			.type("Test_Last_Name");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(".govuk-fieldset__heading")
			.should("exist")
			.should("have.text", "Are you returning to teaching?");
	});

	xit("It shows the error message if user clicks continiue button without entering the mandatory or correct details", function () {
		teacherTrainingAdviser.getFirstName();
		teacherTrainingAdviser.getLastName();
		teacherTrainingAdviser.getEmailAddress();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
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
			.should("have.text", "You need to enter you email address")
			.next()
			.should("have.text", "You need to enter your first name")
			.next()
			.should("have.text", "You need to enter your last name");
		cy.get("#identity-first-name-field-error").type(this.testData.firstName);
		cy.get("#identity-last-name-field-error").type(this.testData.lastName);
		cy.get("#identity-email-field-error").type(this.testData.email);
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must select either yes or no");
		cy.get("#returning-teacher-returning-to-teaching-error").should(
			"have.text",
			"Error: You must select either yes or no"
		);
		cy.get("#returning-teacher-returning-to-teaching-field").click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "Select an option from the list");
		cy.get("#have-a-degree-degree-options-error").should(
			"have.text",
			"Error: Select an option from the list"
		);
		cy.get("#have-a-degree-degree-options-degree-field").click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#degree-what-degree-class-uk-degree-grade-id-field").select(
			"First class"
		);
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must select either primary or secondary");
		cy.get(
			"#degree-stage-interested-teaching-preferred-education-phase-id-error"
		).should("have.text", "Error: You must select either primary or secondary");
		cy.get(
			"#degree-stage-interested-teaching-preferred-education-phase-id-222750001-field"
		).click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must select either yes or no");
		cy.get(
			"#degree-secondary-maths-english-grade4-has-gcse-maths-and-english-id-error"
		).should("have.text", "Error: You must select either yes or no");
		cy.get(
			"#degree-secondary-maths-english-grade4-has-gcse-maths-and-english-id-222750000-field"
		).click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#degree_date_of_birth_date_of_birth_3i").type("31");
		cy.get("#degree_date_of_birth_date_of_birth_2i").type("3");
		cy.get("#degree_date_of_birth_date_of_birth_1i").type("1985");
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "Select if you live in the UK or overseas");
		cy.get("#degree-uk-or-overseas-uk-or-overseas-error").should(
			"have.text",
			"Error: Select if you live in the UK or overseas"
		);
		cy.get("#degree-uk-or-overseas-uk-or-overseas-uk-field").click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
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
			.should("have.text", "Enter the first line of your address")
			.next()
			.should("have.text", "Enter your town or city")
			.next()
			.should("have.text", "Enter a real postcode");
		cy.get("#degree-uk-candidate-address-line1-field-error").type(
			this.testData.address_Line1
		);
		cy.get("#degree-uk-candidate-address-city-field-error").type(
			this.testData.city
		);
		cy.get("#degree-uk-candidate-address-postcode-field-error").type(
			this.testData.postcode
		);
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#degree-uk-telephone-telephone-field").type(
			this.testData.phoneNumber
		);
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should(
				"have.text",
				"You must accept the privacy policy in order to talk to a teacher training adviser"
			);
		cy.get("#accept-privacy-policy-accepted-policy-id-error").should(
			"have.text",
			"Error: You must accept the privacy policy in order to talk to a teacher training adviser"
		);
		cy.get(
			"#accept-privacy-policy-accepted-policy-id-0a203956-e935-ea11-a813-000d3a44a8e9-field"
		).click();
		teacherTrainingAdviser.getContinueButton().click();
	});

	it("It shows Privacy policy details to the user if he clicks on link", function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = true));
		cy.havePreviousTeacherReferenceNumber(
			(havePreviousTeacherReferenceNumber = true)
		);
		cy.enterPreviousTeacherReferenceNumber(23478463);
		cy.selectPreviuosMainSubject("Computing");
		cy.selectSubjectLikeToTeach("Physics");
		cy.enterDateOfBirth("25", "02", "1986");
		cy.whereDoYouLive("UK");
		cy.enterUKCandidateAddress("55", "Hollinswood", "Telford", "TF3 2BT");
		cy.enterUKTelephoneNumber("012345678");
		cy.verifyAnswersPageHeading();
		cy.clickOnContinueButton();
		cy.get(".govuk-form-group > a").click();
		cy.get("h2").should("exist").should("have.text", "Privacy Policy");
		cy.get("h3").should("exist").should("have.text", "Legal information");
		cy.get(".govuk-footer__meta").should("exist");
	});

	it('It shows "Thank you  Sign up complete" to non-returner have an equivalent qualification from another country', function () {
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree(
			"I have an equivalent qualification from another country"
		);
		cy.whichStageAreYouInterestedInTeaching("Secondary");
		cy.whichSubjectAreYouInterestedInTeaching("Computing");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("27", "03", "1983");
		cy.whereDoYouLive("Overseas");
		cy.whichCountryDoYouLiveIn("Swaziland");
		cy.contains("Contact telephone number *").type("0112526374");
		cy.clickOnContinueButton();
		cy.verifyAnswersPageHeading();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignupCompleteHeading();
	});

	it('It shows "Thank you  Sign up complete" to non-returner have an equivalent qualification from another country interested in primary stage teaching', function () {
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree(
			"I have an equivalent qualification from another country"
		);
		cy.whichStageAreYouInterestedInTeaching("Primary");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("27", "03", "1983");
		cy.whereDoYouLive("UK");
		cy.enterUKCandidateAddress("25", "Delbury Court", "Telford", "TF3 2BP");
		cy.enterUKTelephoneNumber("0125234490");
		cy.verifyAnswersPageHeading();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignupCompleteHeading();
	});

	it('It shows "Thank you  Sign up complete" to non-returner who is studying for a degree and interested to teach in secondary stage', function () {
		var stage;
		var haveEquivalentDegreeFromAnotherCountry = true;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("I'm studying for a degree");
		cy.inWhichYearAreYouStudying("Final year");
		cy.whatSubjectIsYourDegree("Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.whichStageAreYouInterestedInTeaching("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("Yes");
		cy.whichSubjectAreYouInterestedInTeaching("Dance");
		cy.whenDoYouWantToStartYourTeacherTraining("2022");
		cy.enterDateOfBirth("25", "02", "1986");
		cy.whereDoYouLive("Overseas");
		cy.whichCountryDoYouLiveIn("Austria");
		cy.enteroverseasTelephoneNumber("0125234490");
		cy.verifyAnswersPageHeading();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignupCompleteHeading();
	});
	it('It shows "Thank you  Sign up complete" to non-returner who is studying for a degree and interested to teach in primary stage', function () {
		var stage;
		var haveEquivalentDegreeFromAnotherCountry = true;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("I'm studying for a degree");
		cy.inWhichYearAreYouStudying("Final year");
		cy.whatSubjectIsYourDegree("Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.whichStageAreYouInterestedInTeaching("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("Yes");
		cy.get(
			"#studying-science-grade4-has-gcse-science-id-222750000-field"
		).click();
		cy.clickOnContinueButton();
		cy.whenDoYouWantToStartYourTeacherTraining("2022");

		cy.enterDateOfBirth("22", "08", "2000");
		cy.whereDoYouLive("Overseas");
		cy.whichCountryDoYouLiveIn("Austria");
		cy.enteroverseasTelephoneNumber("0125234490");
		cy.verifyAnswersPageHeading();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignupCompleteHeading();
	});
	it("It allow user to change his details on answers page is he wishes", function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.whatSubjectIsYourDegree("Biology");
		cy.whichClassIsYourDegree("First class");
		cy.whichStageAreYouInterestedInTeaching("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("No");
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent("Yes");
		cy.whichSubjectAreYouInterestedInTeaching("English");
		cy.whenDoYouWantToStartYourTeacherTraining("2022");
		cy.enterDateOfBirth(31, 3, 1985);
		cy.whereDoYouLive("Overseas");
		cy.whichCountryDoYouLiveIn("Cyprus");
		cy.enteroverseasTelephoneNumber("0112526374");
		cy.verifyAnswersPageHeading();
		cy.get(":nth-child(10) > .govuk-summary-list__actions > a").click();
		cy.wait(100);
		cy.whichCountryDoYouLiveIn(this.testData.country);
		cy.enteroverseasTelephoneNumber(this.testData.new_phoneNumber);
		cy.verifyAnswersPageHeading();
		cy.get(":nth-child(4) > .govuk-summary-list__value > .govuk-body").should(
			"have.text",
			this.testData.new_phoneNumber
		);
		cy.get(":nth-child(10) > .govuk-summary-list__value > .govuk-body").should(
			"have.text",
			this.testData.country
		);
	});
	it("It shows error message to user if he enters invalid telephone number - UK user", function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.whatSubjectIsYourDegree("Biology");
		cy.whichClassIsYourDegree("First class");
		cy.whichStageAreYouInterestedInTeaching("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("No");
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent("Yes");
		cy.whichSubjectAreYouInterestedInTeaching("English");
		cy.whenDoYouWantToStartYourTeacherTraining("2022");
		cy.enterDateOfBirth(31, 3, 1985);
		cy.whereDoYouLive("UK");
		cy.enterUKCandidateAddress("55", "Hollinswood", "Telford", "TF3 2BT");
		cy.enterUKTelephoneNumber("5678");
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("#degree-uk-telephone-telephone-error")
			.should("exist")
			.should(
				"have.text",
				"Error: Telephone number is too short (minimum is 5 characters)"
			);
		cy.enterUKTelephoneNumber("0102038484858569697979");
		cy.clickOnContinueButton();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("#degree-uk-telephone-telephone-error")
			.should("exist")
			.should(
				"have.text",
				"Error: Telephone number is too long (maximum is 20 characters)"
			);
	});

	it("It shows error message to user if he enters invalid telephone number - overseas user", function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.whatSubjectIsYourDegree("Biology");
		cy.whichClassIsYourDegree("First class");
		cy.whichStageAreYouInterestedInTeaching("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("No");
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent("Yes");
		cy.whichSubjectAreYouInterestedInTeaching("English");
		cy.whenDoYouWantToStartYourTeacherTraining("2022");
		cy.enterDateOfBirth(31, 3, 1985);
		cy.whereDoYouLive("Overseas");
		cy.whichCountryDoYouLiveIn("Cyprus");
		cy.enteroverseasTelephoneNumber("5264");
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("#degree-overseas-telephone-telephone-error")
			.should("exist")
			.should(
				"have.text",
				"Error: Telephone number is too short (minimum is 5 characters)"
			);
		cy.get("#degree-overseas-telephone-telephone-field-error").clear();
		cy.get("#degree-overseas-telephone-telephone-field-error").type(
			"0123456789011223344566"
		);
		cy.clickOnContinueButton();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("#degree-overseas-telephone-telephone-error")
			.should("exist")
			.should(
				"have.text",
				"Error: Telephone number is too long (maximum is 20 characters)"
			);
	});
	it("It shows the error message to user if he enters invalid date of birth", function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.whatSubjectIsYourDegree("Biology");
		cy.whichClassIsYourDegree("First class");
		cy.whichStageAreYouInterestedInTeaching("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("No");
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent("Yes");
		cy.whichSubjectAreYouInterestedInTeaching("English");
		cy.whenDoYouWantToStartYourTeacherTraining("2022");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You need to enter your date of birth");
		cy.get("#degree-date-of-birth-date-of-birth-error").should(
			"have.text",
			"Error: You need to enter your date of birth"
		);
		cy.contains("Day").type("31");
		cy.contains("Month").type("3");
		cy.contains("Year").type("1885");
		cy.clickOnContinueButton();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must be less than 70 years old");
		cy.get("#degree-date-of-birth-date-of-birth-error").should(
			"have.text",
			"Error: You must be less than 70 years old"
		);
		teacherTrainingAdviser.getContinueButton().click();

		cy.contains("Year")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).clear();
			});

		cy.contains("Year").type("2005");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must be 18 years or older to use this service");
		cy.get("#degree-date-of-birth-date-of-birth-error").should(
			"have.text",
			"Error: You must be 18 years or older to use this service"
		);
		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("Year")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).clear();
			});
		cy.contains("Year").type("2030");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "Date can't be in the future");
		cy.get("#degree-date-of-birth-date-of-birth-error").should(
			"have.text",
			"Error: Date can't be in the future"
		);
	});
	it("It shows the error message to user if he enters invalid email address format", function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.invalidEmail
		);
		cy.verifyEmailAddressError();
		cy.enterEmail("$%^&@");
		cy.verifyEmailAddressError();
		cy.enterEmail("$%^&@.com");
		cy.verifyEmailAddressError();
		cy.enterEmail("$%^&@gmail.com");
		cy.verifyEmailAddressError();
	});
});
