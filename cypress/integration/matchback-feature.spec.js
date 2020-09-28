import TeacherTrainingAdviser from "../support/pageobjects/TeacherTrainingAdviser";
import MailingListSignUp from "../support/pageobjects/MailinglistSignupPage";

describe("Matchback feature", () => {
	var returner;
	let firstName;
	let lastName;
	var havePreviousTeacherReferenceNumber;
	const teacherTrainingAdviser = new TeacherTrainingAdviser();
	const mailingListSignUp = new MailingListSignUp();

	beforeEach(function () {
		//cy.viewport("samsung-s10");
		cy.fixture("tta-signup-test-data.json").then((testData) => {
			this.testData = testData;
		});
		cy.fixture("mailinglist-signup-test-data.json").then((testInputData) => {
			this.testInputData = testInputData;
		});
	});

	it('It shows "Thank you  Sign up complete" ', function () {
		let rnum = Math.floor(Math.random() * 100000 + 1);
		firstName = "First_" + rnum + "_name";
		lastName = "Last_" + rnum + "_name";
		let name = firstName + ":" + lastName;
		cy.writeFile("cypress/fixtures/users_name.txt", name);
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
		teacherTrainingAdviser.getEmailAddress().type(this.testData.email);
		teacherTrainingAdviser.getContinueButton().click();
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
			.contains(firstName + " " + lastName);
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

	it("It prevents mailing list sign up if user already signed up for a teacher training adviser service", function () {
		cy.readFile("cypress/fixtures/users_name.txt").then((value) => {
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
			mailingListSignUp.getEmailAddress().type(this.testData.email);
			cy.get("#mailing-list-steps-name-degree-status-id-field").select(
				"Final year"
			);
			mailingListSignUp.getNextStep().click();
			cy.enterEmailVerificationCodeForMailinglist();
			mailingListSignUp.getNextStep().click();
			cy.get("h1")
				.should("exist")
				.should("have.text", "You have already signed up to an adviser");
		});
	});

	it('It shows "You’ve signed up" ', function () {
		let rnum = Math.floor(Math.random() * 1000 + 1);
		let firstName = "First_" + rnum + "_name";
		let lastName = "Last_" + rnum + "_name";
		let name = firstName + ":" + lastName;
		cy.writeFile("cypress/fixtures/users_name.txt", name);
		cy.visit("/mailinglist/signup/name", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptCookie();
		mailingListSignUp.getFirstName().type(firstName);
		mailingListSignUp.getLastName().type(lastName);
		mailingListSignUp.getEmailAddress().type(this.testData.email);
		cy.get("#mailing-list-steps-name-degree-status-id-field").select(
			"Final year"
		);
		mailingListSignUp.getNextStep().click();

		mailingListSignUp
			.getStage()
			.select(this.testInputData.howCloseAreYoutoApplyingForTeacherTraining);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getSubjectToTeach()
			.select(this.testInputData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().type(this.testInputData.postCode);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPhone().type(this.testInputData.phone);
		cy.get("#mailing-list-steps-contact-accept-privacy-policy-1-field").click();
		mailingListSignUp.getCompleteSignUpButton().click();
		mailingListSignUp.getContent().should("have.text", "You've signed up");
	});

	it("It should allow user to sign up for teacher training adviser service if he already signed up for mailing list", function () {
		cy.readFile("cypress/fixtures/users_name.txt").then((value) => {
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
			teacherTrainingAdviser.getEmailAddress().type(this.testData.email);
			teacherTrainingAdviser.getContinueButton().click();
			cy.enterEmailVerificationCodeForTeacherTrainingAdviser();
			cy.clickOnContinueButton();
			cy.returningToTeaching((returner = true));
			cy.havePreviousTeacherReferenceNumber(
				(havePreviousTeacherReferenceNumber = true)
			);
			cy.enterPreviousTeacherReferenceNumber(23478463);
			cy.selectPreviuosMainSubject("Computing");
			cy.selectSubjectLikeToTeach("Physics");
			cy.enterDateOfBirth("25", "02", "1986", (returner = true));
			cy.whereDoYouLive("UK");
			cy.get(
				"#teacher-training-adviser-steps-uk-address-address-postcode-field"
			).should("have.value", "TF3 2BT");
			cy.enterUKCandidateAddress(
				"55",
				"Hollinswood",
				"Telford",
				"TF3 2BT",
				(returner = true)
			);
			cy.get(
				"#teacher-training-adviser-steps-uk-telephone-telephone-field"
			).should("have.value", this.testInputData.phone);
			cy.clickOnContinueButton();
			cy.get(".govuk-heading-l")
				.should("exist")
				.should("have.text", "Check your answers before you continue");
			cy.contains("Name")
				.next()
				.contains(firstName + " " + lastName);
			cy.contains("Date of birth").next().contains("25 02 1986");
			cy.contains("Address").next().contains("55 Hollinswood Telford TF3 2BT");
			cy.contains("Email").next().contains(this.testData.email);
			cy.contains("Telephone").next().contains(this.testInputData.phone);
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
	});
});
