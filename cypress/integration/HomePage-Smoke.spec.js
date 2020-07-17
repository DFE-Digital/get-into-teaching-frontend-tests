/// <reference types="Cypress" />
import Homepage from "../support/pageobjects/Homepage";

describe("Get-into-teaching - Homepage - smoke tests", () => {
	const homePage = new Homepage();
	beforeEach(function () {
		cy.logintoApp();
	});

	it("It shows the home page", function () {
		homePage.getCovidMessage().should("exist");
		homePage.getTeachingImage().should("exist");
		homePage.getMailingStripText().should("exist").siblings().should("exist");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Funding your training"', () => {
		homePage.getFundingyourTrainingLink().then(function (linkText) {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", "/funding-your-training/index");
				})
				.click();
		});
		cy.location("pathname").should("equal", "/funding-your-training/index");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Steps to become a teacher"', () => {
		homePage.getStepstoBecomeTeacherLink().then(function (linkText) {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", "/steps-to-become-a-teacher/index");
				})
				.click();
		});
		cy.location("pathname").should("equal", "/steps-to-become-a-teacher/index");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Teaching as a career"', () => {
		homePage.getTeachingAsaCareerLink().then(function (linkText) {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", "/life-as-a-teacher/index");
				})
				.click();
		});
		cy.location("pathname").should("equal", "/life-as-a-teacher/index");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Salaries and benefits"', () => {
		homePage.getSalariesAndBenefitsLink().then(function (linkText) {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr(
						"href",
						"/life-as-a-teacher/teachers-salaries-and-benefits"
					);
				})
				.click();
		});
		cy.location("pathname").should(
			"equal",
			"/life-as-a-teacher/teachers-salaries-and-benefits"
		);
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Find an event near you"', () => {
		homePage.getFindanEventNearYouLink().then(function (linkText) {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", "/apievents");
				})
				.click();
		});
		cy.location("pathname").should("equal", "/apievents");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Please check here for updates"', () => {
		cy.get(".covid > a").then(function (linkText) {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", "/covid-19/index");
				})
				.click();
		});
		cy.location("pathname").should("equal", "/covid-19/index");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Learn more"', () => {
		homePage.getMailingStripButton().dblclick();
		cy.location("pathname").should("equal", "/mailinglist/signup");
	});
	it('Links through to "My story into teaching"', () => {
		homePage.getMyStoryInToTeaching().click();
		homePage.getContentVideo().click();
		homePage.getVideoContainer().should("exist");
		homePage.getVideoCloseIcon().click();
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});
	it('Links through to "Find events"', () => {
		homePage.getFindEventLink().click();
		cy.location("pathname").should("equal", "/apievents");
		homePage.getBannerText().should("exist");
		cy.shouldHavePageNavigation();
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});
	/*
	Below test meets the following creteria -
	 1. It should only open/expand the Check your qualifications link. 
	 2. Other than this, all link should be closed/not expanded. 
	*/
	it('Links through to "Check your qualifications"', () => {
		homePage.getCheckYourQualificationsLink().click();
		cy.location("pathname").should("equal", "/steps-to-become-a-teacher/index");
		homePage.getBannerText().should("exist");
		cy.get("#collapsable-icon-1").should(
			"have.attr",
			"class",
			"fas fa-chevron-up"
		);
		cy.get("#collapsable-icon-3").should(
			"have.attr",
			"class",
			"fas fa-chevron-down"
		);
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	/*
	Below test meets the following creteria -
	 1.It should only open/expand the "Ways to train" link and it's content should 
	 be visiable on top.
	 2.Other than this all link should be closed/not expand. Content of unexpanded 
	 link should not be visible.
	*/
	it('Links through to "Ways to train"', () => {
		homePage.getWaystoTrainLink().siblings().click();
		cy.location("pathname").should("equal", "/steps-to-become-a-teacher/index");
		homePage.getBannerText().should("exist");
		cy.get("#collapsable-icon-1").should(
			"have.attr",
			"class",
			"fas fa-chevron-down"
		);
		cy.get("#collapsable-icon-3").should(
			"have.attr",
			"class",
			"fas fa-chevron-up"
		);
		//cy.get("#collapsable-content-1 > :nth-child(1)").should("not.be.visible");
		//cy.get("#collapsable-content-2 > :nth-child(1)").should("not.be.visible");
		//cy.get("#collapsable-content-3 > :nth-child(1)").should("be.visible");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it("It doesn't show Postcode field if location is nationwide", () => {
		homePage.getFindEventLink().click();
		homePage.getEventLocation().select("Nationwide");
		homePage.getEventPostCode().should("be.disabled");
		homePage.getEventPostCode().should("not.be.visible");
	});

	it('It shows "Enter your postcode" message', () => {
		homePage.getFindEventLink().click();
		homePage.getEventLocation().select("Within 30 miles");
		homePage.getUpdateResultsButton().click();
		cy.get(".search-for-events__content__errors > div")
			.should("exist")
			.should("have.text", "Enter your postcode");
	});

	it('It shows "Enter a valid postcode" message', () => {
		homePage.getFindEventLink().click();
		homePage.getEventLocation().select("Within 30 miles");
		homePage.getEventPostCode().type("TF32BTP");
		homePage.getUpdateResultsButton().click();
		cy.get(".search-for-events__content__errors > div")
			.should("exist")
			.should("have.text", "Enter a valid postcode");
	});
	it("It matches the event date, time and location with previous page", () => {
		homePage.getFindEventLink().click();
		cy.get(
			":nth-child(2) > .events-featured__items > :nth-child(1) > .event-resultbox > .event-resultbox__datetime"
		)
			.should("exist")
			.then(function (dateAndTime) {
				cy.get(
					":nth-child(2) > .events-featured__items > :nth-child(1)"
				).click();

				cy.get(".event-resultboxshort__header > h1").should(
					"have.text",
					dateAndTime.text().trim()
				);
			});
	});
});
