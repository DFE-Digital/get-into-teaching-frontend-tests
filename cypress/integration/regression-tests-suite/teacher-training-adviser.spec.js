import TeacherTrainingAdviser from "../../support/pageobjects/TeacherTrainingAdviser";
/// <reference types="Cypress" />
let firstName;
let lastName;

describe("Feature - Get an adviser : Tests execution date and time : " + new Date(), () => {
	const teacherTrainingAdviser = new TeacherTrainingAdviser();

	beforeEach(function () {
		cy.fixture("tta-signup-test-data.json").then((ttaTestData) => {
			this.ttaTestData = ttaTestData;
		});
		cy.fixture("mailinglist-signup-test-data.json").then((mailingListTestData) => {
			this.mailingListTestData = mailingListTestData;
		});

		cy.visit(Cypress.env("baseurl_tta_flow"), {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptAllCookies();
		cy.clickOnStartNowButton();
	});

	it('It shows "Thank you  Sign up complete" message to UK returner user', function () {
		let rnum = Math.floor(Math.random() * 10000000 + 1);
		firstName = "First_" + rnum + "_name";
		lastName = "Last_" + rnum + "_name";
		teacherTrainingAdviser.getFirstName().type(firstName);
		teacherTrainingAdviser.getLastName().type(lastName);
		teacherTrainingAdviser.getEmailAddress().type(this.ttaTestData.email);
		teacherTrainingAdviser.getContinueButton().click();
		cy.returningToTeaching("Yes");
		cy.havePreviousTeacherReferenceNumber(true);
		cy.enterPreviousTeacherReferenceNumber(23478463);
		cy.selectPreviuosMainSubject("Computing");
		cy.selectSubjectLikeToTeach("Physics");
		cy.enterDateOfBirth("25", "02", "1986");
		cy.doYouLiveInTheUk(true);
		cy.enterUKCandidateAddress("55", "Hollinswood", "Telford", "TF3 2BT");
		cy.enterUKTelephoneNumber("012345678");
		cy.verifyCheckYourAnswersMessage();
		cy.contains("Name")
			.next()
			.contains(firstName + " " + lastName);
		cy.contains("Date of birth").next().contains("25 02 1986");
		cy.contains("Address").next().contains("55 Hollinswood Telford TF3 2BT");
		cy.contains("Email").next().contains(this.ttaTestData.email);
		cy.contains("Telephone").next().contains("012345678");
		cy.contains("Are you returning to teaching?").next().contains("Yes");
		cy.contains("What is your previous teacher reference number?").next().contains("23478463");
		cy.contains("Which main subject did you previously teach?").next().contains("Computing");
		cy.contains("Which subject would you like to teach if you return to teaching?").next().contains("Physics");
		cy.contains("Where do you live?").next().contains("UK");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignUpCompleteMessage();
	});

	it('It shows "Get support" message to the UK returner if he selects subject as "Other"', function () {
		cy.enterFirstNameLastNameAndEmail();
		cy.returningToTeaching("Yes");
		cy.havePreviousTeacherReferenceNumber(true);
		cy.enterPreviousTeacherReferenceNumber(23478463);
		cy.selectPreviuosMainSubject("Computing");
		cy.selectSubjectLikeToTeach("Other");
		cy.get(".govuk-heading-l").should("exist").should("have.text", "Get support");
	});

	it('It shows "Thank you  Sign up complete" message to overseas returner user', function () {
		cy.enterFirstNameLastNameAndEmail();
		cy.returningToTeaching("Yes");
		cy.havePreviousTeacherReferenceNumber(true);
		cy.enterPreviousTeacherReferenceNumber(23478463);
		cy.selectPreviuosMainSubject("Biology");
		cy.selectSubjectLikeToTeach("Maths");
		cy.enterDateOfBirth("20", "07", "2000");
		cy.doYouLiveInTheUk(false);
		cy.whichCountryDoYouLiveIn("Switzerland");
		cy.enterOverseasTelephoneNumber("44012354758");
		cy.verifyCheckYourAnswersMessage();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignUpCompleteMessage();
	});

	it('It shows "Thank you  Sign up complete" to non-returner UK user', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary 
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - Yes
		  UK user
		*/

		cy.enterFirstNameLastNameAndEmail();
		cy.returningToTeaching("No");
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.gcseMathsAndEnglish(true);
		cy.gcseScience(true);
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985");
		cy.doYouLiveInTheUk(true);
		cy.enterUKCandidateAddress("21", "Victoria Embankment", "Darlington", "DL1 5JR");
		cy.enterUKTelephoneNumber("44125234490");
		cy.verifyCheckYourAnswersMessage();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignUpCompleteMessage();
	});

	it('It shows "Thank you  Sign up complete" to non-returner overseas user', function () {
		/*Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? -Yes
		  Do you have grade 4 (C) or above in GCSE science, or equivalent? - No
		  Are you planning to retake your science GCSE? - Yes
		  Overseas user
		*/

		cy.enterFirstNameLastNameAndEmail();
		cy.returningToTeaching("No");
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.gcseMathsAndEnglish(true);
		cy.gcseScience(false);
		cy.retakeGcseScience(true);
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985");
		cy.doYouLiveInTheUk(false);
		cy.whichCountryDoYouLiveIn("Poland");
		cy.enterOverseasTelephoneNumber("4438494102834");
		cy.verifyCheckYourAnswersMessage();
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignUpCompleteMessage();
	});

	it('It shows "Get the right GCSEs or equivalent qualifications"', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - Yes
		  Which stage are you interested in teaching? - primary
		  Do you have grade 4 (C) or above in English and maths GCSEs, or equivalent? - No
		  Are you planning to retake either English or maths (or both) GCSEs, or equivalent? - No
		  Overseas user
		  Expected - Get the right GCSEs or equivalent qualifications page
		 
		*/

		cy.enterFirstNameLastNameAndEmail();
		cy.returningToTeaching("No");
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.wait(1000);
		cy.selectStage("Primary");
		cy.gcseMathsAndEnglish(false);
		cy.retakeGcseMathsAndEnglish(false);
		cy.verifyGetRightGCSEMessage();
	});

	it('It shows "If you do not have a degree page" if non-returner user has no degree', function () {
		/*
		  Are you returning to teaching? - No
		  Do you have a degree? - No
		  Expected - 	If you do not have a degree page	   
		*/
		cy.enterFirstNameLastNameAndEmail();
		cy.returningToTeaching("No");
		cy.doYouHaveDegree("No");
		cy.get(".govuk-heading-l").should("exist").should("have.text", "If you do not have a degree");
	});
});
