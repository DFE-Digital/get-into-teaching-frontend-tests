/// <reference types='Cypress' />
import Homepage from "../../support/pageobjects/Homepage";
describe(`Home page visual tests : Tests execution date and time : ${new Date()}`, () => {
	const homePage = new Homepage();
	it('Verify "A day in the life of a teacher" page visuals', () => {
		cy.navigateToPage("/a-day-in-the-life-of-a-teacher");
		cy.percySnapshot();
	});
	it('Verify "Accessibility information" page visuals', () => {
		cy.navigateToPage("/accessibility");
		cy.percySnapshot();
	});
	it('Verify "Providers of the Assessment Only" page visuals', () => {
		cy.navigateToPage("/assessment-only-providers");
		cy.percySnapshot();
	});
	it('Verify "Impact of COVID-19 on teacher training" page visuals', () => {
		cy.navigateToPage("/covid-19");
		cy.percySnapshot();
	});
	it('Verify "Early years teacher training" page visuals', () => {
		cy.navigateToPage("/early-years-teaching-training");
		cy.percySnapshot();
	});
	it('Verify "Funding your training" page visuals', () => {
		cy.navigateToPage("/funding-your-training");
		cy.percySnapshot();
	});
	it('Verify "Further education teacher training" page visuals', () => {
		cy.navigateToPage("/further-education-teacher-training");
		cy.percySnapshot();
	});
	it('Verify "Become a teacher in England" page visuals', () => {
		cy.navigateToPage("/guidance/become-a-teacher-in-england");
		cy.percySnapshot();
	});
	it('Verify "UK government financial support for international applicants" page visuals', () => {
		cy.navigateToPage("/guidance/financial-support-for-international-applicants");
		cy.percySnapshot();
	});
	it('Verify "Financial support for teacher training" page visuals', () => {
		cy.navigateToPage("/guidance/financial-support-for-teacher-training");
		cy.percySnapshot();
	});
	it('Verify "International teachers and trainees" page visuals', () => {
		cy.navigateToPage("/international-candidates");
		cy.percySnapshot();
	});
	it('Verify "Return to teaching from overseas" page visuals', () => {
		cy.navigateToPage("/international-returners");
		cy.percySnapshot();
	});
	it('Verify "Becoming a mum sparked my interest in teaching" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/becoming-a-mum-sparked-my-interest-in-teaching");
		cy.percySnapshot();
	});
	it('Verify "Financiers future in maths" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/financiers-future-in-maths");
		cy.percySnapshot();
	});
	it('Verify "From construction site to classroom" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/from-construction-site-to-classroom");
		cy.percySnapshot();
	});
	it('Verify "From developing software to developing students" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/from-developing-software-to-developing-students");
		cy.percySnapshot();
	});
	it('Verify "Make a difference to young people" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/make-a-difference-to-young-people");
		cy.percySnapshot();
	});
	it('Verify "Natural transition from engineering to teaching physics" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/natural-transition-from-engineering-to-teaching-physics");
		cy.percySnapshot();
	});
	it('Verify "Passing on my knowledge" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/passing-on-my-knowledge");
		cy.percySnapshot();
	});
	it('Verify "Police officer to PE teacher" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/police-officer-to-pe-teacher");
		cy.percySnapshot();
	});
	it('Verify "Royal Marine Commando to geography teacher" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/royal-marine-commando-to-geography-teacher");
		cy.percySnapshot();
	});
	it('Verify "School experience helped me decide to switch" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/school-experience-helped-me-decide-to-switch");
		cy.percySnapshot();
	});
	it('Verify "Swapping senior management for students" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/swapping-senior-management-for-students");
		cy.percySnapshot();
	});
	it('Verify "Teaching gave me purpose" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/teaching-gave-me-purpose");
		cy.percySnapshot();
	});
	it('Verify "Transferring my skills to teaching" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers/transferring-my-skills-to-teaching");
		cy.percySnapshot();
	});
	it('Verify "Career changers stories" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-changers");
		cy.percySnapshot();
	});
	it('Verify "Grasp every opportunity - you will progress" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/grasp-every-opportunity");
		cy.percySnapshot();
	});
	it('Verify "Lawyer to assistant headteacher" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/lawyer-to-assistant-teacher");
		cy.percySnapshot();
	});
	it('Verify "Leaping to head of department" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/leaping-to-head-of-department");
		cy.percySnapshot();
	});
	it('Verify "From newly qualified teacher to head of faculty in 5 years" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/newly-qualified-to-head-of-faculty");
		cy.percySnapshot();
	});
	it('Verify "From NQT to head of biology in 2 years" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/nqt-to-head-of-biology");
		cy.percySnapshot();
	});
	it('Verify "One year from Post Grad to head of department" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression/one-year-from-post-grad-to-hod");
		cy.percySnapshot();
	});
	it('Verify "Career progression stories" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/career-progression");
		cy.percySnapshot();
	});
	it('Verify "Returning to teaching with international experience" page visuals', () => {
		cy.navigateToPage(
			"/my-story-into-teaching/international-career-changers/returning-to-teaching-with-international-experience"
		);
		cy.percySnapshot();
	});
	it('Verify "Returning to teaching with support from an adviser" page visuals', () => {
		cy.navigateToPage(
			"/my-story-into-teaching/international-career-changers/returning-to-teaching-with-support-from-an-adviser"
		);
		cy.percySnapshot();
	});
	it('Verify "International career changers" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/international-career-changers");
		cy.percySnapshot();
	});
	it('Verify "Broadening horizons through travelling and teaching" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/broadening-horizons-through-travelling-and-teaching");
		cy.percySnapshot();
	});
	it('Verify "Getting our geek on - kids coding" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/getting-our-geek-on-kids-coding");
		cy.percySnapshot();
	});
	it('Verify "Going back and giving back" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/going-back-and-giving-back");
		cy.percySnapshot();
	});
	it('Verify "Inspiring our young entrepreneurs" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/inspiring-our-young-entrepreneurs");
		cy.percySnapshot();
	});
	it('Verify "No two days are the same" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/no-two-days-are-the-same");
		cy.percySnapshot();
	});
	it('Verify "Turning a tough lesson into a success" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference/turning-a-tough-lesson-into-success");
		cy.percySnapshot();
	});
	it('Verify "Making a difference" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/making-a-difference");
		cy.percySnapshot();
	});
	it('Verify "Getting back into the classroom" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/returners/getting-back-into-the-classroom");
		cy.percySnapshot();
	});
	it('Verify "Top tips for returning teachers" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/returners/top-tips-for-returning-teachers");
		cy.percySnapshot();
	});
	it('Verify "Be a teacher again" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/returners");
		cy.percySnapshot();
	});
	it('Verify "Banker turned teacher" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/teacher-training-stories/banker-turned-teacher");
		cy.percySnapshot();
	});
	it('Verify "Salaried teacher training: classroom learning" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/teacher-training-stories/salaried-teacher-training-classroom-learning");
		cy.percySnapshot();
	});
	it('Verify "Teacher training" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/teacher-training-stories/teacher-training-its-worth-it");
		cy.percySnapshot();
	});
	it('Verify "Why dont you teach" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/teacher-training-stories/why-dont-you-teach-miss");
		cy.percySnapshot();
	});
	it('Verify "Teacher training stories" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching/teacher-training-stories");
		cy.percySnapshot();
	});
	it('Verify "My story into teaching" page visuals', () => {
		cy.navigateToPage("/my-story-into-teaching");
		cy.percySnapshot();
	});
	it('Verify "Train to Teach events - Presentations" page visuals', () => {
		cy.navigateToPage("/presentations");
		cy.percySnapshot();
	});
	it('Verify "Research" page visuals', () => {
		cy.navigateToPage("/research");
		cy.percySnapshot();
	});
	it('Verify "Returning to teaching" page visuals', () => {
		cy.navigateToPage("/returning-to-teaching");
		cy.percySnapshot();
	});
	it('Verify "Salaries and benefits" page visuals', () => {
		cy.navigateToPage("/salaries-and-benefits");
		cy.percySnapshot();
	});
	it('Verify "Steps to become a teacher" page visuals', () => {
		cy.navigateToPage("/steps-to-become-a-teacher");
		cy.percySnapshot();
	});
	it('Verify "Three things to help you get into teaching" page visuals', () => {
		cy.navigateToPage("/three-things-to-help-you-get-into-teaching");
		cy.percySnapshot();
	});
	it('Verify "Ways to train" page visuals', () => {
		cy.navigateToPage("/ways-to-train");
		cy.percySnapshot();
	});
	it('Verify "Find an event near you" page visuals', () => {
		cy.navigateToPage("/events");
		cy.percySnapshot();
	});
	it('Verify "Train to Teach events" page visuals', () => {
		cy.navigateToPage("/event-categories/train-to-teach-events");
		cy.percySnapshot();
	});
	it('Verify "Online Q&As" page visuals', () => {
		cy.navigateToPage("/event-categories/online-q-as");
		cy.percySnapshot();
	});
	it('Verify "School and University events" page visuals', () => {
		cy.navigateToPage("/event-categories/school-and-university-events");
		cy.percySnapshot();
	});
	it('Verify "Get personalised information and updates about getting into teaching" page visuals', () => {
		cy.navigateToPage("/mailinglist/signup/name");
		cy.percySnapshot();
	});
});
