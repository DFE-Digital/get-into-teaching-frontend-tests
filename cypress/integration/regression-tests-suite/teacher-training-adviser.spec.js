import TeacherTrainingAdviser from "../../support/pageobjects/TeacherTrainingAdviser";
import MailingListSignUp from "../../support/pageobjects/MailinglistSignupPage";
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
		let name = firstName + ":" + lastName;
		cy.writeFile("cypress/fixtures/user.txt", name);
		teacherTrainingAdviser.getFirstName().type(firstName);
		teacherTrainingAdviser.getLastName().type(lastName);
		teacherTrainingAdviser.getEmailAddress().type(this.ttaTestData.email);
		teacherTrainingAdviser.getContinueButton().click();
		cy.returningToTeaching(true);
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
		cy.contains("Which subject would you like to teach if you return to teaching?")
			.next()
			.contains("Physics");
		cy.contains("Where do you live?").next().contains("UK");

		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.verifySignUpCompleteMessage();
	});

	it('It shows "Get support" message to the UK returner if he selects subject as "Other"', function () {
		cy.enterFirstNameLastNameAndEmail();
		cy.returningToTeaching(true);
		cy.havePreviousTeacherReferenceNumber(true);
		cy.enterPreviousTeacherReferenceNumber(23478463);
		cy.selectPreviuosMainSubject("Computing");
		cy.selectSubjectLikeToTeach("Other");
		cy.get(".govuk-heading-l").should("exist").should("have.text", "Get support");
	});

	it('It shows "Thank you  Sign up complete" message to overseas returner user', function () {
		cy.enterFirstNameLastNameAndEmail();
		cy.returningToTeaching(true);
		cy.havePreviousTeacherReferenceNumber(true);
		cy.enterPreviousTeacherReferenceNumber(23478463);
		cy.selectPreviuosMainSubject("Biology");
		cy.selectSubjectLikeToTeach("Maths");
		cy.enterDateOfBirth("20", "07", "2000");
		cy.doYouLiveInTheUk(false);
		cy.whichCountryDoYouLiveIn("Switzerland");
		cy.enterOverseasTelephoneNumber("0012354758");
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
		cy.returningToTeaching(false);
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
		cy.enterUKTelephoneNumber("0125234490");
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
		cy.returningToTeaching(false);
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
		cy.enterOverseasTelephoneNumber("38494102834");
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
		cy.returningToTeaching(false);
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
		cy.returningToTeaching(false);
		cy.doYouHaveDegree("No");
		cy.get(".govuk-heading-l").should("exist").should("have.text", "If you do not have a degree");
	});

	it('It shows " You have already signed up to this service" message to previously signed up user', function () {
		teacherTrainingAdviser.getFirstName().type(firstName);
		teacherTrainingAdviser.getLastName().type(lastName);
		teacherTrainingAdviser.getEmailAddress().type(this.ttaTestData.email);
		teacherTrainingAdviser.getContinueButton().click();
		cy.enterEmailVerificationCode(this.ttaTestData.email, this.ttaTestData.emailKey).then((otp) => {
			cy.get("#wizard-steps-authenticate-timed-one-time-password-field").type(otp);
		});
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "You have already signed up to this service");
	});
});

