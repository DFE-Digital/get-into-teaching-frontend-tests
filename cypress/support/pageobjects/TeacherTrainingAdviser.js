class TeacherTrainingAdviser {
	getFirstName() {
		return cy.get("#identity-first-name-field");
	}
	getLastName() {
		return cy.get("#identity-last-name-field");
	}
	getEmailAddress() {
		return cy.get("#identity-email-field");
	}
	getContinueButton() {
		return cy.get(".govuk-button");
	}
}
export default TeacherTrainingAdviser;
