// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("logintoApp", () => {
	cy.visit(Cypress.env("baseUrl"), {
		auth: { username: "getintoteaching", password: "userneeds" },
	});
});

Cypress.Commands.add("shouldHaveTalkToUsSection", () => {
	cy.contains("Talk to us").should("exist");
	cy.get(".talk-to-us__inner > .strapline").should("have.text", "Talk to us");

	cy.get(
		"div.talk-to-us__inner__table__column:nth-child(1) > a.call-to-action-button:nth-child(2)"
	)
		.should("exist")
		.then(function (linkName) {
			var linktext = linkName.text();
			expect(linktext).to.have.string("Chat online");
		});

	cy.contains("Sign up to talk to a teacher training ").should("exist");
	cy.get(
		".talk-to-us__inner__table > :nth-child(2) > .call-to-action-button"
	).should("exist");
	cy.get(".talk-to-us__inner__freephone > p").should(
		"have.text",
		"\n                    If you’d prefer, you can call us about teaching or teacher training on Freephone 0800 389 2500, Monday-Friday between 8.30am and 5pm.\n                    0800 389 2500.\n                "
	);
});

Cypress.Commands.add("shouldHaveFooter", () => {
	cy.get(".footer-bottom").should(
		"contain.text",
		"Feedback\n             | \n            Cookies\n             | \n            Privacy notice\n             | \n            Accessibility\n            \n            All content is available under the Open Government License v.3.0, except where otherwise stated\n        \n    "
	);
});

Cypress.Commands.add("shouldHavePageNavigation", () => {
	[
		"Home",
		"Funding your training",
		"Steps to become a teacher",
		"Teaching as a career",
		"Salaries and Benefits",
		"Find an event near you",
		"Talk to us",
	].forEach((text) => {
		cy.get("div.navbar__desktop").should("contain", text);
	});
});
