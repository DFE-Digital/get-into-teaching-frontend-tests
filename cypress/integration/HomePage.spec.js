/// <reference types="cypress" />
import HomePage from "../support/PageObjectsMap/HomePage";

describe("Get-into-teaching - Homepage", () => {
	beforeEach(() => {
		cy.logintoApp();
	});

	it("It shows the home page", () => {
		const homePage = new HomePage();
		homePage
			.getCovid()
			.should("exist")
			.should(
				"have.text",
				"\n        Coronavirus (COVID-19)\n        Whether you're currently training to be a teacher, ready to apply for teacher training or exploring teaching as a potential career, you may have questions about the impact of COVID-19.\n        Please check here for updates\n    "
			);
		homePage.getTeachingImage().should("exist");
		homePage.getHomeHyperLink().should("have.text", "Home");
		cy.contains("Funding your training").should("exist");
		cy.contains("Steps to become a teacher").should("exist");
		cy.contains("Teaching as a career").should("exist");
		cy.contains("Salaries and Benefits").should("exist");
		cy.contains("Find an event near you").should("exist");
		cy.get(".home-hero__mailing-strip__text")
			.should("exist")
			.should(
				"include.text",
				"Stay up-to-date with personalised information to help you get into teaching"
			)
			.siblings()
			.should("exist")
			.should("include.text", "Learn more");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Please check here for updates"', () => {
		cy.contains("Please check here for updates")
			.should((el) => {
				expect(el).to.have.attr("href", "/covid-19/index");
			})
			.click();
		cy.location("pathname").should("equal", "/covid-19/index");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Learn more"', () => {
		cy.get(".home-hero__mailing-strip__button__inner > p").click();
		cy.location("pathname").should("equal", "/mailinglist/register/1");
	});
});