describe("Matchback feature", () => {
	const teacherTrainingAdviser = new TeacherTrainingAdviser();
	const mailingListSignUp = new MailingListSignUp();

	beforeEach(function () {
		cy.fixture("tta-signup-test-data.json").then((ttaTestData) => {
			this.ttaTestData = ttaTestData;
		});
		cy.fixture("mailinglist-signup-test-data.json").then((mailingListTestData) => {
			this.mailingListTestData = mailingListTestData;
		});
	});

	it("It prevents mailing list sign up if user already signed up for a teacher training adviser service", function () {
		cy.readFile("cypress/fixtures/user.txt").then((value) => {
			let name = value;
			firstName = name.split(":")[0];
			lastName = name.split(":")[1];
			cy.visit("/mailinglist/signup/name", {
				auth: {
					username: Cypress.env("HTTPAUTH_USERNAME"),
					password: Cypress.env("HTTPAUTH_PASSWORD"),
				},
			});
			cy.acceptCookie();
			mailingListSignUp.getFirstName().type(firstName);
			mailingListSignUp.getLastName().type(lastName);
			mailingListSignUp.getEmailAddress().type(this.ttaTestData.email);
			mailingListSignUp.getNextStep().click();
			cy.enterEmailVerificationCode(this.ttaTestData.email, this.ttaTestData.emailKey).then(
				(otp) => {
					cy.get("#wizard-steps-authenticate-timed-one-time-password-field").type(otp);
				}
			);
			mailingListSignUp.getNextStep().click();
			cy.get("h1").should("exist").should("have.text", "You have already signed up to an adviser");
		});
	});

	it('It shows "You’ve signed up" ', function () {
		let rnum = Math.floor(Math.random() * 10000000 + 1);
		let firstName = "First_" + rnum + "_name";
		let lastName = "Last_" + rnum + "_name";
		let name = firstName + ":" + lastName;
		cy.writeFile("cypress/fixtures/user.txt", name);
		cy.visit("/mailinglist/signup/name", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptCookie();
		mailingListSignUp.getFirstName().type(firstName);
		mailingListSignUp.getLastName().type(lastName);
		mailingListSignUp.getEmailAddress().type(this.ttaTestData.email);
		mailingListSignUp.getNextStep().click();
		cy.degreeStage("Yes, I already have a degree");
		mailingListSignUp.getNextStep().click();
		cy.howCloseAreYou("I’m fairly sure and exploring my options");
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getSubjectToTeach()
			.select(this.mailingListTestData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().type(this.mailingListTestData.postCode);
		mailingListSignUp.getNextStep().click();
		cy.acceptPrivacyPolicy();
		mailingListSignUp.getCompleteSignUpButton().click();
		mailingListSignUp.getContent().should("have.text", "You've signed up");
		cy.wait(6000);
	});

	it("It should allow user to sign up for teacher training adviser service if he already signed up for mailing list", function () {
		cy.readFile("cypress/fixtures/user.txt").then((value) => {
			let name = value;
			firstName = name.split(":")[0];
			lastName = name.split(":")[1];
			cy.visit(Cypress.env("baseurl_tta_flow"), {
				auth: {
					username: Cypress.env("HTTPAUTH_USERNAME"),
					password: Cypress.env("HTTPAUTH_PASSWORD"),
				},
			});
			cy.acceptAllCookies();
			cy.clickOnStartNowButton();
			teacherTrainingAdviser.getFirstName().type(firstName);
			teacherTrainingAdviser.getLastName().type(lastName);
			teacherTrainingAdviser.getEmailAddress().type(this.ttaTestData.email);
			teacherTrainingAdviser.getContinueButton().click();
			cy.enterEmailVerificationCode(this.ttaTestData.email, this.ttaTestData.emailKey).then(
				(otp) => {
					cy.get("#wizard-steps-authenticate-timed-one-time-password-field").type(otp);
				}
			);
			cy.clickOnContinueButton();
			cy.returningToTeaching(true);
			cy.havePreviousTeacherReferenceNumber(true);
			cy.enterPreviousTeacherReferenceNumber(23478463);
			cy.selectPreviuosMainSubject("Computing");
			cy.selectSubjectLikeToTeach("Physics");
			cy.enterDateOfBirth("25", "02", "1986");
			cy.doYouLiveInTheUk(true);
			cy.get("#teacher-training-adviser-steps-uk-address-address-postcode-field").should(
				"have.value",
				"TF3 2BT"
			);
			cy.enterUKCandidateAddress("55", "Hollinswood", "Telford", "TF3 2BT");
			cy.get("#teacher-training-adviser-steps-uk-telephone-telephone-field").type(
				this.mailingListTestData.phone
			);
			cy.clickOnContinueButton();
			cy.get(".govuk-heading-l")
				.should("exist")
				.should("have.text", "Check your answers before you continue");
			cy.contains("Name")
				.next()
				.contains(firstName + " " + lastName);
			cy.contains("Date of birth").next().contains("25 02 1986");
			cy.contains("Address").next().contains("55 Hollinswood Telford TF3 2BT");
			cy.contains("Email").next().contains(this.ttaTestData.email);
			cy.contains("Telephone").next().contains(this.mailingListTestData.phone);
			cy.contains("Are you returning to teaching?").next().contains("Yes");
			cy.contains("What is your previous teacher reference number?").next().contains("23478463");
			cy.contains("Which main subject did you previously teach?").next().contains("Computing");
			cy.contains("Which subject would you like to teach if you return to teaching?")
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
	});
});
