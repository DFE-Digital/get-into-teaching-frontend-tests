import TeacherTrainingAdviser from "../support/pageobjects/TeacherTrainingAdviser";

describe("Get-into-teaching - teachet training adviser flow", () => {
	var returner;
	var havePreviousTeacherReferenceNumber;
	const teacherTrainingAdviser = new TeacherTrainingAdviser();
	beforeEach(function () {
		cy.fixture("tta-signup-test-data.json").then((testData) => {
			this.testData = testData;
		});
		cy.visit(
			"https://get-teacher-training-adviser-service-dev.london.cloudapps.digital/registrations/identity",
			{
				auth: { username: "getintoteaching", password: "userneeds" },
			}
		);
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
		cy.selectStage("Secondary");
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
		cy.get(".govuk-panel__title").should("exist");
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

	it('It shows "Get the right GCSEs or equivalent qualifications" if user has no degree', function () {
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
			"No",
			"Secondary"
		);
		cy.get(".govuk-heading-l").then(function (headingText) {
			headingText = headingText.text().trim();
			expect(headingText).to.equal(
				"Get the right GCSEs or equivalent qualifications"
			);
		});
	});

	it("Error message link navigates to its respective field", function () {
		teacherTrainingAdviser.getFirstName();
		teacherTrainingAdviser.getLastName();
		teacherTrainingAdviser.getEmailAddress();
		teacherTrainingAdviser.getContinueButton().click();
		cy.contains("You need to enter you email address")
			.should((el) => {
				expect(el).to.have.attr("href", "#identity-email-field-error");
			})
			.click()
			.type("Test_email@gmail.com");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)")
			.should("have.text", "You need to enter your first name")
			.next()
			.should("have.text", "You need to enter your last name");
		cy.contains("You need to enter your first name")
			.should((el) => {
				expect(el).to.have.attr("href", "#identity-first-name-field-error");
			})
			.click()
			.type("Test_First_Name");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)").should(
			"have.text",
			"You need to enter your last name"
		);
		cy.contains("You need to enter your last name")
			.should((el) => {
				expect(el).to.have.attr("href", "#identity-last-name-field-error");
			})
			.click()
			.type("Test_Last_Name");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get(".govuk-fieldset__heading")
			.should("exist")
			.should("have.text", "Are you returning to teaching?");
	});

	it("It shows the error message if user wrong date of birth", function () {
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
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You need to enter your date of birth");
		cy.get("#degree-date-of-birth-date-of-birth-error").should(
			"have.text",
			"Error: You need to enter your date of birth"
		);
		cy.get("#degree-date-of-birth-date-of-birth-field-error").type("31");
		cy.get("#degree_date_of_birth_date_of_birth_2i").type("3");
		cy.get("#degree_date_of_birth_date_of_birth_1i").type("1885");
		cy.get(".govuk-button").click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must be less than 70 years old");
		cy.get("#degree-date-of-birth-date-of-birth-error").should(
			"have.text",
			"Error: You must be less than 70 years old"
		);
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#degree_date_of_birth_date_of_birth_1i").clear();
		cy.get("#degree_date_of_birth_date_of_birth_1i").type("2004");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must be 18 years or older to use this service");
		cy.get("#degree-date-of-birth-date-of-birth-error").should(
			"have.text",
			"Error: You must be 18 years or older to use this service"
		);
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#degree_date_of_birth_date_of_birth_1i").clear();
		cy.get("#degree_date_of_birth_date_of_birth_1i").type("2030");
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "Date can't be in the future");
		cy.get("#degree-date-of-birth-date-of-birth-error").should(
			"have.text",
			"Error: Date can't be in the future"
		);
	});

	it("It shows the error message if user clicks continiue button without entering the mandatory or correct details", function () {
		teacherTrainingAdviser.getFirstName();
		teacherTrainingAdviser.getLastName();
		teacherTrainingAdviser.getEmailAddress();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get(".govuk-error-summary__list")
			.children()
			.should("exist")
			.next()
			.should("exist")
			.next()
			.should("exist");
		cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)")
			.should("have.text", "You need to enter you email address")
			.next()
			.should("have.text", "You need to enter your first name")
			.next()
			.should("have.text", "You need to enter your last name");
		cy.get("#identity-first-name-field-error").type(this.testData.firstName);
		cy.get("#identity-last-name-field-error").type(this.testData.lastName);
		cy.get("#identity-email-field-error").type(this.testData.email);
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must select either yes or no");
		cy.get("#returning-teacher-returning-to-teaching-error").should(
			"have.text",
			"Error: You must select either yes or no"
		);
		cy.get("#returning-teacher-returning-to-teaching-field").click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "Select an option from the list");
		cy.get("#have-a-degree-degree-status-id-error").should(
			"have.text",
			"Error: Select an option from the list"
		);
		cy.get("#have-a-degree-degree-status-id-222750000-field").click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#degree-what-degree-class-uk-degree-grade-id-field").select(
			"First class"
		);
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must select either primary or secondary");
		cy.get(
			"#degree-stage-interested-teaching-preferred-education-phase-id-error"
		).should("have.text", "Error: You must select either primary or secondary");
		cy.get(
			"#degree-stage-interested-teaching-preferred-education-phase-id-222750001-field"
		).click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "You must select either yes or no");
		cy.get(
			"#degree-secondary-maths-english-grade4-has-gcse-maths-and-english-id-error"
		).should("have.text", "Error: You must select either yes or no");
		cy.get(
			"#degree-secondary-maths-english-grade4-has-gcse-maths-and-english-id-222750000-field"
		).click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#degree_date_of_birth_date_of_birth_3i").type("31");
		cy.get("#degree_date_of_birth_date_of_birth_2i").type("3");
		cy.get("#degree_date_of_birth_date_of_birth_1i").type("1985");
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should("have.text", "Select if you live in the UK or overseas");
		cy.get("#degree-uk-or-overseas-uk-or-overseas-error").should(
			"have.text",
			"Error: Select if you live in the UK or overseas"
		);
		cy.get("#degree-uk-or-overseas-uk-or-overseas-uk-field").click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get(".govuk-error-summary__list")
			.children()
			.should("exist")
			.next()
			.should("exist")
			.next()
			.should("exist");
		cy.get(".govuk-list.govuk-error-summary__list > li:nth-child(1)")
			.should("have.text", "Enter the first line of your address")
			.next()
			.should("have.text", "Enter your town or city")
			.next()
			.should("have.text", "Enter a real postcode");
		cy.get("#degree-uk-candidate-address-line1-field-error").type(
			this.testData.address_Line1
		);
		cy.get("#degree-uk-candidate-address-city-field-error").type(
			this.testData.city
		);
		cy.get("#degree-uk-candidate-address-postcode-field-error").type(
			this.testData.postcode
		);
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#degree-uk-telephone-telephone-field").type(
			this.testData.phoneNumber
		);
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		teacherTrainingAdviser.getContinueButton().click();
		cy.get("#error-summary-title")
			.should("exist")
			.should("have.text", "There is a problem");
		cy.get("li > a")
			.should("exist")
			.should(
				"have.text",
				"You must accept the privacy policy in order to talk to a teacher training adviser"
			);
		cy.get("#accept-privacy-policy-accepted-policy-id-error").should(
			"have.text",
			"Error: You must accept the privacy policy in order to talk to a teacher training adviser"
		);
		cy.get(
			"#accept-privacy-policy-accepted-policy-id-0a203956-e935-ea11-a813-000d3a44a8e9-field"
		).click();
		teacherTrainingAdviser.getContinueButton().click();
	});

	it("It shows Privacy policy details to the user if he clicks on link", function () {
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
		cy.get(".govuk-form-group > a").click();
		cy.get("h2").should("exist").should("have.text", "Privacy Policy");
		cy.get("h3").should("exist").should("have.text", "Legal information");
		cy.get(".govuk-footer__meta").should("exist");
	});

	it('It shows "Thank you  Sign up complete" to non-returner have an equivalent qualification from another country', function () {
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree(
			"I have an equivalent qualification from another country"
		);
		cy.selectStage("Equivalent-Secondary");
		cy.whichSubjectAreYouInterestedInTeaching("Equivalent-Computing");
		cy.whenDoYouWantToStartYourTeacherTraining("Equivalent-2021");
		cy.get("#equivalent_date_of_birth_date_of_birth_3i").type("27");
		cy.get("#equivalent_date_of_birth_date_of_birth_2i").type("07");
		cy.get("#equivalent_date_of_birth_date_of_birth_1i").type("1983");
		cy.clickOnContinueButton();
		cy.get("#equivalent-uk-or-overseas-uk-or-overseas-overseas-field").click();
		cy.clickOnContinueButton();
		cy.get("#equivalent-overseas-country-country-id-field").select("Austria");
		cy.clickOnContinueButton();
		cy.get("#equivalent-overseas-candidate-telephone-field").type("0125234490");
		cy.clickOnContinueButton();
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

	it('It shows "Thank you  Sign up complete" to non-returner have an equivalent qualification from another country interested in primary stage teaching', function () {
		var stage;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree(
			"I have an equivalent qualification from another country"
		);
		cy.selectStage("Equivalent-Primary");
		cy.whenDoYouWantToStartYourTeacherTraining("Equivalent-2021");
		cy.typeDateOfBirth("22", "08", "2000", true);
		cy.whereDoYouLive("UK", false, true);
		cy.get("#equivalent-uk-candidate-address-line1-field").type("25");
		cy.get("#equivalent-uk-candidate-address-line2-field").type(
			"Delbury Court"
		);
		cy.get("#equivalent-uk-candidate-address-city-field").type("Telford");
		cy.get("#equivalent-uk-candidate-address-postcode-field").type("TF3 2BP");
		cy.clickOnContinueButton();
		cy.enterUKTelephoneNumber("0123454748", true);

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

	it('It shows "Thank you  Sign up complete" to non-returner who is studying for a degree', function () {
		var stage;
		var haveEquivalentDegreeFromAnotherCountry = true;
		cy.enterFirstNameLastNameandEmail(
			this.testData.firstName,
			this.testData.lastName,
			this.testData.email
		);
		cy.returningToTeaching((returner = false));
		cy.doYouHaveDegree("I'm studying for a degree");
		cy.inWhichYearAreYouStudying("Final year");
		cy.selectWhatSubjectIsYourDegree("Studying-Computing");
		cy.whatDegreeClassAreYouPredictedToGet("2:2");
		cy.selectStage("Studying-Secondary");
		cy.haveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent("Yes", "Secondary");
		cy.whichSubjectAreYouInterestedInTeaching("Studying-Dance");
		cy.whenDoYouWantToStartYourTeacherTraining("Studying-2022");
		cy.typeDateOfBirth("22", "08", "2000", false);
		cy.whereDoYouLive("Austria", true, false);
		cy.get("#studying-overseas-telephone-telephone-field").type("0125234490");
		cy.clickOnContinueButton();
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
});
