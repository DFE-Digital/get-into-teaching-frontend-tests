import TeacherTrainingAdviser from "../support/pageobjects/TeacherTrainingAdviser";

function terminalLog(violations) {
     cy.task( 'log',
             `${violations.length} accessibility violation${
               violations.length === 1 ? '' : 's'
             } ${violations.length === 1 ? 'was' : 'were'} detected`
           )
     const violationData = violations.map(
             ({ id, impact, description, nodes }) => ({
               id,
               impact,
               description,
               nodes: nodes.length
             })
     )
     cy.task('table', violationData)
}

describe("Get-into-teaching - teachet training adviser flow", () => {
	var returner;
	var havePreviousTeacherReferenceNumber;
	const teacherTrainingAdviser = new TeacherTrainingAdviser();
	beforeEach(function () {
		cy.fixture("tta-signup-test-data.json").then((testData) => {
			this.testData = testData;
		});

		cy.visit(Cypress.env("baseurl_tta_flow"), {
			auth: { username: "getintoteaching", password: "userneeds" },
		});
	});
	it('It shows "Thank you  Sign up complete" message to UK returner user', function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = true));
		cy.havePreviousTeacherReferenceNumber(
			(havePreviousTeacherReferenceNumber = true)
		);
		cy.enterPreviousTeacherReferenceNumber(23478463);
		cy.selectPreviuosMainSubject("Computing");
		cy.selectSubjectLikeToTeach("Physics");
		cy.enterDateOfBirth("25", "02", "1986", (returner = true));
		cy.whereDoYouLive("UK");
		cy.enterUKCandidateAddress(
			"55",
			"Hollinswood",
			"Telford",
			"TF3 2BT",
			(returner = true)
		);
		cy.enterUKTelephoneNumber("012345678");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" message to overseas returner user', function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = true));
		cy.havePreviousTeacherReferenceNumber(
			(havePreviousTeacherReferenceNumber = true)
		);
		cy.enterPreviousTeacherReferenceNumber(23478463);
		cy.selectPreviuosMainSubject("Biology");
		cy.selectSubjectLikeToTeach("Maths");
		cy.enterDateOfBirth("20", "07", "2000", (returner = true));
		cy.whereDoYouLive("Switzerland");
		cy.enteroverseasTelephoneNumber("0012354758");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" message to UK, primary stage, non-returner', function () {
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Primary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" message to UK, secondery stage, non-returner', function () {
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Dance");
		cy.selectWhichClassIsYourDegree("2:2");
		cy.selectStage("Secondry");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondry"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Secondry"
		);
		cy.whichSubjectAreYouInterestedInTeaching("Computing");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth("31", "03", "1985", (returner = false));
		cy.youLiveIn("UK");
		cy.enterUKCandidateAddress(
			"21",
			"Victoria Embankment",
			"Darlington",
			"DL1 5JR",
			(returner = false)
		);
		cy.enterTelephoneNumber("0125234490");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" message to overseas, primary stage, non- returner', function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Biology");
		cy.selectWhichClassIsYourDegree("First class");
		cy.selectStage("Primary");
		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"Yes",
			"Primary"
		);
		cy.doYouHaveGrade4CorAboveInGCSEScienceorEquivalent("Yes");
		cy.whenDoYouWantToStartYourTeacherTraining("2021");
		cy.enterDateOfBirth(31, 3, 1985, (returner = false));
		cy.youLiveIn("Denmark");
		cy.enterTelephoneNumber(this.testData.phoneNumber, "Denmark");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	it('It shows "Thank you  Sign up complete" message to overseas, secondary stage, non- returner', function () {
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("Yes");
		cy.selectWhatSubjectIsYourDegree("Biology");
		cy.selectWhichClassIsYourDegree("First class");
		cy.selectStage("Secondary");

		cy.doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent(
			"No",
			"Secondary"
		);
		cy.areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent(
			"Yes",
			"Secondary"
		);
		cy.whichSubjectAreYouInterestedInTeaching("English");
		cy.whenDoYouWantToStartYourTeacherTraining("2022");
		cy.enterDateOfBirth(31, 3, 1985, (returner = false));
		cy.youLiveIn("Cyprus");
		cy.enterTelephoneNumber("02834830405", "Cyprus");
		cy.get(".govuk-heading-l")
			.should("exist")
			.should("have.text", "Check your answers before you continue");
		cy.clickOnContinueButton();
		cy.acceptPolicy();
		cy.get(".govuk-panel__title").should("exist");
		cy.get(".govuk-panel__title").then(function (signuptext) {
			signuptext = signuptext.text().trim();
			expect(signuptext).to.equal("Thank you  Sign up complete");
		});
	});

	// Basic usage
        it('Has no detectable a11y violations on load', () => {
          // Test the page at initial load
          cy.checkA11y()
        })

        it('Has no detectable a11y violations on load (filtering to only include critical impact violations)', () => {
          // Test on initial load, only report and assert for critical impact items
          cy.checkA11y(null, {
            includedImpacts: ['critical']
          })
        })

        it('Logs violations to the terminal', () => {
           cy.checkA11y(null, null, terminalLog)
        })
});
