class Covid19Page {
	getPageHeading() {
		return cy.get(".content__left > :nth-child(1)");
	}
}
export default Covid19Page;
