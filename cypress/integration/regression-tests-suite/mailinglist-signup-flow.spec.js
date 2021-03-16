import MailingListSignUp from "../../support/pageobjects/MailinglistSignupPage";

describe(`Feature - Mailing list sign up : Tests execution date and time : ${new Date()}`, () => {
	const mailingListSignUp = new MailingListSignUp();
	let firstName;
	let lastName;

	beforeEach(function () {
		cy.fixture("mailinglist-signup-test-data.json").then((testData) => {
			this.testData = testData;
		});
		cy.visit("/mailinglist/signup/name", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptCookie();
	});

	it('It shows "You’ve signed up" message for new candidate', function () {
		let rnum = Math.floor(Math.random() * 10000000 + 1);
		firstName = "Mailinglistuser_" + rnum + "_firstname";
		lastName = "Mailinglistuser_" + rnum + "_lastname";
		cy.signupForMailingList(firstName, lastName, this.testData.email);
		cy.degreeStage("Yes, I already have a degree");
		cy.clickOnNextStepButton();
		cy.howCloseAreYou("I’m not sure and finding out more");
		cy.clickOnNextStepButton();
		mailingListSignUp.getSubjectToTeach().select(this.testData.whichSubjectdoYouWantToTeach);
		cy.clickOnNextStepButton();
		mailingListSignUp.getPostcode().type(this.testData.postCode);
		cy.clickOnNextStepButton();
		cy.acceptPrivacyPolicy();
		mailingListSignUp.getCompleteSignUpButton().click();
		cy.VerifyYouHaveSignedupMessage();
	});
});
