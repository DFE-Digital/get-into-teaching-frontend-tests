import MailingListSignUp from "../../support/pageobjects/MailinglistSignupPage";
import Navlinks from "../../support/pageobjects/Navlinks";

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

	it("It resends the verification code to users email", function () {
		let rnum = Math.floor(Math.random() * 1000000000 + 1);
		let firstName = `Testuser${rnum}firstname`;
		let lastName = `Testuser${rnum}lastname`;
		cy.signupForMailingList(firstName, lastName, this.mailingListTestData.email);
		cy.degreeStage("Yes, I already have a degree");
		mailingListSignUp.getNextStep().click();
		cy.howCloseAreYou("It’s just an idea");
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getSubjectToTeach().select(this.mailingListTestData.whichSubjectdoYouWantToTeach);
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
		cy.signupForMailingList(firstName, lastName, this.mailingListTestData.email);
		cy.get("#wizard-steps-authenticate-timed-one-time-password-field").type("123456");
		mailingListSignUp.getNextStep().click();
		cy.get("#wizard-steps-authenticate-timed-one-time-password-error")
			.should("exist")
			.should("have.text", "Error: Please enter the latest verification code sent to your email address");
		cy.contains("resend verification").click();
		cy.enterEmailVerificationCode(this.mailingListTestData.email, Cypress.env("MAILING_LIST_USER_EMAIL_API_KEY"));
		mailingListSignUp.getNextStep().click();
		cy.get("#edit_mailing_list_steps_already_subscribed_already_subscribed > h1")
			.should("exist")
			.should("have.text", "You’ve already signed up");
	});
});
