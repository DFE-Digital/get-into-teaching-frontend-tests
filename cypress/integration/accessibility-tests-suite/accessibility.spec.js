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

describe(`Accessibility tests - Home page : Tests execution date and time : ${new Date()}`, () => {
	beforeEach(() => {
		cy.logintoApp();
	});

	it("Has no detectable a11y violations on load (filtering to only include critical impact violations)", () => {
		// Test on initial load, only report and assert for critical impact items
		cy.checkA11y(null, {
			includedImpacts: ["critical"],
		});
	});
});

describe("Accessibility tests - TTA : Tests execution date and time : " + new Date(), () => {
	beforeEach(function () {
		cy.visit(Cypress.env("baseurl_tta_flow"), {
			auth: {
				username: Cypress.env("HTTPAUTH_USERNAME"),
				password: Cypress.env("HTTPAUTH_PASSWORD"),
			},
		});
		cy.acceptAllCookies();
		cy.clickOnStartNowButton();
		cy.injectAxe();
	});
	it("Has no detectable a11y violations on load", function () {
		// Test the page at initial load
		cy.checkA11y();
	});

	it("Has no detectable a11y violations on load (filtering to only include critical impact violations)", function () {
		// Test on initial load, only report and assert for critical impact items
		cy.checkA11y(null, {
			includedImpacts: ["critical"],
		});
	});

	it("Logs violations to the terminal", function () {
		cy.checkA11y(null, null, terminalLog);
	});
});
