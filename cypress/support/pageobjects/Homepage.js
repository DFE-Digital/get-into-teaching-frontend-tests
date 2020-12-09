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
		return cy.get(".hero__mailing-strip__text");
	}
	getMailingStripButton() {
		return cy.get(".hero__mailing-strip__cta__button > span");
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

	getFundingyourTrainingLink() {
		return cy.contains("a", "Funding your training");
	}

	getStepstoBecomeTeacherLink() {
		return cy.contains("a", "Steps to become a teacher");
	}

	getTeachingAsaCareerLink() {
		return cy.contains("a", "Teaching as a career");
	}

	getSalariesAndBenefitsLink() {
		return cy.contains("a", "Salaries and benefits");
	}

	getFindanEventNearYouLink() {
		return cy.contains("a", "Find an event near you");
	}

	getFindEventLink() {
		return cy.contains("Find Events");
	}

	getCheckYourQualificationsLink() {
		return cy.contains("a", "Steps to become a teacher");
	}

	getWaystoTrainLink() {
		return cy.get(":nth-child(3) > .steps__number");
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
