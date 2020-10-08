Cypress.Commands.add('logintoApp', () => {
	cy.visit('/', {
		auth: {
			username: Cypress.env('HTTPAUTH_USERNAME'),
			password: Cypress.env('HTTPAUTH_PASSWORD'),
		},
	});
	cy.injectAxe();
	cy.get('#cookies-agree').click();
});

Cypress.Commands.add('shouldHaveTalkToUsSection', () => {
	cy.get('.talk-to-us__inner > .strapline')
		.should('exist')
		.then(function (sectionText) {
			cy.log(sectionText.text());
		});

	cy.get(
		'div.talk-to-us__inner__table__column:nth-child(1) > a.call-to-action-button:nth-child(2)'
	)
		.should('exist')
		.then(function (buttonText) {
			cy.log(buttonText.text());
		});
	cy.get('.talk-to-us__inner__table > :nth-child(2) > .call-to-action-button')
		.should('exist')
		.then(function (buttonText) {
			cy.log(buttonText.text());
		});
});

Cypress.Commands.add('shouldHaveFooter', () => {
	cy.get('.footer-bottom')
		.should('exist')
		.then(function (linkText) {
			cy.log(linkText.text());
		});
});

Cypress.Commands.add('shouldHavePageNavigation', () => {
	[
		'Home',
		'Funding your training',
		'Steps to become a teacher',
		'Teaching as a career',
		'My story into teaching',
		'Salaries and benefits',
		'Find an event near you',
	].forEach((text) => {
		cy.get('.navbar__desktop > ul').should('contain', text);
	});
});

Cypress.Commands.add('enterEmailVerificationCode', () => {
	cy.wait(5000);
	let newURL;
	var latestEmailID;
	var code;
	cy.request(
		'https://mailsac.com/api/addresses/testuser@mailsac.com/messages?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ'
	).as('topMostEmail');
	cy.get('@topMostEmail').then((response) => {
		latestEmailID = response.body[0]._id;
		cy.log('latestEmailID = ' + latestEmailID);
		newURL =
			'https://mailsac.com/api/text/testuser@mailsac.com/' +
			latestEmailID +
			'?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ';
		cy.request(newURL).as('verificationCode');
		cy.get('@verificationCode').then((response) => {
			var startpos = response.body.search('is');
			code = response.body.toString().substr(startpos + 2, 7);
			cy.get('#events-steps-authenticate-timed-one-time-password-field')
				.as('getOTPField')
				.type(code);
		});
	});
});

Cypress.Commands.add('enterEmailVerificationCodeForMailinglist', () => {
	cy.wait(5000);
	let newURL;
	var latestEmailID;
	var code;
	cy.request(
		'https://mailsac.com/api/addresses/testuser@mailsac.com/messages?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ'
	).as('topMostEmail');
	cy.get('@topMostEmail').then((response) => {
		latestEmailID = response.body[0]._id;
		cy.log('latestEmailID = ' + latestEmailID);
		newURL =
			'https://mailsac.com/api/text/testuser@mailsac.com/' +
			latestEmailID +
			'?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ';
		cy.request(newURL).as('verificationCode');
		cy.get('@verificationCode').then((response) => {
			var startpos = response.body.search('is');
			code = response.body.toString().substr(startpos + 2, 7);
			cy.get('#mailing-list-steps-authenticate-timed-one-time-password-field')
				.as('getOTPField')
				.type(code);
		});
	});
});

Cypress.Commands.add('acceptCookie', () => {
	cy.get('#cookies-agree').click();
});

Cypress.Commands.add('enterFirstNameLastNameandEmail', (firstName, lastName, email) => {
	let rnum = Math.floor(Math.random() * 10000000 + 1);
	firstName = 'First_' + rnum + '_name';
	lastName = 'Last_' + rnum + '_name';
	cy.get('#teacher-training-adviser-steps-identity-first-name-field').type(firstName);
	cy.get('#teacher-training-adviser-steps-identity-last-name-field').type(lastName);
	cy.get('#teacher-training-adviser-steps-identity-email-field').type(email);
	cy.clickOnContinueButton();
});

