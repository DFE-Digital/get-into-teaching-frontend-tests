class MailinglistSignupPage {
	getSubjectToTeach() {
		return cy.get("#mailing-list-steps-subject-preferred-teaching-subject-id-field");
	}
	getPostcode() {
		return cy.get("#mailing-list-steps-postcode-address-postcode-field");
	}
	getCompleteSignUpButton() {
		return cy.contains("Complete sign up");
	}
}
export default MailinglistSignupPage;
