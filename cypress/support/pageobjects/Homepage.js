module.exports = class HomePage {
	getCovidMessage() {
		return cy.get(".covid");
	}
	getCovidLink() {
		return cy.get(".covid > a");
	}
	getTeachingImage() {
		return cy.get(".logo__image");
	}
	getHomeHyperLink() {
		return cy.contains("a", "Home");
	}
	getMailingStripText() {
		return cy.get(".hero__subtitle__button > span");
	}
	getMailingStripButton() {
		return cy.get(".footer-signup__inner > .call-to-action-button");
	}
	getMyStoryInToTeaching() {
		return cy.contains("a", "My story into teaching");
	}

	getHomeBannerText() {
		return cy.get(".home-hero__banner >h1");
	}
	getBannerText() {
		return cy.get("h1 > span");
	}

	getContentVideo() {
		return cy.get(
			'[href="https://www.youtube.com/watch?v=MLdrZJpK5rU"] > .content-video > .content-video__play > .icon-play'
		);
	}

	getVideoContainer() {
		return cy.get(".video-overlay__video-container");
	}

	getVideoCloseIcon() {
		return cy.get(".icon-video-close");
	}

	getSignUpForUpdateButton() {
		return cy.get(".hero__subtitle__button");
	}
	getGetAnAdviserLink() {
		return cy.contains("Get an adviser");
	}

	getFundingyourTrainingLink() {
		return cy.contains("a", "Funding your training");
	}

	getStepstoBecomeTeacherLink() {
		return cy.contains("a", "Steps to become a teacher");
	}

	getLifeOfATeacherLink() {
		return cy.contains("a", "A day in the life of a teacher");
	}

	getSalariesAndBenefitsLink() {
		return cy.contains("a", "Salaries and benefits");
	}

	getFindanEventNearYouLink() {
		return cy.contains("a", "Find an event near you");
	}

	getFindEventLink() {
		return cy.contains("Find events");
	}

	getCheckYourQualificationsLink() {
		return cy.contains("a", "Steps to become a teacher");
	}

	getWaystoTrainLink() {
		return cy.contains("a", "Ways to train");
	}

	getEventLocation() {
		return cy.get("#events_search_distance");
	}

	getEventPostCode() {
		return cy.get("#events_search_postcode");
	}

	getUpdateResultsButton() {
		return cy.get(".request-button");
	}
	getEventsType() {
		return cy.get("#events_search_type");
	}
	getEventsMonth() {
		return cy.get("#events_search_month");
	}
	getSearchforEventsHeading() {
		return cy.get("#searchforevents");
	}
	getSocialMediaLink(index) {
		return cy.get(".site-footer-top__social__link").eq(index);
	}
};
