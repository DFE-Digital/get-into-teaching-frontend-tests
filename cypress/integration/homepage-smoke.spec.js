/// <reference types='Cypress' />
import Homepage from "../support/pageobjects/Homepage";
import Navlinks from "../support/pageobjects/Navlinks";

function terminalLog(violations) {
	cy.task(
		"log",
		`${violations.length} accessibility violation${violations.length === 1 ? "" : "s"} ${
			violations.length === 1 ? "was" : "were"
		} detected`
	);
	const violationData = violations.map(({ id, impact, description, nodes }) => ({
		id,
		impact,
		description,
		nodes: nodes.length,
	}));
	cy.task("table", violationData);
}

describe(`Home page tests : Tests execution date and time : ${new Date()}`, () => {
	const homePage = new Homepage();
	beforeEach(() => {
		cy.logintoApp();
	});

	it("It shows the home page", () => {
		homePage.getCovidMessage().should("exist");
		homePage.getTeachingImage().should("exist");
		homePage.getMailingStripText().should("exist");
		homePage.getMailingStripText().siblings().should("exist");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Funding your training"', () => {
		homePage.getFundingyourTrainingLink().then((linkText) => {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", Navlinks.fundingYourTraining);
				})
				.click();
		});
		cy.location("pathname").should("equal", Navlinks.fundingYourTraining);
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Steps to become a teacher"', () => {
		homePage.getStepstoBecomeTeacherLink().then((linkText) => {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", Navlinks.stepsToBecomeATeacher);
				})
				.click();
		});
		cy.location("pathname").should("equal", Navlinks.stepsToBecomeATeacher);
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Teaching as a career"', () => {
		homePage.getTeachingAsaCareerLink().then((linkText) => {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", Navlinks.lifeAsATeacher);
				})
				.click();
		});
		cy.location("pathname").should("equal", Navlinks.lifeAsATeacher);
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Salaries and benefits"', () => {
		homePage.getSalariesAndBenefitsLink().then((linkText) => {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", Navlinks.salariesAndBenefits);
				})
				.click();
		});
		cy.location("pathname").should("equal", Navlinks.salariesAndBenefits);
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Find an event near you"', () => {
		homePage.getFindanEventNearYouLink().then((linkText) => {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", Navlinks.events);
				})
				.click();
		});
		cy.location("pathname").should("equal", Navlinks.events);
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Please check here for updates"', () => {
		cy.contains("Please check here for updates").then((linkText) => {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", Navlinks.covid19);
				})
				.click();
		});
		cy.location("pathname").should("equal", Navlinks.covid19);
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('It hides the COVID-19 message if user clicks on "Hide this message" link', () => {
		cy.contains("Hide this message").as("link").should("be.visible");
		cy.get(".covid").as("covidMessage").should("be.visible");
		cy.get("@link").click();
		cy.get("@link").should("not.be.visible");
		cy.get("@covidMessage").should("not.be.visible");
	});

	it('Links through to "Sign up here"', () => {
		homePage.getMailingStripButton().dblclick();
		cy.location("pathname").should("equal", Navlinks.mailingListSignup);
	});

	it('Links through to "My story into teaching"', () => {
		homePage.getMyStoryInToTeaching().click();
		cy.location("pathname").should("equal", Navlinks.myStoryIntoTeaching);
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "career-changers stories"', () => {
		homePage.getMyStoryInToTeaching().click();
		cy.contains("a", "Read all stories about changing career").click();
		cy.location("pathname").should("equal", Navlinks.careerChangers);
	});

	it('Links through to "international-career-changers"', () => {
		homePage.getMyStoryInToTeaching().click();
		cy.contains("a", "Read all stories about international returning teachers").click();
		cy.location("pathname").should("equal", Navlinks.internationalCareerChangers);
	});

	it('Links through to "teacher-training-stories"', () => {
		homePage.getMyStoryInToTeaching().click();
		cy.contains("a", "Read all stories about teacher training").click();
		cy.location("pathname").should("equal", Navlinks.teacherTrainingStories);
	});

	it('Links through to "making-a-difference"', () => {
		homePage.getMyStoryInToTeaching().click();
		cy.contains("a", "Read all stories about making a difference").click();
		cy.location("pathname").should("equal", Navlinks.makingADifference);
	});

	it('Links through to "career-progression"', () => {
		homePage.getMyStoryInToTeaching().click();
		cy.contains("a", "Read all stories about career progression").click();
		cy.location("pathname").should("equal", Navlinks.careerProgression);
	});

	it('Links through to "returning to teaching"', () => {
		homePage.getMyStoryInToTeaching().click();
		cy.contains("a", "Read all stories about returning to teaching").click();
		cy.location("pathname").should("equal", Navlinks.returners);
	});

	it('Links through to "Find events"', () => {
		homePage.getFindEventLink().click();
		cy.location("pathname").should("equal", Navlinks.events);
		homePage.getBannerText().should("exist").should("have.text", "Find an event near you");
		cy.shouldHavePageNavigation();
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Check your qualifications"', () => {
		homePage.getCheckYourQualificationsLink().click();
		cy.location("pathname").should("equal", Navlinks.stepsToBecomeATeacher);
		homePage.getBannerText().should("exist");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('Links through to "Ways to train"', () => {
		homePage.getWaystoTrainLink().siblings().click();
		cy.location("pathname").should("equal", Navlinks.stepsToBecomeATeacher);
		homePage.getBannerText().should("exist");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it("Links through to facebook page", () => {
		homePage.getSocialMediaLink(0).invoke("removeAttr", "target").click();
		cy.url().then((url) => {
			expect(url).equal(Navlinks.facebook);
		});
	});
	it("Links through to instagram page", () => {
		homePage.getSocialMediaLink(1).invoke("removeAttr", "target").click();
		cy.url().then((url) => {
			expect(url).contains(Navlinks.instagram);
		});
	});
	it("Links through to linkedin page", () => {
		homePage.getSocialMediaLink(2).invoke("removeAttr", "target").click();
		cy.url().then((url) => {
			expect(url).contains(Navlinks.linkedin);
		});
	});

	it("Links through to twitter page", () => {
		homePage.getSocialMediaLink(3).invoke("removeAttr", "target").click();
		cy.url().then((url) => {
			expect(url).equal(Navlinks.twitter);
		});
	});
	it("Links through to youtube page", () => {
		homePage.getSocialMediaLink(4).invoke("removeAttr", "target").click();
		cy.url().then((url) => {
			expect(url).equal(Navlinks.youtube);
		});
	});

	it("Has no detectable a11y violations on load (filtering to only include critical impact violations)", () => {
		// Test on initial load, only report and assert for critical impact items
		cy.checkA11y(null, {
			includedImpacts: ["critical"],
		});
	});
});

describe(`Feature - 404 Not Found unknown_route : ${new Date()}`, () => {
	it('It should show "404	Not Found unknown_route" if the user enters a bad URL', () => {
		cy.visit({
			url: "https://get-into-teaching-apps-test.london.cloudapps.digital/",
			method: "GET",
			failOnStatusCode: false,
		});
		cy.verify404ErrorMessage();
	});
});
