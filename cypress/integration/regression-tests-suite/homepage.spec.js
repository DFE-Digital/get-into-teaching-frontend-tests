/// <reference types='Cypress' />
import Homepage from "../../support/pageobjects/Homepage";
import Navlinks from "../../support/pageobjects/Navlinks";

describe(`Home page tests : Tests execution date and time : ${new Date()}`, () => {
	const homePage = new Homepage();
	beforeEach(() => {
		cy.logintoApp();
	});

	it("It shows the home page", () => {
		homePage.getTeachingImage().should("exist");
		homePage.getMailingStripText().should("exist");
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
	});

	it('Links through to "Sign up here"', () => {
		homePage.getMailingStripButton().dblclick();
		cy.location("pathname").should("equal", Navlinks.mailingListSignup);
	});

	it('Links through to "My story into teaching"', () => {
		homePage.getMyStoryInToTeaching().click();
		cy.location("pathname").should("equal", Navlinks.myStoryIntoTeaching);
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
	});

	it('Links through to "Check your qualifications"', () => {
		homePage.getCheckYourQualificationsLink().click();
		cy.location("pathname").should("equal", Navlinks.stepsToBecomeATeacher);
	});

	it('Links through to "Ways to train"', () => {
		homePage.getWaystoTrainLink().click();
		cy.location("pathname").should("equal", Navlinks.waysToTrain);
	});
});
