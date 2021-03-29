/// <reference types='Cypress' />
import Homepage from "../../support/pageobjects/Homepage";
import Navlinks from "../../support/pageobjects/Navlinks";

describe(`Home page visual tests : Tests execution date and time : ${new Date()}`, () => {
	const homePage = new Homepage();
	beforeEach(() => {
		cy.logintoApp();
	});

	it('Verify "Home" page visuals', () => {
		cy.percySnapshot();
	});

	it('Verify "Funding your training" page visuals', () => {
		homePage.getFundingyourTrainingLink().then((linkText) => {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", Navlinks.fundingYourTraining);
				})
				.click();
		});
		cy.percySnapshot();
	});

	it('Verify "Steps to become a teacher" page visuals', () => {
		homePage.getStepstoBecomeTeacherLink().then((linkText) => {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", Navlinks.stepsToBecomeATeacher);
				})
				.click();
		});
		cy.percySnapshot();
	});

	it('Verify "Salaries and benefits" page visuals', () => {
		homePage.getSalariesAndBenefitsLink().then((linkText) => {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", Navlinks.salariesAndBenefits);
				})
				.click();
		});
		cy.percySnapshot();
	});

	it('Verify "Find an event near you" page visuals', () => {
		homePage.getFindanEventNearYouLink().then((linkText) => {
			cy.contains(linkText.text())
				.should((el) => {
					expect(el).to.have.attr("href", Navlinks.events);
				})
				.click();
		});
		cy.percySnapshot();
	});

	it('Verify "My story into teaching" page visuals', () => {
		homePage.getMyStoryInToTeaching().click();
		cy.percySnapshot();
	});

	it('Verify "career-changers stories" page visuals', () => {
		homePage.getMyStoryInToTeaching().click();
		cy.contains("a", "Read all stories about changing career").click();
		cy.percySnapshot();
	});

	it('Verify "Ways to train" page visuals', () => {
		homePage.getWaystoTrainLink().click();
		cy.percySnapshot();
	});
});
