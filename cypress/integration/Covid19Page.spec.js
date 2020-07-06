import HomePage from "../support/PageObjectsMap/HomePage";
import Covid19Page from "../support/PageObjectsMap/Covid19Page";

describe("Get-into-teaching - Covid19 page", () => {
	const homePage = new HomePage();

	beforeEach(function () {
		cy.fixture("expectedTestData").then((expectedData) => {
			this.expectedData = expectedData;
		});
		cy.logintoApp();
		homePage.getCovidLink().click();
	});

	it("It shows the covid 19 page", function () {
		const covidPage = new Covid19Page();
		covidPage
			.getPageHeading()
			.should("exist")
			.should("have.text", this.expectedData.covidPageHeader);
		cy.shouldHavePageNavigation();
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});
});
