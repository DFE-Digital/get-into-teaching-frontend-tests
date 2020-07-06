/// <reference types="Cypress" />
import HomePage from "../support/PageObjectsMap/HomePage";

describe("Get-into-teaching - Homepage", () => {
	const homePage = new HomePage();
	beforeEach(function () {
		cy.fixture("expectedTestData").then((expectedData) => {
			this.expectedData = expectedData;
		});
		cy.logintoApp();
	});

	it("It shows the home page", function () {
		homePage
			.getCovidMessage()
			.should("exist")
			.should("have.text", this.expectedData.covidMessage);
		homePage.getTeachingImage().should("exist");
		homePage
			.getHomeBannerText()
			.should("exist")
			.should("have.text", "Inspire the next generation")
			.next()
			.should("exist")
			.should(
				"have.text",
				"Get information and support to help you become a teacher"
			);

		homePage
			.getMailingStripText()
			.should("exist")
			.should("include.text", this.expectedData.mailingStripText)
			.siblings()
			.should("exist")
			.should("include.text", this.expectedData.mailingStripButtonText);
		cy.shouldHavePageNavigation();
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
		cy.shouldHavePageNavigation();
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Learn more"', () => {
		homePage.getMailingStripButton().dblclick();
		cy.location("pathname").should("equal", "/mailinglist/register/1");
	});
	it('Links through to "My story into teaching"', () => {
		homePage.getMyStoryInToTeaching().click();
		homePage.getBannerText().should("have.text", "My story into teaching");
		homePage.getContentVideo().click();
		homePage.getVideoContainer().should("exist");
		homePage.getVideoCloseIcon().click();
		cy.shouldHavePageNavigation();
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});
	it('Links through to "Find events"', () => {
		cy.contains("Find events")
			.should((el) => {
				expect(el).to.have.attr("href", "./events");
			})
			.click();
		cy.location("pathname").should("equal", "/events");
		homePage
			.getBannerText()
			.should("exist")
			.should("have.text", "Find an event near you");
		cy.shouldHavePageNavigation();
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});
	it('Links through to "Check your qualifications"', () => {
		cy.contains("Check your")
			.should((el) => {
				expect(el).to.have.attr(
					"href",
					"/steps-to-become-a-teacher/index#step-1"
				);
			})
			.click();
		cy.location("pathname").should("equal", "/steps-to-become-a-teacher/index");
		homePage
			.getBannerText()
			.should("exist")
			.should("have.text", "Steps to become a teacher");
		cy.shouldHavePageNavigation();
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});
});
