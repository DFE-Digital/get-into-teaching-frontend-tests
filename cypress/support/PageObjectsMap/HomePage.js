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
}
export default HomePage;
