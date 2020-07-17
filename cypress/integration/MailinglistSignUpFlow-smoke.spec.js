import MailingListSignUp from "../support/PageObjectsMap/MailingListSignUp";

describe("Get-into-teaching - Mailinglist registration flow", () => {
	const mailingListSignUp = new MailingListSignUp();

	beforeEach(function () {
		cy.fixture("mailingListSignUptestData.json").then((testInputData) => {
			this.testInputData = testInputData;
		});
		cy.visit("/mailinglist/signup/name", {
			auth: { username: "getintoteaching", password: "userneeds" },
		});
		cy.get(".cookie-acceptance__dialog > .call-to-action-button").click();
	});

	it("It shows the Sign up page", function () {
		cy.get("#edit_mailing_list_steps_name_name").should("exist");
	});

	it('It shows the "There is a problem"', function () {
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

	it.only("Error message link navigates to its respective field", function () {
		mailingListSignUp.getSubmitButton().click();

		cy.contains("Enter your full email address")
			.should((el) => {
				expect(el).to.have.attr(
					"href",
					"#mailing-list-steps-name-email-address-field-error"
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

	xit("It shows the You've signed up successfully", function () {
		mailingListSignUp.getFirstName().type(this.testInputData.firstName);
		mailingListSignUp.getLastName().type(this.testInputData.lastName);
		mailingListSignUp.getEmailAddress().type(this.testInputData.emailAddress);
		mailingListSignUp
			.getDescribeYourself()
			.select(this.testInputData.describeYourself);
		mailingListSignUp.getSubmitButton().click();
		mailingListSignUp.getDegreeStage().select(this.testInputData.degreeStage);
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
		mailingListSignUp.getMoreDetails().type(this.testInputData.moreDetail);
		mailingListSignUp.getInfoRequired().click();
		mailingListSignUp.getCompleteSignUpButton().click();
		mailingListSignUp.getContent().should("have.text", "You've signed up");
	});
});
