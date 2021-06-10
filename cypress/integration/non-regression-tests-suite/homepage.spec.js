/// <reference types='Cypress' />
import Homepage from "../../support/pageobjects/Homepage";
import Navlinks from "../../support/pageobjects/Navlinks";

describe(`Home page tests : Tests execution date and time : ${new Date()}`, () => {
	const homePage = new Homepage();
	beforeEach(() => {
		cy.logintoApp();
	});

	it('It hides the COVID-19 message if user clicks on "Hide this message" link', () => {
		cy.contains("Hide this message").as("link").should("be.visible");
		cy.get(".covid").as("covidMessage").should("be.visible");
		cy.get("@link").click();
		cy.get("@link").should("not.be.visible");
		cy.get("@covidMessage").should("not.be.visible");
	});

	it('Links through to "Get an adviser"', () => {
		homePage
			.getGetAnAdviserLink()
			.should((el) => {
				expect(el).to.have.attr("href", Navlinks.getAnAdviser);
			})
			.click();

		cy.location("pathname").should("equal", Navlinks.getAnAdviser);
	});
});
