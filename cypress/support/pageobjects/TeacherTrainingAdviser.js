class TeacherTrainingAdviser {
	getFirstName() {
		return cy.get("#teacher-training-adviser-steps-identity-first-name-field");
	}
	getLastName() {
		return cy.get("#teacher-training-adviser-steps-identity-last-name-field");
	}
	getEmailAddress() {
		return cy.get("#teacher-training-adviser-steps-identity-email-field");
	}
	getContinueButton() {
		return cy.get(".govuk-button");
	}
}
export default TeacherTrainingAdviser;
