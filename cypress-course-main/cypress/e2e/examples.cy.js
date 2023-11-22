describe("Various examples", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });

  it("multi-page testing", () => {
    cy.xpath("/html/body/ul/a[1]").click();
    cy.location("pathname").should("equal", "/");

    cy.xpath("/html/body/ul/a[2]").click();
    cy.location("pathname").should("equal", "/overview");

    cy.xpath("/html/body/ul/a[3]").click();
    cy.location("pathname").should("equal", "/fundamentals");

    cy.xpath("/html/body/ul/a[4]").click();
    cy.location("pathname").should("equal", "/forms");

    cy.xpath("/html/body/ul/a[5]").click();
    cy.location("pathname").should("equal", "/examples");
  });

  it("intercepts", () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      fixture: "example.json",
    });

    cy.xpath("/html/body/main/div[2]/button").click();
  });

  it.only("grudge", () => {
    cy.contains(/add some grudges/i);

    cy.xpath("/html/body/main/div[3]/ul").within(() => {
      cy.get("li").should("have.length", 0);
    });

    cy.xpath("/html/body/main/div[3]/div/div").within(() => {
      cy.get("input").type("some grudge");
    });

    cy.xpath("/html/body/main/div[3]/button").click();

    cy.xpath("/html/body/main/div[3]/ul").within(() => {
      cy.get("li").should("have.length", 1);
    });

    cy.xpath("/html/body/main/div[3]/div/div").within(() => {
      cy.get("input").type("number 2");
    });

    cy.xpath("/html/body/main/div[3]/button").click();

    cy.xpath("/html/body/main/div[3]/ul").within(() => {
      cy.get("li").should("have.length", 2);
    });

  });
});
