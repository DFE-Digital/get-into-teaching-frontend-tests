import MailingListSignUp from "../support/pageobjects/MailinglistSignupPage";

describe(`Feature - Mailing list sign up : Tests execution date and time : ${new Date()}`, () => {
	const mailingListSignUp = new MailingListSignUp();

	beforeEach(function () {
		cy.fixture("mailinglist-signup-test-data.json").then((testInputData) => {
			this.testInputData = testInputData;
		});
		cy.visit("/mailinglist/signup/name", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptCookie();
	});

	it("It shows the Sign up page", function () {
		cy.get("#edit_mailing_list_steps_name_name").should("exist");
	});

	it("It shows the error message if user clicks next button without entering the mandatory details", function () {
		cy.get("#edit_mailing_list_steps_name_name").should("exist");
		mailingListSignUp.getNextStep().click();
		cy.get("#error-summary-title").should("exist").should("have.text", "There is a problem");
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

	it("Error message link navigates to its respective field", function () {
		mailingListSignUp.getNextStep().click();
		cy.contains("Enter your full email address")
			.should((el) => {
				expect(el).to.have.attr("href", "#mailing-list-steps-name-email-field-error");
			})
			.click()
			.type("Test_email@gmail.com");
		mailingListSignUp.getNextStep().click();
		cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)")
			.should("have.text", "Enter your first name")
			.next()
			.should("have.text", "Enter your last name");
		cy.contains("Enter your first name")
			.should((el) => {
				expect(el).to.have.attr("href", "#mailing-list-steps-name-first-name-field-error");
			})
			.click()
			.type("Test_First_Name");
		mailingListSignUp.getNextStep().click();
		cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)").should(
			"have.text",
			"Enter your last name"
		);
	});

	it("It shows error message if user enters wrong email verification code", function () {
		let rnum = Math.floor(Math.random() * 1000000000 + 1);
		let firstName = `Testuser${rnum}firstname`;
		let lastName = `Testuser${rnum}lastname`;
		cy.enterFirstNameLastNameAndEmailAddress(firstName, lastName, this.testInputData.emailAddress);
		mailingListSignUp.getNextStep().click();
		cy.degreeStage("Yes, I already have a degree");
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getStage()
			.select(this.testInputData.howCloseAreYoutoApplyingForTeacherTraining);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getSubjectToTeach().select(this.testInputData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().type(this.testInputData.postCode);
		mailingListSignUp.getNextStep().click();
		cy.acceptPrivacyPolicy();
		mailingListSignUp.getCompleteSignUpButton().click();
		mailingListSignUp.getContent().should("have.text", `You've signed up`);
		cy.wait(8000);
		cy.visit("/mailinglist/signup/name", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.enterFirstNameLastNameAndEmailAddress(firstName, lastName, this.testInputData.emailAddress);
		mailingListSignUp.getNextStep().click();
		cy.get("#mailing-list-steps-authenticate-timed-one-time-password-field").type("123456");
		mailingListSignUp.getNextStep().click();
		cy.get("#mailing-list-steps-authenticate-timed-one-time-password-error")
			.should("exist")
			.should(
				"have.text",
				"Error: Please enter the latest verification code sent to your email address"
			);
	});

	it("It resends the verification code to users email", function () {
		let rnum = Math.floor(Math.random() * 1000000000 + 1);
		let firstName = `Testuser${rnum}firstname`;
		let lastName = `Testuser${rnum}lastname`;
		cy.enterFirstNameLastNameAndEmailAddress(firstName, lastName, this.testInputData.emailAddress);
		mailingListSignUp.getNextStep().click();
		cy.degreeStage("Yes, I already have a degree");
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getStage()
			.select(this.testInputData.howCloseAreYoutoApplyingForTeacherTraining);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getSubjectToTeach().select(this.testInputData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().type(this.testInputData.postCode);
		mailingListSignUp.getNextStep().click();
		cy.acceptPrivacyPolicy();
		mailingListSignUp.getCompleteSignUpButton().click();
		mailingListSignUp.getContent().should("have.text", `You've signed up`);
		cy.wait(8000);
		cy.visit("/mailinglist/signup/name", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.enterFirstNameLastNameAndEmailAddress(firstName, lastName, this.testInputData.emailAddress);
		mailingListSignUp.getNextStep().click();
		cy.get("#mailing-list-steps-authenticate-timed-one-time-password-field").type("123456");
		mailingListSignUp.getNextStep().click();
		cy.get("#mailing-list-steps-authenticate-timed-one-time-password-error")
			.should("exist")
			.should(
				"have.text",
				"Error: Please enter the latest verification code sent to your email address"
			);
		cy.contains("resend verification").click();
		cy.enterEmailVerificationCodeForMailinglist();
		mailingListSignUp.getNextStep().click();
		cy.get("#edit_mailing_list_steps_already_subscribed_already_subscribed > h1")
			.should("exist")
			.should("have.text", "You’ve already signed up");
	});

	it(`It shows 'You’ve signed up' message for new candidate`, function () {
		let rnum = Math.floor(Math.random() * 1000000000 + 1);
		let email = `testuser${rnum.toString()}@mail.co.uk`;
		cy.enterFirstNameLastNameAndEmailAddress(
			this.testInputData.firstName,
			this.testInputData.lastName,
			email
		);
		mailingListSignUp.getNextStep().click();
		cy.degreeStage("Yes, I already have a degree");
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getStage()
			.select(this.testInputData.howCloseAreYoutoApplyingForTeacherTraining);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getSubjectToTeach().select(this.testInputData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().type(this.testInputData.postCode);
		mailingListSignUp.getNextStep().click();
		cy.acceptPrivacyPolicy();
		mailingListSignUp.getCompleteSignUpButton().click();
		mailingListSignUp.getContent().should("have.text", `You've signed up`);
		cy.contains("Want to speak to us?")
			.next()
			.children()
			.as("speakToUsSection")
			.should("exist")
			.invoke("attr", "href")
			.then(function (targetLink) {
				expect(targetLink).to.equal("tel:08003892501");
			});
		cy.get("@speakToUsSection").then(function (phoneNumber) {
			cy.log();
			expect(phoneNumber.text()).to.equal("0800 389 2501");
		});
	});

	it('It shows "Youve already signed up" message to existing candidate', function () {
		let rnum = Math.floor(Math.random() * 1000000000 + 1);
		let firstName = `Testuser${rnum}firstname`;
		let lastName = `Testuser${rnum}lastname`;
		cy.enterFirstNameLastNameAndEmailAddress(firstName, lastName, this.testInputData.emailAddress);
		mailingListSignUp.getNextStep().click();
		cy.degreeStage("Yes, I already have a degree");
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getStage()
			.select(this.testInputData.howCloseAreYoutoApplyingForTeacherTraining);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getSubjectToTeach().select(this.testInputData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().type(this.testInputData.postCode);
		mailingListSignUp.getNextStep().click();
		cy.acceptPrivacyPolicy();
		mailingListSignUp.getCompleteSignUpButton().click();
		mailingListSignUp.getContent().should("have.text", `You've signed up`);
		cy.wait(8000);
		cy.visit("/mailinglist/signup/name", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.enterFirstNameLastNameAndEmailAddress(firstName, lastName, this.testInputData.emailAddress);
		mailingListSignUp.getNextStep().click();
		cy.hideFeedbackBar();
		cy.enterEmailVerificationCodeForMailinglist();
		mailingListSignUp.getNextStep().click();
		cy.get("#edit_mailing_list_steps_already_subscribed_already_subscribed > h1")
			.should("exist")
			.should("have.text", "You’ve already signed up");
	});

	it("It shows Privacy policy details to the user if he clicks on link", function () {
		let rnum = Math.floor(Math.random() * 1000000000 + 1);
		let email = `testuser${rnum.toString()}@mail.co.uk`;
		cy.enterFirstNameLastNameAndEmailAddress(
			this.testInputData.firstName,
			this.testInputData.lastName,
			email
		);
		mailingListSignUp.getNextStep().click();
		cy.degreeStage("Yes, I already have a degree");
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getStage()
			.select(this.testInputData.howCloseAreYoutoApplyingForTeacherTraining);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getSubjectToTeach().select(this.testInputData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().type(this.testInputData.postCode);
		mailingListSignUp.getNextStep().click();
		cy.contains("a", "privacy policy").invoke("removeAttr", "target").click();
		cy.contains("Privacy Policy").should("exist");
		cy.contains("Privacy Notice: Get into Teaching Information Service").should("exist");
		cy.get(".site-footer-top").should("exist").next().should("exist");
	});

	it("Links through to feedback survey page", function () {
		let rnum = Math.floor(Math.random() * 1000000000 + 1);
		let email = `testuser${rnum.toString()}@mail.co.uk`;
		cy.enterFirstNameLastNameAndEmailAddress(
			this.testInputData.firstName,
			this.testInputData.lastName,
			email
		);
		mailingListSignUp.getNextStep().click();
		cy.degreeStage("Yes, I already have a degree");
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getStage()
			.select(this.testInputData.howCloseAreYoutoApplyingForTeacherTraining);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getSubjectToTeach().select(this.testInputData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().type(this.testInputData.postCode);
		mailingListSignUp.getNextStep().click();
		cy.acceptPrivacyPolicy();
		mailingListSignUp.getCompleteSignUpButton().click();
		mailingListSignUp.getContent().should("have.text", `You've signed up`);
		cy.contains("Want to speak to us?")
			.next()
			.children()
			.as("speakToUsSection")
			.should("exist")
			.invoke("attr", "href")
			.then(function (targetLink) {
				expect(targetLink).to.equal("tel:08003892501");
			});
		cy.get("@speakToUsSection").then(function (phoneNumber) {
			cy.log();
			expect(phoneNumber.text()).to.equal("0800 389 2501");
		});
		cy.contains("a", "feedback on this website").invoke("removeAttr", "target").click();
		cy.get(".freebirdFormviewerViewHeaderTitle")
			.should("exist")
			.should("have.text", "Get into Teaching: Feedback Survey");
	});

	it('It hides the feedback bar if user clicks on "Hide" link', function () {
		let rnum = Math.floor(Math.random() * 1000000000 + 1);
		let email = `testuser${rnum.toString()}@mail.co.uk`;
		cy.enterFirstNameLastNameAndEmailAddress(
			this.testInputData.firstName,
			this.testInputData.lastName,
			email
		);
		mailingListSignUp.getNextStep().click();
		cy.degreeStage("Yes, I already have a degree");
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getStage()
			.select(this.testInputData.howCloseAreYoutoApplyingForTeacherTraining);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getSubjectToTeach().select(this.testInputData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().type(this.testInputData.postCode);
		mailingListSignUp.getNextStep().click();
		cy.acceptPrivacyPolicy();
		mailingListSignUp.getCompleteSignUpButton().click();
		mailingListSignUp.getContent().should("have.text", `You've signed up`);
		cy.contains("Want to speak to us?")
			.next()
			.children()
			.as("speakToUsSection")
			.should("exist")
			.invoke("attr", "href")
			.then(function (targetLink) {
				expect(targetLink).to.equal("tel:08003892501");
			});
		cy.get("@speakToUsSection").then(function (phoneNumber) {
			cy.log();
			expect(phoneNumber.text()).to.equal("0800 389 2501");
		});
		cy.get("#hide-feedback-bar").click();
		cy.contains("a", "feedback on this website").should("not.be.visible");
	});
	/*it("Links through to feedback survey page", function () {
		cy.enterFirstNameLastNameAndEmailAddress().then(() => {
			mailingListSignUp.getNextStep().click();
			cy.degreeStage("Yes, I already have a degree");
			mailingListSignUp.getNextStep().click();
			mailingListSignUp
				.getStage()
				.select(this.testInputData.howCloseAreYoutoApplyingForTeacherTraining);
			mailingListSignUp.getNextStep().click();
			mailingListSignUp.getSubjectToTeach().select(this.testInputData.whichSubjectdoYouWantToTeach);
			mailingListSignUp.getNextStep().click();
			mailingListSignUp.getPostcode().type(this.testInputData.postCode);
			mailingListSignUp.getNextStep().click();
			cy.acceptPrivacyPolicy();
			mailingListSignUp.getCompleteSignUpButton().click();
			mailingListSignUp.getContent().should("have.text", `You've signed up`);
			cy.contains("Want to speak to us?")
				.next()
				.children()
				.as("speakToUsSection")
				.should("exist")
				.invoke("attr", "href")
				.then(function (targetLink) {
					expect(targetLink).to.equal("tel:08003892501");
				});
			cy.get("@speakToUsSection").then(function (phoneNumber) {
				cy.log();
				expect(phoneNumber.text()).to.equal("0800 389 2501");
			});
			cy.contains("a", "feedback on this website").invoke("removeAttr", "target").click();
			cy.get(".freebirdFormviewerViewHeaderTitle")
				.should("exist")
				.should("have.text", "Get into Teaching: Feedback Survey");
		});
	});

	it('It hides the feedback bar if user clicks on "Hide" link', function () {
		cy.enterFirstNameLastNameAndEmailAddress().then(() => {
			mailingListSignUp.getNextStep().click();
			cy.degreeStage("Yes, I already have a degree");
			mailingListSignUp.getNextStep().click();
			mailingListSignUp
				.getStage()
				.select(this.testInputData.howCloseAreYoutoApplyingForTeacherTraining);
			mailingListSignUp.getNextStep().click();
			mailingListSignUp.getSubjectToTeach().select(this.testInputData.whichSubjectdoYouWantToTeach);
			mailingListSignUp.getNextStep().click();
			mailingListSignUp.getPostcode().type(this.testInputData.postCode);
			mailingListSignUp.getNextStep().click();
			cy.acceptPrivacyPolicy();
			mailingListSignUp.getCompleteSignUpButton().click();
			mailingListSignUp.getContent().should("have.text", `You've signed up`);
			cy.contains("Want to speak to us?")
				.next()
				.children()
				.as("speakToUsSection")
				.should("exist")
				.invoke("attr", "href")
				.then(function (targetLink) {
					expect(targetLink).to.equal("tel:08003892501");
				});
			cy.get("@speakToUsSection").then(function (phoneNumber) {
				cy.log();
				expect(phoneNumber.text()).to.equal("0800 389 2501");
			});
			cy.get("#hide-feedback-bar").click();
			cy.contains("a", "feedback on this website").should("not.be.visible");
		});
	});*/
});

describe(`Feature - 404 Not Found unknown_route : ${new Date()}`, () => {
	it('It should show "404	Not Found unknown_route" if the user enters a bad URL', () => {
		cy.visit({
			url: "https://get-into-teaching-app-tests.london.cloudapps.digital//mailinglist/signup/name",
			method: "GET",
			failOnStatusCode: false,
		});
		cy.verify404ErrorMessage();
	});
});
