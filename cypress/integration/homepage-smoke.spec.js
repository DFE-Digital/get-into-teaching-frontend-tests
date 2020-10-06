/// <reference types="Cypress" />
import Homepage from "../support/pageobjects/Homepage";

function terminalLog(violations) {
	cy.task(
		"log",
		`${violations.length} accessibility violation${
			violations.length === 1 ? "" : "s"
		} ${violations.length === 1 ? "was" : "were"} detected`
	);
	const violationData = violations.map(
		({ id, impact, description, nodes }) => ({
			id,
			impact,
			description,
			nodes: nodes.length,
		})
	);
	cy.task("table", violationData);
}

describe(
	`Home page tests : Tests execution date and time : ${new Date()}`,
	() => {
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
						expect(el).to.have.attr("href", "/funding-your-training");
					})
					.click();
			});
			cy.location("pathname").should("equal", "/funding-your-training");
			cy.shouldHaveTalkToUsSection();
			cy.shouldHaveFooter();
		});

		it('Links through to "Steps to become a teacher"', () => {
			homePage.getStepstoBecomeTeacherLink().then(function (linkText) {
				cy.contains(linkText.text())
					.should((el) => {
						expect(el).to.have.attr("href", "/steps-to-become-a-teacher");
					})
					.click();
			});
			cy.location("pathname").should("equal", "/steps-to-become-a-teacher");
			cy.shouldHaveTalkToUsSection();
			cy.shouldHaveFooter();
		});

		it('Links through to "Teaching as a career"', () => {
			homePage.getTeachingAsaCareerLink().then(function (linkText) {
				cy.contains(linkText.text())
					.should((el) => {
						expect(el).to.have.attr("href", "/life-as-a-teacher");
					})
					.click();
			});
			cy.location("pathname").should("equal", "/life-as-a-teacher");
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
						expect(el).to.have.attr("href", "/events");
					})
					.click();
			});
			cy.location("pathname").should("equal", "/events");
			cy.shouldHaveTalkToUsSection();
			cy.shouldHaveFooter();
		});

		it('Links through to "Please check here for updates"', () => {
			cy.contains("Please check here for updates").then(function (linkText) {
				cy.contains(linkText.text())
					.should((el) => {
						expect(el).to.have.attr("href", "/covid-19");
					})
					.click();
			});
			cy.location("pathname").should("equal", "/covid-19");
			cy.shouldHaveTalkToUsSection();
			cy.shouldHaveFooter();
		});

		it('Links through to "Sign up here"', () => {
			homePage.getMailingStripButton().dblclick();
			cy.location("pathname").should("equal", "/mailinglist/signup");
		});
		it('Links through to "My story into teaching"', () => {
			homePage.getMyStoryInToTeaching().click();
			cy.location("pathname").should(
				"equal",
				"/life-as-a-teacher/my-story-into-teaching"
			);
			cy.shouldHaveTalkToUsSection();
			cy.shouldHaveFooter();
		});
		it('Links through to "career-changers stories"', () => {
			homePage.getMyStoryInToTeaching().click();
			cy.get(":nth-child(3) > .content__left > .call-to-action-button").click();
			cy.location("pathname").should(
				"equal",
				"/life-as-a-teacher/my-story-into-teaching/career-changers"
			);
		});

		it('Links through to "international-career-changers"', () => {
			homePage.getMyStoryInToTeaching().click();
			cy.get(":nth-child(6) > .content__left > .call-to-action-button").click();
			cy.location("pathname").should(
				"equal",
				"/life-as-a-teacher/my-story-into-teaching/international-career-changers"
			);
		});

		it('Links through to "teacher-training-stories"', () => {
			homePage.getMyStoryInToTeaching().click();
			cy.get(":nth-child(9) > .content__left > .call-to-action-button").click();
			cy.location("pathname").should(
				"equal",
				"/life-as-a-teacher/my-story-into-teaching/teacher-training-stories"
			);
		});
		it('Links through to "making-a-difference"', () => {
			homePage.getMyStoryInToTeaching().click();
			cy.get(
				":nth-child(12) > .content__left > .call-to-action-button"
			).click();
			cy.location("pathname").should(
				"equal",
				"/life-as-a-teacher/my-story-into-teaching/making-a-difference"
			);
		});

		it('Links through to "career-progression"', () => {
			homePage.getMyStoryInToTeaching().click();
			cy.get(
				":nth-child(15) > .content__left > .call-to-action-button"
			).click();
			cy.location("pathname").should(
				"equal",
				"/life-as-a-teacher/my-story-into-teaching/career-progression"
			);
		});
		it('Links through to "returning to teaching"', () => {
			homePage.getMyStoryInToTeaching().click();
			cy.get(
				":nth-child(18) > .content__left > .call-to-action-button"
			).click();
			cy.location("pathname").should(
				"equal",
				"/life-as-a-teacher/my-story-into-teaching/returners"
			);
		});

		it('Links through to "Find events"', () => {
			homePage.getFindEventLink().click();
			cy.location("pathname").should("equal", "/events");
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
			cy.location("pathname").should("equal", "/steps-to-become-a-teacher");
			homePage.getBannerText().should("exist");
			//Below property has been removed
			/*cy.get("#collapsable-icon-1").should(
			"have.attr",
			"class",
			"fas fa-chevron-up"
		);
		cy.get("#collapsable-icon-3").should(
			"have.attr",
			"class",
			"fas fa-chevron-down"
		);*/
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
			cy.location("pathname").should("equal", "/steps-to-become-a-teacher");
			homePage.getBannerText().should("exist");
			//Below property has been removed
			/*cy.get("#collapsable-icon-1").should(
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
		cy.get("#collapsable-content-3 > :nth-child(1)").should("be.visible");*/
			cy.shouldHaveTalkToUsSection();
			cy.shouldHaveFooter();
		});

		it.skip("It matches the event date, time and location with previous page", () => {
			var eventDate;
			var eventTime;
			homePage.getFindEventLink().click();
			cy.get("#events_search_month").select("October 2020");
			cy.get(".request-button").click();
			cy.get(".event-resultbox__header")
				.as("1steventName")
				.should("exist")
				.eq(0)
				.then(function (eventName) {
					cy.log("Event Name : " + eventName.text());
					cy.get("@1steventName")
						.siblings()
						.eq(0)
						.then(function (eventDateandTime) {
							cy.log("Event date and Time : " + eventDateandTime.text());
							var a = eventDateandTime.text().split(",");
							eventDate = a[0];
							eventTime = a[1].replace("at", "");
							cy.get("@1steventName").eq(0).click();
							cy.get(".hero__banner__text > h1").should(
								"contain.text",
								eventName.text().trim()
							);
						});
				});

			cy.get(".event-resultboxshort__header > h2").then(function (
				eventDateandTimeonNextPage
			) {
				cy.log(eventDateandTimeonNextPage.text());
				var a = eventDateandTimeonNextPage.text().split(",");
				expect(eventDate.trim()).to.equal(a[0].trim());
				expect(eventTime.trim()).to.equal(a[1].trim());
			});
		});

		// Basic usage
		/*it.skip("Has no detectable a11y violations on load", () => {
		// Test the page at initial load
		cy.checkA11y();
	});*/

		it("Has no detectable a11y violations on load (filtering to only include critical impact violations)", () => {
			// Test on initial load, only report and assert for critical impact items
			cy.checkA11y(null, {
				includedImpacts: ["critical"],
			});
		});

		/*it.skip("Logs violations to the terminal", () => {
		cy.checkA11y(null, null, terminalLog);
	});*/
	}
);
