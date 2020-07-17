/// <reference types="Cypress" />
import HomePage from "../support/PageObjectsMap/HomePage";

describe("Get-into-teaching - Homepage - Smoke Tests", () => {
	const homePage = new HomePage();
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
		cy.get(":nth-child(1) > ul > :nth-child(2) > a").then(function (linkText) {
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
		cy.get(":nth-child(1) > ul > :nth-child(1) > a").then(function (linkText) {
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
		cy.get(".navbar__desktop > :nth-child(2) > ul > :nth-child(4) > a").then(
			function (linkText) {
				cy.contains(linkText.text())
					.should((el) => {
						expect(el).to.have.attr("href", "/life-as-a-teacher/index");
					})
					.click();
			}
		);
		cy.location("pathname").should("equal", "/life-as-a-teacher/index");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Salaries and benefits"', () => {
		cy.get(".navbar__desktop > :nth-child(2) > ul > :nth-child(3) > a").then(
			function (linkText) {
				cy.contains(linkText.text())
					.should((el) => {
						expect(el).to.have.attr(
							"href",
							"/life-as-a-teacher/teachers-salaries-and-benefits"
						);
					})
					.click();
			}
		);
		cy.location("pathname").should(
			"equal",
			"/life-as-a-teacher/teachers-salaries-and-benefits"
		);
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Find an event near you"', () => {
		cy.get(".navbar__desktop > :nth-child(2) > ul > :nth-child(2) > a").then(
			function (linkText) {
				cy.contains(linkText.text())
					.should((el) => {
						expect(el).to.have.attr("href", "/apievents");
					})
					.click();
			}
		);
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
		cy.get("div.find-an-event__right p:nth-child(3) > a.git-link").click();
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
		cy.get(":nth-child(1) > .steps__link > :nth-child(1)").click();
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
		cy.get(":nth-child(3) > .steps__number").siblings().click();
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
		cy.get("#collapsable-content-1 > :nth-child(1)").should("not.be.visible");
		cy.get("#collapsable-content-2 > :nth-child(1)").should("not.be.visible");
		cy.get("#collapsable-content-3 > :nth-child(1)").should("be.visible");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('It shows "Enter your postcode" message', () => {
		cy.get("div.find-an-event__right p:nth-child(3) > a.git-link").click();
		cy.get(".request-button").click();
		cy.get(".search-for-events__content__errors > div")
			.should("exist")
			.should("have.text", "Enter your postcode");
	});

	it('It shows "Enter a valid postcode" message', () => {
		cy.get("div.find-an-event__right p:nth-child(3) > a.git-link").click();
		cy.get("#events_search_postcode").type("TF32BTP");
		cy.get(".request-button").click();
		cy.get(".search-for-events__content__errors > div")
			.should("exist")
			.should("have.text", "Enter a valid postcode");
	});
	it("It matches the event date, time and location with previous page", () => {
		cy.get("div.find-an-event__right p:nth-child(3) > a.git-link").click();
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
