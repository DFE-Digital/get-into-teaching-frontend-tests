import MailingListSignUp from "../support/pageobjects/MailinglistSignupPage";

describe("Get-into-teaching - Mailinglist registration flow", () => {
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
		mailingListSignUp.getSubmitButton().click();
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
			.should("have.text", "Enter your full email address")
			.next()
			.should("have.text", "Enter your first name")
			.next()
			.should("have.text", "Enter your last name");
	});

	it("Error message link navigates to its respective field", function () {
		mailingListSignUp.getSubmitButton().click();

		cy.contains("Enter your full email address")
			.should((el) => {
				expect(el).to.have.attr(
					"href",
					"#mailing-list-steps-name-email-field-error"
				);
			})
			.click()
			.type("Test_email@gmail.com");
		mailingListSignUp.getSubmitButton().click();
		cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)")
			.should("have.text", "Enter your first name")
			.next()
			.should("have.text", "Enter your last name");

		cy.contains("Enter your first name")
			.should((el) => {
				expect(el).to.have.attr(
					"href",
					"#mailing-list-steps-name-first-name-field-error"
				);
			})
			.click()
			.type("Test_First_Name");
		mailingListSignUp.getSubmitButton().click();

		cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)").should(
			"have.text",
			"Enter your last name"
		);
	});

	it('It shows "You’ve already signed up" message to existing candidate', function () {
		let rnum = Math.floor(Math.random() * 100 + 1);
		let firstName = "Userfirstname_" + rnum;
		let lastName = "Userlastname_" + rnum;
		mailingListSignUp.getFirstName().type(firstName);
		mailingListSignUp.getLastName().type(lastName);
		mailingListSignUp.getEmailAddress().type(this.testInputData.emailAddress);
		/*mailingListSignUp
			.getDescribeYourself()
			.select(this.testInputData.describeYourself);*/
		cy.get("#mailing-list-steps-name-degree-status-id-field").select(
			"Final year"
		);
		//cy.get('#mailing-list-steps-authenticate-timed-one-time-password-field')
		//mailingListSignUp.getDegreeStage().select(this.testInputData.degreeStage);
		//mailingListSignUp.getSubmitButton().click();
		mailingListSignUp.getNextStep().click();
		//cy.enterEmailVerificationCodeForMailinglist();
		//mailingListSignUp.getNextStep().click();
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
		cy.visit("/mailinglist/signup/name", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		mailingListSignUp.getFirstName().type(firstName);
		mailingListSignUp.getLastName().type(lastName);
		mailingListSignUp.getEmailAddress().type(this.testInputData.emailAddress);
		/*mailingListSignUp
			.getDescribeYourself()
			.select(this.testInputData.describeYourself);*/
		cy.get("#mailing-list-steps-name-degree-status-id-field").select(
			"Final year"
		);
		//cy.get('#mailing-list-steps-authenticate-timed-one-time-password-field')
		//mailingListSignUp.getDegreeStage().select(this.testInputData.degreeStage);
		//mailingListSignUp.getSubmitButton().click();
		mailingListSignUp.getNextStep().click();
		cy.enterEmailVerificationCodeForMailinglist();
		mailingListSignUp.getNextStep().click();
		cy.get(
			"#edit_mailing_list_steps_already_subscribed_already_subscribed > h1"
		)
			.should("exist")
			.should("have.text", "You’ve already signed up");
		/*mailingListSignUp
			.getStage()
			.select(this.testInputData.howCloseAreYoutoApplyingForTeacherTraining);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp
			.getSubjectToTeach()
			.select(this.testInputData.whichSubjectdoYouWantToTeach);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPostcode().clear();
		mailingListSignUp.getPostcode().type(this.testInputData.postCode);
		mailingListSignUp.getNextStep().click();
		mailingListSignUp.getPhone().clear();
		mailingListSignUp.getPhone().type(this.testInputData.phone);
		//mailingListSignUp.getMoreDetails().type(this.testInputData.moreDetail);
		cy.get("#mailing-list-steps-contact-accept-privacy-policy-1-field").click();
		mailingListSignUp.getCompleteSignUpButton().click();
		mailingListSignUp.getContent().should("have.text", "You've signed up");*/
	});

	it("It shows error message if user enters wrong email verification code", function () {
		let rnum = Math.floor(Math.random() * 100 + 1);
		let firstName = "Userfirstname_" + rnum;
		let lastName = "Userlastname_" + rnum;
		mailingListSignUp.getFirstName().type(firstName);
		mailingListSignUp.getLastName().type(lastName);
		mailingListSignUp.getEmailAddress().type(this.testInputData.emailAddress);

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
		cy.visit("/mailinglist/signup/name", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		mailingListSignUp.getFirstName().type(firstName);
		mailingListSignUp.getLastName().type(lastName);
		mailingListSignUp.getEmailAddress().type(this.testInputData.emailAddress);
		cy.get("#mailing-list-steps-name-degree-status-id-field").select(
			"Final year"
		);
		mailingListSignUp.getNextStep().click();
		cy.get(
			"#mailing-list-steps-authenticate-timed-one-time-password-field"
		).type("123456");
		mailingListSignUp.getNextStep().click();
		cy.get("#mailing-list-steps-authenticate-timed-one-time-password-error")
			.should("exist")
			.should(
				"have.text",
				"Error: Please enter the latest verification code sent to your email address"
			);
	});

	it("It resends the verification code to user's email", function () {
		let rnum = Math.floor(Math.random() * 100 + 1);
		let firstName = "Userfirstname_" + rnum;
		let lastName = "Userlastname_" + rnum;
		mailingListSignUp.getFirstName().type(firstName);
		mailingListSignUp.getLastName().type(lastName);
		mailingListSignUp.getEmailAddress().type(this.testInputData.emailAddress);
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
		cy.visit("/mailinglist/signup/name", {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		mailingListSignUp.getFirstName().type(firstName);
		mailingListSignUp.getLastName().type(lastName);
		mailingListSignUp.getEmailAddress().type(this.testInputData.emailAddress);

		cy.get("#mailing-list-steps-name-degree-status-id-field").select(
			"Final year"
		);

		mailingListSignUp.getNextStep().click();
		cy.get(
			"#mailing-list-steps-authenticate-timed-one-time-password-field"
		).type("123456");
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
		cy.get(
			"#edit_mailing_list_steps_already_subscribed_already_subscribed > h1"
		)
			.should("exist")
			.should("have.text", "You’ve already signed up");
	});

	it('It shows "You’ve signed up" message for new candidate', function () {
		mailingListSignUp.getFirstName().type(this.testInputData.firstName);
		mailingListSignUp.getLastName().type(this.testInputData.lastName);
		let rnum = Math.floor(Math.random() * 1000000 + 1);
		let email = "testuser" + rnum.toString() + "@mail.co.uk";
		//let email = "testuser@mailsac.com";
		mailingListSignUp.getEmailAddress().type(email);
		/*mailingListSignUp
			.getDescribeYourself()
			.select(this.testInputData.describeYourself);*/

		cy.get("#mailing-list-steps-name-degree-status-id-field").select(
			"Final year"
		);

		//cy.get('#mailing-list-steps-authenticate-timed-one-time-password-field')

		//mailingListSignUp.getDegreeStage().select(this.testInputData.degreeStage);
		//mailingListSignUp.getSubmitButton().click();

		mailingListSignUp.getNextStep().click();

		//cy.enterEmailVerificationCodeForMailinglist();
		//mailingListSignUp.getNextStep().click();

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
		//mailingListSignUp.getMoreDetails().type(this.testInputData.moreDetail);
		cy.get("#mailing-list-steps-contact-accept-privacy-policy-1-field").click();
		mailingListSignUp.getCompleteSignUpButton().click();
		mailingListSignUp.getContent().should("have.text", "You've signed up");
	});
});
