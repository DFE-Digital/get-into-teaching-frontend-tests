import MailingListSignUp from "../support/pageobjects/MailinglistSignupPage";

describe(`Feature - Mailing list sign up : Tests execution date and time : ${new Date()}`, () => {
	const mailingListSignUp = new MailingListSignUp();

	beforeEach(function () {
		cy.fixture("mailinglist-signup-test-data.json").then((mailingListTestData) => {
			this.mailingListTestData = mailingListTestData;
		});
		cy.visit("/mailinglist/signup/name", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptCookie();
	});

	it.only(`It shows 'You’ve signed up' message for new candidate`, function () {
		let rnum = Math.floor(Math.random() * 1000000000 + 1);
		let email = `testuser${rnum.toString()}@mail.co.uk`;
		cy.enterFirstNameLastNameAndEmailAddress(
			this.mailingListTestData.firstName,
			this.mailingListTestData.lastName,
			email
		);
		mailingListSignUp.getNextStep().click();
		cy.degreeStage("Yes, I already have a degree");
		mailingListSignUp.getNextStep().click();
		cy.howCloseAreYou("I’m not sure and finding out more");
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getSubjectToTeach()
			.select(this.mailingListTestData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().type(this.mailingListTestData.postCode);
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
		cy.enterFirstNameLastNameAndEmailAddress(firstName, lastName, this.mailingListTestData.email);
		mailingListSignUp.getNextStep().click();
		cy.degreeStage("Yes, I already have a degree");
		mailingListSignUp.getNextStep().click();
		cy.howCloseAreYou("I’m very sure and think I’ll apply");
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getSubjectToTeach()
			.select(this.mailingListTestData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().type(this.mailingListTestData.postCode);
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
		cy.enterFirstNameLastNameAndEmailAddress(firstName, lastName, this.mailingListTestData.email);
		mailingListSignUp.getNextStep().click();
		cy.enterEmailVerificationCode(
			this.mailingListTestData.email,
			this.mailingListTestData.emailKey
		).then((otp) => {
			cy.get("#mailing-list-steps-authenticate-timed-one-time-password-field").type(otp);
		});
		mailingListSignUp.getNextStep().click();
		cy.get("#edit_mailing_list_steps_already_subscribed_already_subscribed > h1")
			.should("exist")
			.should("have.text", "You’ve already signed up");
	});

	it("It shows Privacy policy details to the user if he clicks on link", function () {
		let rnum = Math.floor(Math.random() * 1000000000 + 1);
		let email = `testuser${rnum.toString()}@mail.co.uk`;
		cy.enterFirstNameLastNameAndEmailAddress(
			this.mailingListTestData.firstName,
			this.mailingListTestData.lastName,
			email
		);
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
		cy.contains("a", "privacy policy").invoke("removeAttr", "target").click();
		cy.contains("Privacy Policy").should("exist");
		cy.contains("Privacy Notice: Get into Teaching Information Service").should("exist");
		cy.get(".site-footer-top").should("exist").next().should("exist");
	});
});
