/// <reference types="cypress" />
import HomePage from "../support/PageObjectsMap/HomePage";
import Covid19Page from "../support/PageObjectsMap/Covid19Page";

describe("Get-into-teaching - Covid19 page", () => {
	const homePage = new HomePage();
	beforeEach(() => {
		cy.logintoApp();
		homePage.getCovidLink().click();
	});

	it("It shows the covid 19 page", () => {
		const covidPage = new Covid19Page();
		covidPage
			.getPageHeading()
			.should("exist")
			.should("have.text", "Impact of COVID-19 on teacher training");
		cy.contains("Home").should("exist");
		cy.contains("Funding your training").should("exist");
		cy.contains("Steps to become a teacher").should("exist");
		cy.contains("Teaching as a career").should("exist");
		cy.contains("Salaries and Benefits").should("exist");
		cy.contains("Find an event near you").should("exist");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});
});