Cypress.Commands.add('clickOnContinueButton', () => {
	cy.contains('Continue').click();
});

Cypress.Commands.add('clickOnCompleteButton', () => {
	cy.contains('Complete').click();
});

Cypress.Commands.add('returningToTeaching', (returner) => {
	if (returner) {
		cy.get(
			'#teacher-training-adviser-steps-returning-teacher-returning-to-teaching-true-field'
		).click();
	} else {
		cy.get(
			'#teacher-training-adviser-steps-returning-teacher-returning-to-teaching-field'
		).click();
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add('havePreviousTeacherReferenceNumber', (havePreviousTeacherReferenceNumber) => {
	if (havePreviousTeacherReferenceNumber) {
		cy.get('#teacher-training-adviser-steps-has-teacher-id-has-id-true-field').click();
		cy.clickOnContinueButton();
	} else {
		cy.get('#teacher-training-adviser-steps-has-teacher-id-has-id-field').click();
		cy.clickOnContinueButton();
	}
});

Cypress.Commands.add('enterPreviousTeacherReferenceNumber', (teacherReferenceNumber) => {
	cy.get('#teacher-training-adviser-steps-previous-teacher-id-teacher-id-field').type(
		teacherReferenceNumber
	);
	cy.clickOnContinueButton();
});

Cypress.Commands.add('selectPreviuosMainSubject', (previousSubject) => {
	cy.get('#teacher-training-adviser-steps-subject-taught-subject-taught-id-field').select(
		previousSubject
	);
	cy.clickOnContinueButton();
});

Cypress.Commands.add('selectSubjectLikeToTeach', (subject) => {
	switch (subject) {
		case 'Maths':
			cy.get(
				'#teacher-training-adviser-steps-subject-like-to-teach-preferred-teaching-subject-id-a42655a1-2afa-e811-a981-000d3a276620-field'
			).click();
			break;
		case 'Physics':
			cy.get(
				'#teacher-training-adviser-steps-subject-like-to-teach-preferred-teaching-subject-id-ac2655a1-2afa-e811-a981-000d3a276620-field'
			).click();
			break;
		case 'Modern foreign language':
			cy.get(
				'#teacher-training-adviser-steps-subject-like-to-teach-preferred-teaching-subject-id-a22655a1-2afa-e811-a981-000d3a276620-field'
			).click();
			break;
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add('youLiveIn', (location) => {
	if (location == 'UK') {
		cy.get('#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-uk-field').click();
	} else {
		cy.get(
			'#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-overseas-field'
		).click();
		cy.clickOnContinueButton();
		cy.get('#teacher-training-adviser-steps-overseas-country-country-id-field').select(
			location
		);
	}
	cy.clickOnContinueButton();
});

/*Cypress.Commands.add("whereDoYouLive", (location) => {
	if (location == "UK") {
		cy.get("#uk-or-overseas-uk-or-overseas-uk-field").click();
	} else {
		cy.get("#uk-or-overseas-uk-or-overseas-overseas-field").click();
		cy.get(".govuk-button").click();
		cy.get("#overseas-country-country-id-field").select(location);
	}
	cy.get(".govuk-button").click();
});*/

Cypress.Commands.add('whereDoYouLive', (location, studying, equivalent) => {
	switch (true) {
		case studying:
			if (location == 'UK') {
				cy.get(
					'#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-uk-field'
				).click();
			} else {
				cy.get(
					'#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-overseas-field'
				).click();
				cy.clickOnContinueButton();
				cy.get('#teacher-training-adviser-steps-overseas-country-country-id-field').select(
					location
				);
			}
			break;
		case equivalent:
			if (location == 'UK') {
				cy.get(
					'#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-uk-field'
				).click();
			} else {
				cy.get(
					'#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-overseas-field'
				).click();
				cy.clickOnContinueButton();
				cy.get('#teacher-training-adviser-steps-overseas-country-country-id-field').select(
					location
				);
			}
			break;
		default:
			if (location == 'UK') {
				cy.get(
					'#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-uk-field'
				).click();
			} else {
				cy.get(
					'#teacher-training-adviser-steps-uk-or-overseas-uk-or-overseas-overseas-field'
				).click();
				cy.clickOnContinueButton();
				cy.get('#teacher-training-adviser-steps-overseas-country-country-id-field').select(
					location
				);
			}
	}

	cy.clickOnContinueButton();
});

Cypress.Commands.add('enterUKTelephoneNumber', (number, equivalent) => {
	if (equivalent) {
		cy.get('#teacher-training-adviser-steps-uk-telephone-telephone-field').type('0125234490');
	} else {
		cy.get('#teacher-training-adviser-steps-uk-telephone-telephone-field').clear().type(number);
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add('enterTelephoneNumber', (number, country = 'UK') => {
	if (country == 'UK') {
		cy.get('#teacher-training-adviser-steps-uk-telephone-telephone-field').type(number);
	} else {
		cy.get('#teacher-training-adviser-steps-overseas-telephone-telephone-field').type(number);
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add('doYouHaveDegree', (degree) => {
	switch (degree) {
		case 'Yes':
			cy.get(
				'#teacher-training-adviser-steps-have-a-degree-degree-options-degree-field'
			).click();
			break;
		case 'No':
			cy.get('#teacher-training-adviser-steps-have-a-degree-degree-options-no-field').click();
			break;
		case "I'm studying for a degree":
			cy.get(
				'#teacher-training-adviser-steps-have-a-degree-degree-options-studying-field'
			).click();
			break;
		case 'I have an equivalent qualification from another country':
			cy.get(
				'#teacher-training-adviser-steps-have-a-degree-degree-options-equivalent-field'
			).click();
			break;
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add('selectWhatSubjectIsYourDegree', (subject) => {
	var subject = subject.split('-');
	switch (subject[0]) {
		case 'Studying':
			cy.get(
				'#teacher-training-adviser-steps-what-subject-degree-degree-subject-field'
			).select(subject[1]);
			break;
		case 'Secondary':
			cy.get(
				'#teacher-training-adviser-steps-degree-stage-interested-teaching-preferred-education-phase-id-222750001-field'
			).click();
			break;
		default:
			cy.get(
				'#teacher-training-adviser-steps-what-subject-degree-degree-subject-field'
			).select(subject[0]);
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add('selectWhichClassIsYourDegree', (degreeClass) => {
	cy.get('#teacher-training-adviser-steps-what-degree-class-uk-degree-grade-id-field').select(
		degreeClass
	);
	cy.clickOnContinueButton();
});

Cypress.Commands.add('whatDegreeClassAreYouPredictedToGet', (degreeClass) => {
	cy.get('#teacher-training-adviser-steps-what-degree-class-uk-degree-grade-id-field').select(
		degreeClass
	);
	cy.clickOnContinueButton();
});

Cypress.Commands.add('whichSubjectAreYouInterestedInTeaching', (subject) => {
	var subject = subject.split('-');
	switch (subject[0]) {
		case 'Equivalent':
			cy.get(
				'#teacher-training-adviser-steps-subject-interested-teaching-preferred-teaching-subject-id-field'
			).select(subject[1]);
			break;
		case 'Studying':
			cy.get(
				'#teacher-training-adviser-steps-subject-interested-teaching-preferred-teaching-subject-id-field'
			).select(subject[1]);
			break;
		case 'Secondary':
			cy.get(
				'#teacher-training-adviser-steps-stage-interested-teaching-preferred-education-phase-id-222750001-field'
			).click();
			break;
		case 'Equivalent-Secondary':
			cy.get(
				'#teacher-training-adviser-steps-stage-interested-teaching-preferred-education-phase-id-222750001-field'
			).click();
			break;
		case 'Equivalent-Primary':
			cy.get(
				'#teacher-training-adviser-steps-stage-interested-teaching-preferred-education-phase-id-222750000-field'
			).click();
			break;
		default:
			cy.get(
				'#teacher-training-adviser-steps-subject-interested-teaching-preferred-teaching-subject-id-field'
			).select(subject[0]);
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add(
	'doYouHaveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent',
	(haveGrade, stage) => {
		if (stage == 'Primary') {
			if (haveGrade == 'Yes') {
				cy.get(
					'#teacher-training-adviser-steps-gcse-maths-english-has-gcse-maths-and-english-id-222750000-field'
				).click();
			} else {
				cy.get(
					'#teacher-training-adviser-steps-gcse-maths-english-has-gcse-maths-and-english-id-222750001-field'
				).click();
			}
		} else {
			if (haveGrade == 'Yes') {
				cy.get(
					'#teacher-training-adviser-steps-gcse-maths-english-has-gcse-maths-and-english-id-222750000-field'
				).click();
			} else {
				cy.get(
					'#teacher-training-adviser-steps-gcse-maths-english-has-gcse-maths-and-english-id-222750001-field'
				).click();
			}
		}
		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add('whenDoYouWantToStartYourTeacherTraining', (trainingYear) => {
	var trainingYear = trainingYear.split('-');
	switch (trainingYear[0]) {
		case 'Equivalent':
			cy.get(
				'#teacher-training-adviser-steps-start-teacher-training-initial-teacher-training-year-id-field'
			).select(trainingYear[1]);
			break;
		case 'Studying':
			cy.get(
				'#teacher-training-adviser-steps-start-teacher-training-initial-teacher-training-year-id-field'
			).select(trainingYear[1]);
			break;
		case 'Secondary':
			cy.get(
				'#teacher-training-adviser-stepsdegree-stage-interested-teaching-preferred-education-phase-id-222750001-field'
			).click();
			break;
		default:
			cy.get(
				'#teacher-training-adviser-steps-start-teacher-training-initial-teacher-training-year-id-field'
			).select(trainingYear[0]);
	}

	cy.clickOnContinueButton();
});

Cypress.Commands.add(
	'areYouPlanningToRetakeEitherEnglishorMathsorBothGCSEsorEquivalent',
	(planning, stage) => {
		if (stage == 'Primary') {
			if (planning == 'Yes') {
				cy.get(
					'#teacher-training-adviser-steps-retake-gcse-maths-english-planning-to-retake-gcse-maths-and-english-id-222750000-field'
				).click();
			} else {
				cy.get(
					'#teacher-training-adviser-steps-retake-gcse-maths-english-planning-to-retake-gcse-maths-and-english-id-222750001-field'
				).click();
			}
		} else {
			if (planning == 'Yes') {
				cy.get(
					'#teacher-training-adviser-steps-retake-gcse-maths-english-planning-to-retake-gcse-maths-and-english-id-222750000-field'
				).click();
			} else {
				cy.get(
					'#teacher-training-adviser-steps-retake-gcse-maths-english-planning-to-retake-gcse-maths-and-english-id-222750001-field'
				).click();
			}
		}

		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add('doYouHaveGrade4CorAboveInGCSEScienceorEquivalent', (grade) => {
	if (grade == 'Yes') {
		cy.get(
			'#teacher-training-adviser-steps-gcse-science-has-gcse-science-id-222750000-field'
		).click();
	} else {
		cy.get(
			'#teacher-training-adviser-steps-gcse-science-has-gcse-science-id-222750001-field'
		).click();
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add('selectStage', (stage) => {
	switch (stage) {
		case 'Primary':
			cy.get(
				'#teacher-training-adviser-steps-stage-interested-teaching-preferred-education-phase-id-222750000-field'
			).click();
			break;
		case 'Secondary':
			cy.get(
				'#teacher-training-adviser-steps-stage-interested-teaching-preferred-education-phase-id-222750001-field'
			).click();
			break;
		case 'Equivalent-Secondary':
			cy.get(
				'#teacher-training-adviser-steps-stage-interested-teaching-preferred-education-phase-id-222750001-field'
			).click();
			break;
		case 'Equivalent-Primary':
			cy.get(
				'#teacher-training-adviser-steps-stage-interested-teaching-preferred-education-phase-id-222750000-field'
			).click();
			break;
		case 'Studying-Secondary':
			cy.get(
				'#teacher-training-adviser-steps-stage-interested-teaching-preferred-education-phase-id-222750001-field'
			).click();
			break;
		case 'Studying-Primary':
			cy.get(
				'#teacher-training-adviser-steps-stage-interested-teaching-preferred-education-phase-id-222750000-field'
			).click();
			break;
	}
	cy.clickOnContinueButton();

	/*if (stage == "Primary") {
		cy.get(
			"#degree-stage-interested-teaching-preferred-education-phase-id-222750000-field"
		).click();
	} else {
		//stage=secondary
		cy.get(
			"#degree-stage-interested-teaching-preferred-education-phase-id-222750001-field"
		).click();
	}
	cy.get(".govuk-button").click();*/
});

Cypress.Commands.add('enteroverseasTelephoneNumber', (number) => {
	cy.get('#teacher-training-adviser-steps-overseas-telephone-telephone-field').type(number);
	cy.clickOnContinueButton();
});

Cypress.Commands.add('acceptPolicy', () => {
	cy.contains('Accept the privacy policy').click();
	cy.clickOnCompleteButton();
});

Cypress.Commands.add('enterDateOfBirth', (day, month, year, returner) => {
	if (returner) {
		cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_3i').type(day);
		cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_2i').type(month);
		cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i').type(year);
	} else {
		cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_3i').type(day);
		cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_2i').type(month);
		cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i').type(year);
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add(
	'enterUKCandidateAddress',
	(addressline1, addressline2, city, postcode, returner) => {
		cy.get('#teacher-training-adviser-steps-uk-address-address-line1-field').type(addressline1);
		cy.get('#teacher-training-adviser-steps-uk-address-address-line2-field').type(addressline2);
		cy.get('#teacher-training-adviser-steps-uk-address-address-city-field').type(city);
		cy.get('#teacher-training-adviser-steps-uk-address-address-postcode-field')
			.clear()
			.type(postcode);
		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add('inWhichYearAreYouStudying', (stage) => {
	switch (stage) {
		case 'Final year':
			cy.get(
				'#teacher-training-adviser-steps-stage-of-degree-degree-status-id-222750001-field'
			).click();
			break;
		case 'Second year':
			cy.get(
				'#teacher-training-adviser-steps-stage-of-degree-degree-status-id-222750002-field'
			).click();
			break;
		case 'First year':
			cy.get(
				'#teacher-training-adviser-steps-stage-of-degree-degree-status-id-222750003-field'
			).click();
			break;
		case 'Other':
			cy.get(
				'#teacher-training-adviser-steps-stage-of-degree-degree-status-id-222750005-field'
			).click();
			break;
	}
	cy.clickOnContinueButton();
});
Cypress.Commands.add('haveGrade4CorAboveInEnglishAndMathsGCSEsorEuivalent', (haveGrade, stage) => {
	if (stage == 'Primary') {
		if (haveGrade == 'Yes') {
			cy.get(
				'#teacher-training-adviser-steps-gcse-maths-english-has-gcse-maths-and-english-id-222750000-field'
			).click();
		} else {
			cy.get(
				'#teacher-training-adviser-steps-gcse-maths-english-has-gcse-maths-and-english-id-222750001-field'
			).click();
		}
	} else {
		if (haveGrade == 'Yes') {
			cy.get(
				'#teacher-training-adviser-steps-gcse-maths-english-has-gcse-maths-and-english-id-222750000-field'
			).click();
		} else {
			cy.get(
				'#teacher-training-adviser-steps-gcse-maths-english-has-gcse-maths-and-english-id-222750001-field'
			).click();
		}
	}

	cy.clickOnContinueButton();
});

Cypress.Commands.add(
	'typeDateOfBirth',
	(day, month, year, haveEquivalentDegreeFromAnotherCountry) => {
		if (haveEquivalentDegreeFromAnotherCountry) {
			cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_3i').type(day);
			cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_2i').type(month);
			cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i').type(year);
		} else {
			cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_3i').type(day);
			cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_2i').type(month);
			cy.get('#teacher_training_adviser_steps_date_of_birth_date_of_birth_1i').type(year);
		}
		cy.clickOnContinueButton();
	}
);

Cypress.Commands.add('enterVerificationCode', (verificationCode, error) => {
	if (error) {
		cy.get('#events-steps-authenticate-timed-one-time-password-field-error').clear();
		cy.get('#events-steps-authenticate-timed-one-time-password-field-error').type(
			verificationCode
		);
	} else {
		cy.get('#events-steps-authenticate-timed-one-time-password-field').type(verificationCode);
	}
});
Cypress.Commands.add('selectCountry', (location) => {
	cy.get('#degree-overseas-country-country-id-field').select(location);
	cy.clickOnContinueButton();
});

Cypress.Commands.add('enterEmail', (emailAddress) => {
	cy.contains('Email address').next().next().clear();
	cy.contains('Email address').type(emailAddress);
});

Cypress.Commands.add('verifyEmailAddressError', () => {
	cy.get('#error-summary-title').should('exist').should('have.text', 'There is a problem');
	cy.get('li > a').should('have.text', 'You need to enter your email address');
});

Cypress.Commands.add('clickOnBackButton', () => {
	//cy.get(".govuk-back-link").click();
	cy.contains('Back').click();
});

Cypress.Commands.add('areYouPlanningToRetakeYourScienceGCSE', (planning) => {
	if (planning == 'Yes') {
		cy.contains('Yes').click();
	} else {
		cy.contains('No').click();
	}
	cy.clickOnContinueButton();
});

Cypress.Commands.add('verifyYourEmailAddress', () => {
	cy.wait(5000);
	let newURL;
	var latestEmailID;
	var code;
	cy.request(
		'https://mailsac.com/api/addresses/testuser@mailsac.com/messages?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ'
	).as('topMostEmail');
	cy.get('@topMostEmail').then((response) => {
		latestEmailID = response.body[0]._id;
		cy.log('latestEmailID = ' + latestEmailID);
		newURL =
			'https://mailsac.com/api/text/testuser@mailsac.com/' +
			latestEmailID +
			'?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ';
		cy.request(newURL).as('verificationCode');
		cy.get('@verificationCode').then((response) => {
			var startpos = response.body.search('is');
			code = response.body.toString().substr(startpos + 2, 7);
			cy.get('#teacher-training-adviser-steps-authenticate-timed-one-time-password-field')
				.as('getOTPField')
				.type(code);
			cy.clickOnContinueButton();
		});
	});
});
Cypress.Commands.add('clickOnStartNowButton', () => {
	cy.contains('Start now').click();
});

Cypress.Commands.add('acceptAllCookies', () => {
	cy.get('#cookies-agree').click();
});

Cypress.Commands.add('wouldYouLikeToReceiveEmailUpdate', (personalisedInformation) => {
	if (personalisedInformation == 'Yes') {
		cy.get('#events-steps-further-details-subscribe-to-mailing-list-true-field').click();
	} else {
		cy.get('#events-steps-further-details-subscribe-to-mailing-list-field').click();
		cy.contains('Complete sign up').click();
	}
});

Cypress.Commands.add('enterEmailVerificationCodeForTeacherTrainingAdviser', () => {
	cy.wait(5000);
	let newURL;
	var latestEmailID;
	var code;
	cy.request(
		'https://mailsac.com/api/addresses/testuser@mailsac.com/messages?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ'
	).as('topMostEmail');
	cy.get('@topMostEmail').then((response) => {
		latestEmailID = response.body[0]._id;
		cy.log('latestEmailID = ' + latestEmailID);
		newURL =
			'https://mailsac.com/api/text/testuser@mailsac.com/' +
			latestEmailID +
			'?_mailsacKey=WGZ5k8QtC3Iys8o7LzvXzTO6oQ';
		cy.request(newURL).as('verificationCode');
		cy.get('@verificationCode').then((response) => {
			var startpos = response.body.search('is');
			code = response.body.toString().substr(startpos + 2, 7);
			cy.get('#teacher-training-adviser-steps-authenticate-timed-one-time-password-field')
				.as('getOTPField')
				.type(code);
		});
	});
});
