class HomePage {
	getCovid() {
		return cy.get(".covid");
	}
	getCovidLink() {
		return cy.get(".covid > a");
	}
	getTeachingImage() {
		return cy.get("a > img");
	}
	getHomeHyperLink() {
		return cy.get(":nth-child(1) > ul > :nth-child(3) > a");
	}
}
export default HomePage;
