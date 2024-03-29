describe("Mailing list sign up", () => {
  beforeEach(() => {
    cy.authVisit("/mailinglist/signup");
    cy.acceptCookie();

    cy.random()
      .then((rand) => `First-${rand}`)
      .as("firstName")
      .then((rand) => `Last-${rand}`)
      .as("lastName");
  });

  describe("As a new candidate", () => {
    before(() => {
      cy.random()
        .then((rand) => `${rand}@${rand}.never`)
        .as("email");
    });

    it("Signing up", function () {
      signUp(this.firstName, this.lastName, this.email);
    });
  });

  describe("As an existing candidate", () => {
    before(() => {
      cy.fixture("test_data.json")
        .then((testData) => testData.mailingList.email)
        .as("email");
    });

    it("Signing up (resends verification code)", function () {
      cy.contains("Get personalised guidance to your inbox");
      submitPersonalDetails(this.firstName, this.lastName, this.email);

      cy.clickWithText("Send another code to verify my details.");
      cy.contains("We've sent you another email");

      cy.waitForJobs();

      cy.retrieveVerificationCode(this.email).then((code) => {
        cy.contains("You're already registered with us");
        cy.getByLabel("To verify your details, we've sent a code to your email address.").type(code);
        cy.clickNext();

        cy.contains("You've already signed up");
      });
    });

    it("Booking a callback on completion of the mailing list sign up", function () {
      cy.authVisit("/callbacks/book");

      submitPersonalDetails(this.firstName, this.lastName, this.email);

      cy.clickWithText("Send another code to verify my details.");
      cy.contains("We've sent you another email");

      cy.waitForJobs();

      cy.retrieveVerificationCode(this.email).then((code) => {
        cy.contains("You're already registered with us");
        cy.getByLabel("To verify your details, we've sent a code to your email address.").type(code);
        cy.clickNext();
      });

      cy.getByLabel("Phone number").clear().type("1234567890");
      cy.clickNext();

      cy.getByLabel("Choose an option").select(
        "Eligibility to become a teacher"
      );
      cy.clickNext();

      cy.contains("Accept privacy policy");
      cy.clickWithText("Yes");

      cy.clickWithText("Book your callback");
      cy.contains("Callback confirmed");
    });
  });

  const signUp = (firstName, lastName, email) => {
    cy.contains("Get personalised guidance to your inbox");
    submitPersonalDetails(firstName, lastName, email);

    cy.contains("Do you have a degree?");
    cy.clickWithText("Yes, I already have a degree");
    cy.clickNext();

    cy.contains("How close are you to applying for teacher training?");
    cy.clickWithText("I’m not sure and finding out more");
    cy.clickNext();

    cy.getByLabel("Which subject do you want to teach?").select("Chemistry");
    cy.clickNext();

    cy.clickWithText("Yes");
    cy.getByLabel("Your postcode").type("TE5 1NG");
    cy.clickNext();

    cy.contains("Accept privacy policy");
    cy.clickWithText("Yes");
    cy.clickCompleteSignUp();

    cy.contains("you're signed up");
  };

  const submitPersonalDetails = (firstName, lastName, email) => {
    cy.getByLabel("First name").type(firstName);
    cy.getByLabel("Last name").type(lastName);
    cy.getByLabel("Email address").type(email);
    cy.clickNext();
  };
});
