class HomePage {
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
		return cy.get(".home-hero__mailing-strip__text");
	}
	getMailingStripButton() {
		return cy.get(".home-hero__mailing-strip__button__inner > p");
	}
	getMyStoryInToTeaching() {
		return cy.get("div.my-story__right p:nth-child(3) > a.git-link");
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
		return cy.get(":nth-child(1) > ul > :nth-child(2) > a");
	}

	getStepstoBecomeTeacherLink() {
		return cy.get(":nth-child(1) > ul > :nth-child(1) > a");
	}

	getTeachingAsaCareerLink() {
		return cy.get(".navbar__desktop > :nth-child(2) > ul > :nth-child(4) > a");
	}

	getSalariesAndBenefitsLink() {
		return cy.get(".navbar__desktop > :nth-child(2) > ul > :nth-child(3) > a");
	}

	getFindanEventNearYouLink() {
		return cy.get(".navbar__desktop > :nth-child(2) > ul > :nth-child(2) > a");
	}

	getFindEventLink() {
		return cy.get("div.find-an-event__right p:nth-child(3) > a.git-link");
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
}
export default HomePage;
