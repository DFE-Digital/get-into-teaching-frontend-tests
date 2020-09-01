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
		cy.enterDateOfBirth("25", "02", "1986", (returner = true));
		cy.whereDoYouLive("UK");
		cy.enterUKCandidateAddress(
			"55",
			"Hollinswood",
			"Telford",
			"TF3 2BT",
			(returner = true)
		);
		cy.enterUKTelephoneNumber("012345678");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.contains("Name")
			.next()
			.contains(this.testData.firstName + " " + this.testData.lastName);
		cy.contains("Date of birth").next().contains("25 02 1986");
		cy.contains("Address").next().contains("55 Hollinswood Telford TF3 2BT");
		cy.contains("Email").next().contains(this.testData.email);
		cy.contains("Telephone").next().contains("012345678");
		cy.contains("Are you returning to teaching?").next().contains("Yes");
		cy.contains("What is your previous teacher reference number?")
			.next()
			.contains("23478463");
		cy.contains("Which main subject did you previously teach?")
			.next()
			.contains("Computing");
		cy.contains(
			"Which subject would you like to teach if you return to teaching?"
		)
			.next()
			.contains("Physics");
		cy.contains("Where do you live?").next().contains("UK");

		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
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
		cy.enterDateOfBirth("20", "07", "2000", (returner = true));
		cy.whereDoYouLive("Switzerland");
		cy.enteroverseasTelephoneNumber("0012354758");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, interesed in primary stage teaching, have grade 4 (C) or above in english, maths and science GCSE', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary 
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - Yes
		  UK user
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, interesed in primary stage teaching, have grade 4 (C) or above in english, maths and science GCSE', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - Yes
		  Overseas user
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("Brazil");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Brazil");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, interesed in primary stage teaching, have grade 4 (C) or above in English and maths GCSE not in science GCSE but planning to retake science GCSE', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - Yes
		  UK user
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, interesed in primary stage teaching, have grade 4 (C) or above in English and maths GCSE not in science GCSE but planning to retake science GCSE', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - Yes
		  Overseas user
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("Poland");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Poland");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Get the right GCSEs or equivalent qualifications message" to non-returner user, interesed in primary stage teaching, have grade 4 (C) or above in English and maths and not in science GCSE  nor planning to retake', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - No
		  //Expected page - Get the right GCSEs or equivalent qualifications
		 
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("No");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Get the right GCSEs or equivalent qualifications");
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, interesed in primary stage teaching, have no grade 4 (C) or above in English and maths GCSEs but planning to retake, have grade 4 (C) or above in GCSE science', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - Yes
		  UK user
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, interesed in primary stage teaching, have no grade 4 (C) or above in English and maths GCSEs but planning to retake, have grade 4 (C) or above in GCSE science', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - Yes
		  Overseas user
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("Cuba");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Cuba");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, interesed in primary stage teaching,have no grade 4 (C) or above in English and maths GCSEs but planning to retake, have no grade 4 (C) or above in GCSE science but planning to retake', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - Yes
		  UK user
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, interesed in primary stage teaching,have no grade 4 (C) or above in English and maths GCSEs but planning to retake, have no grade 4 (C) or above in GCSE science but planning to retake', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - Yes
		  Overseas user
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("Cuba");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Cuba");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Get the right GCSEs or equivalent qualifications message" to non-returner user, interesed in primary stage teaching,have no grade 4 (C) or above in English and maths GCSEs nor planning to retake, have no grade 4 (C) or above in GCSE science nor planning to retake', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - No 
		  Expected - Get the right GCSEs or equivalent qualifications page
		 
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("No");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Get the right GCSEs or equivalent qualifications");
	});

	it('It shows "Get the right GCSEs or equivalent qualifications" to non-returner overseas user, have a degree, interesed in primary stage teaching,have no grade 4 (C) or above in English and maths GCSEs nor planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - No
		  Overseas user
		  Expected - Get the right GCSEs or equivalent qualifications page
		 
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"No",
			"Primary"
		);
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Get the right GCSEs or equivalent qualifications");
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, interesed in teaching secondary stage ,have grade 4 (C) or above in English and maths GCSEs', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - secondary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - Yes
		  UK user		 
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("Computing");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, interesed in teaching secondary stage, have grade 4 (C) or above in English and maths GCSEs', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - secondary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - Yes
		  Overseas user		 
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("Computing");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("Cyprus");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Cyprus");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, interesed in teaching secondary stage, have no grade 4 (C) or above in English and maths GCSEs but planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - secondary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  UK user		 
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("Dance");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, interesed in teaching secondary stage, have no grade 4 (C) or above in English and maths GCSEs but planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - secondary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Overseas user		 
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("Dance");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("Cyprus");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Cyprus");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Get the right GCSEs or equivalent qualifications" to non-returner user, interesed in teaching secondary stage, have no grade 4 (C) or above in English and maths GCSEs nor planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - secondary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - No
		  Expected - Get the right GCSEs or equivalent qualifications page	 
		*/
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"No",
			"Secondary"
		);
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Get the right GCSEs or equivalent qualifications");
	});

	it('It shows "If you do not have a degree page" if non-returner user has no degree', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - No
		  Expected - 	If you do not have a degree page	   
		*/
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("No");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "If you do not have a degree");
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, studying for a degree, interesed in teaching primary stage, have grade 4 (C) or above in English, maths and science GCSEs', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - Yes
		  UK user
		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, studying for a degree, interesed in teaching primary stage, have grade 4 (C) or above in English, maths and science GCSEs', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - Yes
		  Overseas use
		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("Denmark");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Denmark");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, studying for a degree, interesed in teaching primary stage, have grade 4 (C) or above in English and maths GCSEs, have no grade 4 (C) or above in GCSE science but planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - Yes
		  UK user
		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, studying for a degree, interesed in teaching primary stage, have grade 4 (C) or above in English and maths GCSEs, have no grade 4 (C) or above in GCSE science but planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - Yes
		  Overseas user
		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("India");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "India");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Get the right GCSEs or equivalent qualifications" to non-returner, studying for a degree, interesed in teaching primary stage, have grade 4 (C) or above in English and maths GCSEs, have no grade 4 (C) or above in GCSE science nor planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - No
		  //Expected page - Get the right GCSEs or equivalent qualifications	  
		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("No");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Get the right GCSEs or equivalent qualifications");
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, studying for a degree, interesed in teaching primary stage, have no grade 4 (C) or above in English and maths GCSEs and planning to retake, have grade 4 (C) or above in GCSE science', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - primary
		 Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - Yes
		  UK user	  
		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, studying for a degree, interesed in teaching primary stage, have no grade 4 (C) or above in English and maths GCSEs and planning to retake, have grade 4 (C) or above in GCSE science', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - primary
		 Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - Yes
		  Overseas user	  
		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("Estonia");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Estonia");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, studying for a degree, interesed in teaching primary stage, have no grade 4 (C) or above in English and maths GCSEs and planning to retake, have no grade 4 (C) or above in GCSE science but planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - Yes
		  UK user	  
		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Primary");

		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, studying for a degree, interesed in teaching primary stage, have no grade 4 (C) or above in English and maths GCSEs and planning to retake, have no grade 4 (C) or above in GCSE science but planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - Yes
		  Overseas user	  
		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Primary");

		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("Chile");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Chile");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Get the right GCSEs or equivalent qualifications" to non-returner user, studying for a degree, interesed in teaching primary stage, have no grade 4 (C) or above in English and maths GCSEs and planning to retake, have no grade 4 (C) or above in GCSE science nor planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - No
		  Expected - Get the right GCSEs or equivalent qualifications page		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("No");
		cy.areYouPlanningToRetakeYourScienceGCSE("No");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Get the right GCSEs or equivalent qualifications");
	});

	it('It shows "Get the right GCSEs or equivalent qualifications" to non-returner user, studying for a degree, interesed in teaching primary stage, have no grade 4 (C) or above in English and maths GCSEs nor planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - No
		  Expected - Get the right GCSEs or equivalent qualifications		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"No",
			"Primary"
		);
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Get the right GCSEs or equivalent qualifications");
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, studying for a degree, interesed in teaching secondary stage, have grade 4 (C) or above in English and maths GCSEs', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - secondary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - Yes
		  UK user
		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("Computing");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, studying for a degree, interesed in teaching secondary stage, have grade 4 (C) or above in English and maths GCSEs', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - secondary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - Yes
		  Overseas user		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("Computing");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("Cyprus");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Cyprus");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, studying for a degree, interesed in teaching secondary stage, have no grade 4 (C) or above in English and maths GCSEs but planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - secondary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  UK user		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("Dance");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, studying for a degree, interesed in teaching secondary stage, have no grade 4 (C) or above in English and maths GCSEs but planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - secondary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - Yes
		  Overseas user		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("Dance");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("Cyprus");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Cyprus");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Get the right GCSEs or equivalent qualifications" to non-returner user, studying for a degree, interesed in teaching secondary stage, have no grade 4 (C) or above in English and maths GCSEs nor planning to retake', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I'm studying for a degree
		  Which stage are you interested in teaching? - secondary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - No
		  Expected - Get the right GCSEs or equivalent qualifications page		 	   
		*/
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
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Secondary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"No",
			"Secondary"
		);
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Get the right GCSEs or equivalent qualifications");
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user, have an equivalent qualification from another country, interested in teaching secondary stage ', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I have an equivalent qualification from another country
		  Which stage are you interested in teaching? - secondary
		  UK user		 	   
		*/

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
		cy.selectStage("Equivalent-Secondary");
		cy.whichSubjectAreYouInterestedInTeaching("Equivalent-Computing");
		cy.whenDoYouWantToStartYourTeacherTraining("Equivalent-2021");
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_3i"
		).type("27");
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_2i"
		).type("07");
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i"
		).type("1983");
		cy.clickOnContinueButton();
		cy.get(
			"#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-uk-field"
		).click();
		cy.clickOnContinueButton();
		cy.get(
			"#teacher-training-adviser-steps-uk-address-address-line1-field"
		).type("25");
		cy.get(
			"#teacher-training-adviser-steps-uk-address-address-line2-field"
		).type("Delbury Court");
		cy.get(
			"#teacher-training-adviser-steps-uk-address-address-city-field"
		).type("Telford");
		cy.get(
			"#teacher-training-adviser-steps-uk-address-address-postcode-field"
		).type("TF3 2BP");
		cy.clickOnContinueButton();
		cy.get("#teacher-training-adviser-steps-uk-callback-telephone-field").type(
			"0123454748"
		);
		/*cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "You told us you live in the United Kingdom");
		cy.clickOnContinueButton();*/
		cy.clickOnContinueButton();

		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overeas user, have an equivalent qualification from another country, interested in teaching secondary stage ', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I have an equivalent qualification from another country
		  Which stage are you interested in teaching? - secondary
		  Overseas user		 	   
		*/

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
		cy.selectStage("Equivalent-Secondary");
		cy.whichSubjectAreYouInterestedInTeaching("Equivalent-Computing");
		cy.whenDoYouWantToStartYourTeacherTraining("Equivalent-2021");
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_3i"
		).type("27");
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_2i"
		).type("07");
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i"
		).type("1983");
		cy.clickOnContinueButton();
		cy.get(
			"#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-overseas-field"
		).click();
		cy.clickOnContinueButton();
		cy.get(
			"#teacher-training-adviser-steps-overseas-country-country-id-field"
		).select("Austria");
		cy.clickOnContinueButton();
		cy.get(
			"#teacher-training-adviser-steps-overseas-callback-telephone-field"
		).type("0125234490");
		cy.clickOnContinueButton();
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});
	//Scenario -39
	it('It shows "Thank you  Sign up complete" to non-returner UK user, have an equivalent qualification from another country interested in teaching primary stage', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I have an equivalent qualification from another country
		  Which stage are you interested in teaching? - primary
		  UK user		 	   
		*/
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
		cy.selectStage("Equivalent-Primary");
		cy.whenDoYouWantToStartYourTeacherTraining("Equivalent-2021");
		cy.typeDateOfBirth("22", "08", "2000", true);
		cy.whereDoYouLive("UK", false, true);
		cy.get(
			"#teacher-training-adviser-steps-uk-address-address-line1-field"
		).type("25");
		cy.get(
			"#teacher-training-adviser-steps-uk-address-address-line2-field"
		).type("Delbury Court");
		cy.get(
			"#teacher-training-adviser-steps-uk-address-address-city-field"
		).type("Telford");
		cy.get(
			"#teacher-training-adviser-steps-uk-address-address-postcode-field"
		).type("TF3 2BP");
		cy.clickOnContinueButton();
		cy.get("#teacher-training-adviser-steps-uk-callback-telephone-field").type(
			"0123454748"
		);

		/*cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "You told us you live in the United Kingdom");
		cy.clickOnContinueButton();*/
		cy.clickOnContinueButton();

		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user, have an equivalent qualification from another country interested in teaching primary stage', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - I have an equivalent qualification from another country
		  Which stage are you interested in teaching? - primary
		  Overseas user		 	   
		*/
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
		cy.selectStage("Equivalent-Primary");
		cy.whenDoYouWantToStartYourTeacherTraining("Equivalent-2021");
		cy.typeDateOfBirth("22", "08", "2000", true);
		cy.whereDoYouLive("Austria", false, true);
		cy.get(
			"#teacher-training-adviser-steps-overseas-callback-telephone-field"
		).type("0125234490");
		cy.clickOnContinueButton();
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it("It should retain the candidate details if he navigates back  ", function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Biology");
		cy.selectWhichClassIsYourDegree("First class");
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth(31, 3, 1985, (returner = false));
		cy.youLiveIn("Denmark");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Denmark");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");

		cy.contains("Name")
			.next()
			.contains(this.testData.firstName + " " + this.testData.lastName);
		cy.contains("Date of birth").next().contains("31 03 1985");
		cy.contains("Email").next().contains(this.testData.email);
		cy.contains("Telephone").next().contains("01234567890");
		cy.contains("Are you returning to teaching?").next().contains("No");
		cy.contains("Do you have a degree?").next().contains("Yes");
		cy.contains("Which subject is your degree?").next().contains("Biology");
		cy.contains("Which class is your degree?").next().contains("First class");
		cy.contains("Which stage are you interested in teaching?")
			.next()
			.contains("Primary");
		cy.contains(
			"Do you have grade 4 (C) or above in maths and English GCSE, or equivalent?"
		)
			.next()
			.contains("Yes");
		cy.contains("Do you have science GCSE Grade 4 or above?")
			.next()
			.contains("Yes");
		cy.contains("When do you want to start teacher training?")
			.next()
			.contains("2021");
		cy.contains("Where do you live?").next().contains("Overseas");
		cy.contains("Which country do you live in?").next().contains("Denmark");
		cy.clickOnBackButton();
		cy.get(
			"#teacher-training-adviser-steps-overseas-telephone-telephone-field"
		).should("have.value", "01234567890");
		cy.clickOnBackButton();
		cy.wait(100);
		cy.clickOnBackButton();
		cy.wait(100);
		cy.contains("Overseas")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("be.checked");
			});
		cy.clickOnBackButton();

		cy.contains("Day")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("have.value", "31");
			});
		cy.contains("Month")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("have.value", "3");
			});
		cy.contains("Year")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("have.value", "1985");
			});

		cy.clickOnBackButton();

		/*cy.get(
			"#teacher-training-adviser-steps-start-teacher-training-initial-teacher-training-year-id-field"
		).should("be.selected");

		
		cy.contains("Which country do you live in?")
				.invoke("attr", "for")
				.then(function (val) {
					let id = "#" + val;
					cy.get(id).select(country);
				});
			cy.clickOnContinueButton();	
		
		
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});*/
	});

	it("Error message link navigates to its respective field", function () {
		teacherTrainingAdviser.getFirstName();
		teacherTrainingAdviser.getLastName();
		teacherTrainingAdviser.getEmailAddress();
		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("You need to enter you email address")
			.should((el) => {
				expect(el).to.have.attr(
					"href",
					"#teacher-training-adviser-steps-identity-email-field-error"
				);
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
				expect(el).to.have.attr(
					"href",
					"#teacher-training-adviser-steps-identity-first-name-field-error"
				);
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
				expect(el).to.have.attr(
					"href",
					"#teacher-training-adviser-steps-identity-last-name-field-error"
				);
			})
			.click()
			.type("Test_Last_Name");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(".govuk-fieldset__heading")
			.should("exist")
			.should("have.text", "Are you returning to teaching?");
	});
	it("It shows the error message if user clicks continiue button without entering the mandatory or correct details", function () {
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
		cy.get(
			"#teacher-training-adviser-steps-identity-first-name-field-error"
		).type(this.testData.firstName);
		cy.get(
			"#teacher-training-adviser-steps-identity-last-name-field-error"
		).type(this.testData.lastName);
		cy.get("#teacher-training-adviser-steps-identity-email-field-error").type(
			this.testData.email
		);
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must select either yes or no");
		cy.get(
			"#teacher-training-adviser-steps-returning-teacher-returning-to-teaching-error"
		).should("have.text", "Error: You must select either yes or no");
		cy.get(
			"#teacher-training-adviser-steps-returning-teacher-returning-to-teaching-field"
		).click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "Select an option from the list");
		cy.get(
			"#teacher-training-adviser-steps-have-a-degree-degree-options-error"
		).should("have.text", "Error: Select an option from the list");
		cy.get(
			"#teacher-training-adviser-steps-have-a-degree-degree-options-degree-field"
		).click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(
			"#teacher-training-adviser-steps-what-degree-class-uk-degree-grade-id-field"
		).select("First class");
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must select either primary or secondary");
		cy.get(
			"#teacher-training-adviser-steps-stage-interested-teaching-preferred-education-phase-id-error"
		).should("have.text", "Error: You must select either primary or secondary");
		cy.get(
			"#teacher-training-adviser-steps-stage-interested-teaching-preferred-education-phase-id-222750001-field"
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
			"#teacher-training-adviser-steps-gcse-maths-english-has-gcse-maths-and-english-id-error"
		).should("have.text", "Error: You must select either yes or no");
		cy.get(
			"#teacher-training-adviser-steps-gcse-maths-english-has-gcse-maths-and-english-id-222750000-field"
		).click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_3i"
		).type("31");
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_2i"
		).type("3");
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i"
		).type("1985");
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "Select if you live in the UK or overseas");
		cy.get(
			"#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-error"
		).should("have.text", "Error: Select if you live in the UK or overseas");
		cy.get(
			"#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-uk-field"
		).click();
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
		cy.get(
			"#teacher-training-adviser-steps-uk-address-address-line1-field-error"
		).type(this.testData.address_Line1);
		cy.get(
			"#teacher-training-adviser-steps-uk-address-address-city-field-error"
		).type(this.testData.city);
		cy.get(
			"#teacher-training-adviser-steps-uk-address-address-postcode-field-error"
		).type(this.testData.postcode);
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#teacher-training-adviser-steps-uk-telephone-telephone-field").type(
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
		cy.get(
			"#teacher-training-adviser-steps-accept-privacy-policy-accepted-policy-id-error"
		).should(
			"have.text",
			"Error: You must accept the privacy policy in order to talk to a teacher training adviser"
		);
		cy.get(
			"#teacher-training-adviser-steps-accept-privacy-policy-accepted-policy-id-0a203956-e935-ea11-a813-000d3a44a8e9-field"
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
		cy.enterDateOfBirth("25", "02", "1986", (returner = true));
		cy.whereDoYouLive("UK");
		cy.enterUKCandidateAddress(
			"55",
			"Hollinswood",
			"Telford",
			"TF3 2BT",
			(returner = true)
		);
		cy.enterUKTelephoneNumber("012345678");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.get(".govuk-form-group > a").click();
		cy.get("h2").should("exist").should("have.text", "Privacy Policy");
		cy.get("h3").should("exist").should("have.text", "Legal information");
		cy.get(".govuk-footer__meta").should("exist");
	});
	it("It allow user to change his details on answers page is he wishes - Email change", function () {
		cy.enterFirstNameLastNameandEmail(
			"Sushant",
			"Kumar",
			"sushantkumar@gamil.com"
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Biology");
		cy.selectWhichClassIsYourDegree("First class");
		cy.selectStage("Secondary");

		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("English");
		cy.whenDoYouWantToStartYourTeacherTraining("2022");
		cy.enterDateOfBirth(31, 3, 1985, (returner = false));
		cy.youLiveIn("Cyprus");
		cy.enterTelephoneNumber("102834", "Cyprus");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.contains("Email").next().next().click();
		teacherTrainingAdviser.getFirstName().should("have.value", "Sushant");
		teacherTrainingAdviser.getLastName().should("have.value", "Kumar");
		teacherTrainingAdviser
			.getEmailAddress()
			.should("have.value", "sushantkumar@gamil.com");
		teacherTrainingAdviser.getEmailAddress().clear();
		teacherTrainingAdviser.getEmailAddress().type("kumarsushant@yahoomail.com");
		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("No")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("be.checked");
			});

		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("Yes")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("be.checked");
			});
		teacherTrainingAdviser.getContinueButton().click();

		cy.get(
			"#teacher-training-adviser-steps-what-subject-degree-degree-subject-field"
		).should("have.value", "Biology");
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("Secondary")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("be.checked");
			});

		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("No")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("be.checked");
			});
		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("Yes")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("be.checked");
			});
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("Day")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("have.value", "31");
			});
		cy.contains("Month")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("have.value", "3");
			});
		cy.contains("Year")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("have.value", "1985");
			});
		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("Overseas")
			.invoke("attr", "for")
			.then(function (val) {
				let id = "#" + val;
				cy.get(id).should("be.checked");
			});
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("Name").next().contains("Sushant Kumar");
		cy.contains("Date of birth").next().contains("31 03 1985");
		cy.contains("Email").next().contains("kumarsushant@yahoomail.com");
		cy.contains("Telephone").next().contains("102834");
		cy.contains("Are you returning to teaching?").next().contains("No");
		cy.contains("Do you have a degree?").next().contains("Yes");
		cy.contains("Which subject is your degree?").next().contains("Biology");
		cy.contains("Which class is your degree?").next().contains("First class");
		cy.contains("Which stage are you interested in teaching?")
			.next()
			.contains("Secondary");
		cy.contains(
			"Do you have grade 4 (C) or above in maths and English GCSE, or equivalent?"
		)
			.next()
			.contains("No");
		cy.contains("Are you planning to retake your English or maths GCSEs?")
			.next()
			.contains("Yes");
		cy.contains("When do you want to start teacher training?")
			.next()
			.contains("2022");
		cy.contains("Where do you live?").next().contains("Overseas");
		cy.contains("Which country do you live in?").next().contains("Cyprus");
	});
	it("It shows error message to user if he enters invalid telephone number - UK user", function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Biology");
		cy.selectWhichClassIsYourDegree("First class");
		cy.selectStage("Secondary");

		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("English");
		cy.whenDoYouWantToStartYourTeacherTraining("2022");
		cy.enterDateOfBirth(31, 3, 1985, (returner = false));
		cy.whereDoYouLive("UK");
		cy.enterUKCandidateAddress(
			"55",
			"Hollinswood",
			"Telford",
			"TF3 2BT",
			(returner = true)
		);
		cy.enterTelephoneNumber("0834");
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("#teacher-training-adviser-steps-uk-telephone-telephone-error")
			.should("exist")
			.should(
				"have.text",
				"Error: Telephone number is too short (minimum is 5 characters)"
			);
		cy.get(
			"#teacher-training-adviser-steps-uk-telephone-telephone-field-error"
		).clear();
		cy.get(
			"#teacher-training-adviser-steps-uk-telephone-telephone-field-error"
		).type("0123456789011223344566");
		cy.get(".govuk-button").click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("#teacher-training-adviser-steps-uk-telephone-telephone-error")
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
		cy.selectWhatSubjectIsYourDegree("Biology");
		cy.selectWhichClassIsYourDegree("First class");
		cy.selectStage("Secondary");

		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("English");
		cy.whenDoYouWantToStartYourTeacherTraining("2022");
		cy.enterDateOfBirth(31, 3, 1985, (returner = false));
		cy.youLiveIn("Cyprus");
		cy.enterTelephoneNumber("0834", "Cyprus");
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("#teacher-training-adviser-steps-overseas-telephone-telephone-error")
			.should("exist")
			.should(
				"have.text",
				"Error: Telephone number is too short (minimum is 5 characters)"
			);
		cy.get(
			"#teacher-training-adviser-steps-overseas-telephone-telephone-field-error"
		).clear();
		cy.get(
			"#teacher-training-adviser-steps-overseas-telephone-telephone-field-error"
		).type("0123456789011223344566");
		cy.get(".govuk-button").click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("#teacher-training-adviser-steps-overseas-telephone-telephone-error")
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
		cy.selectWhatSubjectIsYourDegree("Biology");
		cy.selectWhichClassIsYourDegree("First class");
		cy.selectStage("Secondary");

		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("English");
		cy.whenDoYouWantToStartYourTeacherTraining("2022");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You need to enter your date of birth");
		cy.get(
			"#teacher-training-adviser-steps-date-of-birth-date-of-birth-error"
		).should("have.text", "Error: You need to enter your date of birth");
		cy.get(
			"#teacher-training-adviser-steps-date-of-birth-date-of-birth-field-error"
		).type("31");
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_2i"
		).type("3");
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i"
		).type("1885");
		cy.get(".govuk-button").click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must be less than 70 years old");
		cy.get(
			"#teacher-training-adviser-steps-date-of-birth-date-of-birth-error"
		).should("have.text", "Error: You must be less than 70 years old");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i"
		).clear();
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i"
		).type("2004");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must be 18 years or older to use this service");
		cy.get(
			"#teacher-training-adviser-steps-date-of-birth-date-of-birth-error"
		).should(
			"have.text",
			"Error: You must be 18 years or older to use this service"
		);
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i"
		).clear();
		cy.get(
			"#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i"
		).type("2030");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "Date can't be in the future");
		cy.get(
			"#teacher-training-adviser-steps-date-of-birth-date-of-birth-error"
		).should("have.text", "Error: Date can't be in the future");
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
