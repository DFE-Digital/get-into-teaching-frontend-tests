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

	it('Links through to "Find out how coronavirus is affecting teacher training"', () => {
		cy.contains("Find out how coronavirus is affecting teacher training").then((linkText) => {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", Navlinks.covid19);
				})
				.click();
		});
		cy.location("pathname").should("equal", Navlinks.covid19);
	});

	it('Links through to "Sign up for updates"', () => {
		homePage.getMailingStripButton().click();
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

	it('Links through to "International student" page', () => {
		homePage.getFundingyourTrainingLink().click();
		cy.get("a.button[href='" + Navlinks.internationalStudent + "']").click();
		cy.location("pathname").should("equal", Navlinks.internationalStudent);
	});

	it('Links through to "Assessment only providers"', () => {
		homePage.getWaystoTrainLink().click();
		cy.contains("a", "See assessment only").click();
		cy.location("pathname").should("equal", Navlinks.assessmentOnlyProviders);
	});
	it('Links through to "Become a teacher in england"', () => {
		homePage.getWaystoTrainLink().click();
		cy.contains("a", "get support to improve your subject knowledge").click();
		cy.location("pathname").should("equal", Navlinks.improveYourSubjectKnowledge);
	});
	it('Links through to "Train to teach events"', () => {
		homePage.getFindanEventNearYouLink().click();
		cy.contains("a", "Explore Train to Teach").click();
		cy.location("pathname").should("equal", Navlinks.trainToTeachEvents);
	});
	it('Links through to "Online Q&As"', () => {
		homePage.getFindanEventNearYouLink().click();
		cy.get("a.button[href='" + Navlinks.exploreOnlineQAs + "']").click();
		cy.location("pathname").should("equal", Navlinks.exploreOnlineQAs);
	});
	it('Links through to "School and university events"', () => {
		homePage.getFindanEventNearYouLink().click();
		cy.get("a.button[href='" + Navlinks.exploreSchoolAndUniversity + "']").click();
		cy.location("pathname").should("equal", Navlinks.exploreSchoolAndUniversity);
	});
});
