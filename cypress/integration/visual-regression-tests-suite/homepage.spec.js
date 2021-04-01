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
		homePage.getFundingyourTrainingLink().click();
		cy.percySnapshot();
	});

	it('Verify "Steps to become a teacher" page visuals', () => {
		homePage.getStepstoBecomeTeacherLink().click();
		cy.percySnapshot();
	});

	it('Verify "Salaries and benefits" page visuals', () => {
		homePage.getSalariesAndBenefitsLink().click();
		cy.percySnapshot();
	});

	it('Verify "Find an event near you" page visuals', () => {
		homePage.getFindanEventNearYouLink().click();
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

	/*it('Verify "Financial support for teacher training" page visuals', () => {
		homePage.getFundingyourTrainingLink().click();
		cy.contains("Financial support for teacher").click();
		cy.percySnapshot();
	});*/
	it('Verify "International candidates" page visuals', () => {
		homePage.getFundingyourTrainingLink().click();
		cy.get("a.button[href='" + Navlinks.internationalCandidates + "']").click();
		cy.percySnapshot();
	});

	it('Verify "Assessment only providers" page visuals', () => {
		homePage.getWaystoTrainLink().click();
		cy.contains("a", "See Assessment Only ").click();
		cy.percySnapshot();
	});
	it('Verify "Become a teacher in england" page visuals', () => {
		homePage.getWaystoTrainLink().click();
		cy.contains("a", "Find out about other ways to ").click();
		cy.percySnapshot();
	});
	it('Verify "Train to teach events" page visuals', () => {
		homePage.getFindanEventNearYouLink().click();
		cy.contains("a", "Explore Train to Teach").click();
		cy.percySnapshot();
	});
	it('Verify "Online Q&As" page visuals', () => {
		homePage.getFindanEventNearYouLink().click();
		cy.get("a.button[href='" + Navlinks.exploreOnlineQAs + "']").click();
		cy.percySnapshot();
	});
	it('Verify "School and university events" page visuals', () => {
		homePage.getFindanEventNearYouLink().click();
		cy.get("a.button[href='" + Navlinks.exploreSchoolAndUniversity + "']").click();
		cy.percySnapshot();
	});
});
