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
		return cy.get(":nth-child(1) > ul > :nth-child(3) > a");
	}
	getMailingStripText() {
		return cy.get(".hero__mailing-strip__text");
	}
	getMailingStripButton() {
		return cy.get(".hero__mailing-strip__button > span");
	}
	getMyStoryInToTeaching() {
		return cy.get(".navbar__desktop > ul > :nth-child(5) > a");
	}

	getHomeBannerText() {
		return cy.get(".home-hero__banner >h1");
	}
	getBannerText() {
		return cy.get(".hero__banner__text > h1");
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
		return cy.get(".navbar__desktop > ul > :nth-child(2) > a");
	}

	getStepstoBecomeTeacherLink() {
		return cy.get(".navbar__desktop > ul > :nth-child(3) > a");
	}

	getTeachingAsaCareerLink() {
		return cy.get(".navbar__desktop > ul > :nth-child(4) > a");
	}

	getSalariesAndBenefitsLink() {
		return cy.get(".navbar__desktop > ul > :nth-child(6) > a");
	}

	getFindanEventNearYouLink() {
		return cy.get(".navbar__desktop > ul > :nth-child(7) > a");
	}

	getFindEventLink() {
		return cy.contains("Find Events");
	}

	getCheckYourQualificationsLink() {
		return cy.get(":nth-child(1) > .steps__link > :nth-child(1)");
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
