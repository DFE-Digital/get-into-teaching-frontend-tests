/// <reference types='Cypress' />
import Homepage from "../../support/pageobjects/Homepage";
describe(`Home page visual tests : Tests execution date and time : ${new Date()}`, () => {
	const homePage = new Homepage();
	it('Verify "A day in the life of a teacher" page visuals', () => {
		cy.navigateToPage("/a-day-in-the-life-of-a-teacher");
		cy.takeScreenshot("a-day-in-the-life-of-a-teacher");
	});
	it('Verify "Accessibility information" page visuals', () => {
		cy.navigateToPage("/accessibility");
		cy.takeScreenshot("accessibility");
	});
	it('Verify "Providers of the Assessment Only" page visuals', () => {
		cy.navigateToPage("/assessment-only-providers");
		cy.takeScreenshot("assessment-only-providers");
	});
	it('Verify "Impact of COVID-19 on teacher training" page visuals', () => {
		cy.navigateToPage("/covid-19");
		cy.takeScreenshot("covid-19");
	});
	it('Verify "Early years teacher training" page visuals', () => {
		cy.navigateToPage("/early-years-teaching-training");
		cy.takeScreenshot("early-years-teaching-training");
	});
	it('Verify "Funding your training" page visuals', () => {
		cy.navigateToPage("/funding-your-training");
		cy.takeScreenshot("funding-your-training");
	});
	it('Verify "Further education teacher training" page visuals', () => {
		cy.navigateToPage("/further-education-teacher-training");
		cy.takeScreenshot("further-education-teacher-training");
	});
	it('Verify "Become a teacher in England" page visuals', () => {
		cy.navigateToPage("/guidance/become-a-teacher-in-england");
		cy.takeScreenshot("become-a-teacher-in-england");
	});
	it('Verify "UK government financial support for international applicants" page visuals', () => {
		cy.navigateToPage("/guidance/financial-support-for-international-applicants");
		cy.takeScreenshot("financial-support-for-international-applicants");
	});
	it('Verify "Financial support for teacher training" page visuals', () => {
		cy.navigateToPage("/guidance/financial-support-for-teacher-training");
		cy.takeScreenshot("financial-support-for-teacher-training");
	});
	it('Verify "International teachers and trainees" page visuals', () => {
		cy.navigateToPage("/international-candidates");
		cy.takeScreenshot("international-candidates");
	});
	it('Verify "Return to teaching from overseas" page visuals', () => {
		cy.navigateToPage("/international-returners");
		cy.takeScreenshot("international-returners");
	});
	it('Verify "Becoming a mum sparked my interest in teaching" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/becoming-a-mum-sparked-my-interest-in-teaching");
		cy.takeScreenshot("becoming-a-mum-sparked-my-interest-in-teaching");
	});
	it('Verify "Financiers future in maths" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/financiers-future-in-maths");
		cy.takeScreenshot("financiers-future-in-maths");
	});
	it('Verify "From construction site to classroom" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/from-construction-site-to-classroom");
		cy.takeScreenshot("from-construction-site-to-classroom");
	});
	it('Verify "From developing software to developing students" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/from-developing-software-to-developing-students");
		cy.takeScreenshot("from-developing-software-to-developing-students");
	});
	it('Verify "Make a difference to young people" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/make-a-difference-to-young-people");
		cy.takeScreenshot("make-a-difference-to-young-people");
	});
	it('Verify "Natural transition from engineering to teaching physics" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/natural-transition-from-engineering-to-teaching-physics");
		cy.takeScreenshot("natural-transition-from-engineering-to-teaching-physics");
	});
	it('Verify "Passing on my knowledge" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/passing-on-my-knowledge");
		cy.takeScreenshot("passing-on-my-knowledge");
	});
	it('Verify "Police officer to PE teacher" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/police-officer-to-pe-teacher");
		cy.takeScreenshot("police-officer-to-pe-teacher");
	});
	it('Verify "Royal Marine Commando to geography teacher" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/royal-marine-commando-to-geography-teacher");
		cy.takeScreenshot("royal-marine-commando-to-geography-teacher");
	});
	it('Verify "School experience helped me decide to switch" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/school-experience-helped-me-decide-to-switch");
		cy.takeScreenshot("school-experience-helped-me-decide-to-switch");
	});
	it('Verify "Swapping senior management for students" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/swapping-senior-management-for-students");
		cy.takeScreenshot("swapping-senior-management-for-students");
	});
	it('Verify "Teaching gave me purpose" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/teaching-gave-me-purpose");
		cy.takeScreenshot("teaching-gave-me-purpose");
	});
	it('Verify "Transferring my skills to teaching" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/transferring-my-skills-to-teaching");
		cy.takeScreenshot("transferring-my-skills-to-teaching");
	});
	it('Verify "Career changers stories" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers");
		cy.takeScreenshot("career-changers");
	});
	it('Verify "Grasp every opportunity - you will progress" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/grasp-every-opportunity");
		cy.takeScreenshot("grasp-every-opportunity");
	});
	it('Verify "Lawyer to assistant headteacher" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/lawyer-to-assistant-teacher");
		cy.takeScreenshot("lawyer-to-assistant-teacher");
	});
	it('Verify "Leaping to head of department" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/leaping-to-head-of-department");
		cy.takeScreenshot("leaping-to-head-of-department");
	});
	it('Verify "From newly qualified teacher to head of faculty in 5 years" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/newly-qualified-to-head-of-faculty");
		cy.takeScreenshot("newly-qualified-to-head-of-faculty");
	});
	it('Verify "From NQT to head of biology in 2 years" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/nqt-to-head-of-biology");
		cy.takeScreenshot("nqt-to-head-of-biology");
	});
	it('Verify "One year from Post Grad to head of department" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/one-year-from-post-grad-to-hod");
		cy.takeScreenshot("one-year-from-post-grad-to-hod");
	});
	it('Verify "Career progression stories" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression");
		cy.takeScreenshot("career-progression");
	});
	it('Verify "Returning to teaching with international experience" page visuals', () => {
		cy.navigateToPage(
			"/my-story-into-teaching/international-career-changers/returning-to-teaching-with-international-experience"
		);
		cy.takeScreenshot("returning-to-teaching-with-international-experience");
	});
	it('Verify "Returning to teaching with support from an adviser" page visuals', () => {
		cy.navigateToPage(
			"/my-story-into-teaching/international-career-changers/returning-to-teaching-with-support-from-an-adviser"
		);
		cy.takeScreenshot("returning-to-teaching-with-support-from-an-adviser");
	});
	it('Verify "International career changers" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/international-career-changers");
		cy.takeScreenshot("international-career-changers");
	});
	it('Verify "Broadening horizons through travelling and teaching" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/broadening-horizons-through-travelling-and-teaching");
		cy.takeScreenshot("broadening-horizons-through-travelling-and-teaching");
	});
	it('Verify "Getting our geek on - kids coding" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/getting-our-geek-on-kids-coding");
		cy.takeScreenshot("getting-our-geek-on-kids-coding");
	});
	it('Verify "Going back and giving back" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/going-back-and-giving-back");
		cy.takeScreenshot("going-back-and-giving-back");
	});
	it('Verify "Inspiring our young entrepreneurs" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/inspiring-our-young-entrepreneurs");
		cy.takeScreenshot("inspiring-our-young-entrepreneurs");
	});
	it('Verify "No two days are the same" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/no-two-days-are-the-same");
		cy.takeScreenshot("no-two-days-are-the-same");
	});
	it('Verify "Turning a tough lesson into a success" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/turning-a-tough-lesson-into-success");
		cy.takeScreenshot("turning-a-tough-lesson-into-success");
	});
	it('Verify "Making a difference" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference");
		cy.takeScreenshot("making-a-difference");
	});
	it('Verify "Getting back into the classroom" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/returners/getting-back-into-the-classroom");
		cy.takeScreenshot("getting-back-into-the-classroom");
	});
	it('Verify "Top tips for returning teachers" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/returners/top-tips-for-returning-teachers");
		cy.takeScreenshot("top-tips-for-returning-teachers");
	});
	it('Verify "Be a teacher again" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/returners");
		cy.takeScreenshot("returners");
	});
	it('Verify "Banker turned teacher" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/teacher-training-stories/banker-turned-teacher");
		cy.takeScreenshot("banker-turned-teacher");
	});
	it('Verify "Salaried teacher training: classroom learning" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/teacher-training-stories/salaried-teacher-training-classroom-learning");
		cy.takeScreenshot("salaried-teacher-training-classroom-learning");
	});
	it('Verify "Teacher training" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/teacher-training-stories/teacher-training-its-worth-it");
		cy.takeScreenshot("teacher-training-its-worth-it");
	});
	it('Verify "Why dont you teach" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/teacher-training-stories/why-dont-you-teach-miss");
		cy.takeScreenshot("why-dont-you-teach-miss");
	});
	it('Verify "Teacher training stories" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/teacher-training-stories");
		cy.takeScreenshot("teacher-training-stories");
	});
	it('Verify "My story into teaching" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching");
		cy.takeScreenshot("my-story-into-teaching");
	});
	it('Verify "Train to Teach events - Presentations" page visuals', () => {
		cy.navigateToPage("/presentations");
		cy.takeScreenshot("presentations");
	});
	it('Verify "Research" page visuals', () => {
		cy.navigateToPage("/research");
		cy.takeScreenshot("research");
	});
	it('Verify "Returning to teaching" page visuals', () => {
		cy.navigateToPage("/returning-to-teaching");
		cy.takeScreenshot("returning-to-teaching");
	});
	it('Verify "Salaries and benefits" page visuals', () => {
		cy.navigateToPage("/salaries-and-benefits");
		cy.takeScreenshot("salaries-and-benefits");
	});
	it('Verify "Steps to become a teacher" page visuals', () => {
		cy.navigateToPage("/steps-to-become-a-teacher");
		cy.takeScreenshot("steps-to-become-a-teacher");
	});
	it('Verify "Three things to help you get into teaching" page visuals', () => {
		cy.navigateToPage("/three-things-to-help-you-get-into-teaching");
		cy.takeScreenshot("three-things-to-help-you-get-into-teaching");
	});
	it('Verify "Ways to train" page visuals', () => {
		cy.navigateToPage("/ways-to-train");
		cy.takeScreenshot("ways-to-train");
	});
	it('Verify "Find an event near you" page visuals', () => {
		cy.navigateToPage("/events");
		cy.takeScreenshot("events");
	});
	it('Verify "Train to Teach events" page visuals', () => {
		cy.navigateToPage("/event-categories/train-to-teach-events");
		cy.takeScreenshot("train-to-teach-events");
	});
	it('Verify "Online Q&As" page visuals', () => {
		cy.navigateToPage("/event-categories/online-q-as");
		cy.takeScreenshot("online-q-as");
	});
	it('Verify "School and University events" page visuals', () => {
		cy.navigateToPage("/event-categories/school-and-university-events");
		cy.takeScreenshot("school-and-university-events");
	});
	it('Verify "Get personalised information and updates about getting into teaching" page visuals', () => {
		cy.navigateToPage("/mailinglist/signup/name");
		cy.takeScreenshot("mailinglist-signup");
	});
});
