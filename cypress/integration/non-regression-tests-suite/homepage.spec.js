/// <reference types='Cypress' />
import Homepage from "../../support/pageobjects/Homepage";
import Navlinks from "../../support/pageobjects/Navlinks";

function terminalLog(violations) {
	cy.task(
		"log",
		`${violations.length} accessibility violation${violations.length === 1 ? "" : "s"} ${
			violations.length === 1 ? "was" : "were"
		} detected`
	);
	const violationData = violations.map(({ id, impact, description, nodes }) => ({
		id,
		impact,
		description,
		nodes: nodes.length,
	}));
	cy.task("table", violationData);
}

describe(`Home page tests : Tests execution date and time : ${new Date()}`, () => {
	const homePage = new Homepage();
	beforeEach(() => {
		cy.logintoApp();
	});

	it("It shows the home page", () => {
		homePage.getCovidMessage().should("exist");
		homePage.getTeachingImage().should("exist");
		homePage.getMailingStripText().should("exist");
		homePage.getMailingStripText().siblings().should("exist");
		cy.shouldHaveTalkToUsSection();
		cy.shouldHaveFooter();
	});

	it('It hides the COVID-19 message if user clicks on "Hide this message" link', () => {
		cy.contains("Hide this message").as("link").should("be.visible");
		cy.get(".covid").as("covidMessage").should("be.visible");
		cy.get("@link").click();
		cy.get("@link").should("not.be.visible");
		cy.get("@covidMessage").should("not.be.visible");
	});

	it("Verify social media links", () => {
		cy.verifySocialMediaLink(0, Navlinks.facebook);
		cy.verifySocialMediaLink(1, Navlinks.instagram);
		cy.verifySocialMediaLink(2, Navlinks.linkedin);
		cy.verifySocialMediaLink(3, Navlinks.twitter);
		cy.verifySocialMediaLink(4, Navlinks.youtube);
	});

	it.skip("Has no detectable a11y violations on load (filtering to only include critical impact violations)", () => {
		// Test on initial load, only report and assert for critical impact items
		cy.checkA11y(null, {
			includedImpacts: ["critical"],
		});
	});
});

describe(`Feature - 404 Not Found unknown_route : ${new Date()}`, () => {
	it('It should show "404	Not Found unknown_route" if the user enters a bad URL', () => {
		cy.visit({
			url: "https://get-into-teaching-apps-test.london.cloudapps.digital/",
			method: "GET",
			failOnStatusCode: false,
		});
		cy.verify404ErrorMessage();
	});
});
