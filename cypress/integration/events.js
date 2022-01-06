describe("Event sign up", () => {
  const eventSelector = ".events-featured__list__item";

  beforeEach(() => {
    checkEventSelectorIsCorrect();
    navigateToLastPageOfEvents();

    cy.random()
      .then((rand) => `First-${rand}`)
      .as("firstName")
      .then((rand) => `Last-${rand}`)
      .as("lastName");
  });

  describe("As a new candidate", () => {
    beforeEach(() => {
      cy.random()
        .then((rand) => `${rand}@${rand}.never`)
        .as("email");
    });

    it("Signing up (without mailing list)", function () {
      cy.anEventExists().then((exists) => {
        if (exists) {
          navigateToLastEventSignUp();
          signUp(this.firstName, this.lastName, this.email, false);
        }
      });
    });

    it("Signing up (with mailing list)", function () {
      cy.anEventExists().then((exists) => {
        if (exists) {
          navigateToLastEventSignUp();
          signUp(this.firstName, this.lastName, this.email, true);
        }
      });
    });
  });

  describe("As an existing candidate", () => {
    before(() => {
      cy.fixture("test_data.json")
        .then((testData) => testData.events.email)
        .as("email");
    });

    it("Signing up (with mailing list, resends verification code)", function () {
      cy.anEventExists().then((exists) => {
        if (exists) {
          navigateToLastEventSignUp();

          submitPersonalDetails(this.firstName, this.lastName, this.email);

          cy.clickWithText("Send another code to verify my details.");
          cy.contains("We've sent you another email");

          cy.waitForJobs();

          cy.retrieveVerificationCode(this.email).then((code) => {
            cy.getByLabel("To verify your details, we've sent a code to your email address.").type(code);
            cy.clickNext();

            cy.contains(
              "Are you over 16 and do you agree to our privacy policy?"
            );
            cy.get(".govuk-checkboxes").contains("Yes").click();

            cy.clickCompleteSignUp();
          });
        }
      });
    });
  });

  const signUp = (firstName, lastName, email, mailingList) => {
    submitPersonalDetails(firstName, lastName, email);

    cy.getByLabel("What is your telephone number? (optional)").type("123456789");
    cy.clickNext();

    cy.contains("Are you over 16 and do you agree to our privacy policy?");
    cy.get(".govuk-checkboxes").contains("Yes").click();

    cy.contains(
      "Would you like to receive email updates to help you get into teaching?"
    );
    cy.get(".govuk-radios__item")
      .contains(mailingList ? "Yes" : "No")
      .click();

    if (mailingList) {
      cy.get(".govuk-radios__item").contains("Yes").click();
      cy.clickNext();
      completeMailingListSignUp();
    } else {
      cy.get(".govuk-radios__item").contains("No").click();
    }

    cy.clickCompleteSignUp();

    cy.contains("Sign up complete");
  };

  const completeMailingListSignUp = () => {
    cy.getByLabel("Do you have a degree?").select("Final year");
    cy.getByLabel("How close are you to applying for teacher training?").select(
      "It’s just an idea"
    );
    cy.getByLabel("What is your postcode? (optional)").type("TE5 1NG");
    cy.getByLabel("What subject do you want to teach?").select("Maths");
  };

  const submitPersonalDetails = (firstName, lastName, email) => {
    cy.contains("Sign up for this event");
    cy.getByLabel("First name").type(firstName);
    cy.getByLabel("Last name").type(lastName);
    cy.getByLabel("Email address").type(email);
    cy.clickNext();
  };

  const navigateToLastPageOfEvents = () => {
    cy.authVisit("/event-categories/train-to-teach-events");

    cy.get("body").then((body) => {
      if (body.find(".pagination").length) {
        cy.get(".pagination .page a").last().click();
      }
    });
  };

  const navigateToLastEventSignUp = () => {
    cy.get(eventSelector).last().click();
    cy.clickWithText("Sign up for this event");
  };

  // The tests are setup to pass when there are no TTT
  // events. To avoid a false positive we need to verify
  // the event selector hasn't changed before each run.
  const checkEventSelectorIsCorrect = () => {
    cy.authVisit("/events");
    cy.acceptCookie();
    cy.get(eventSelector);
  };
});
