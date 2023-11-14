const url = "https://www.lambdatest.com/selenium-playground/simple-form-demo";

// ########################## Cypress ##########################
describe("Simple Form Demo - Cypress", () => {
  beforeEach(() => cy.visit(url));

  it("should successfully submit the form using Cypress", () => {
    cy.get("#user-message").type("Cypress Test");
    cy.get("#showInput").click();
    cy.get("#message").contains("Cypress Test");
  });
});

// ########################## Playwright ##########################
test.describe("Simple Form Demo - Playwright", () => {
  test.beforeEach(async ({ page }) => await page.goto(url));

  test("Submit form using Playwright", async ({ page }) => {
    await page.fill("#user-message", "Playwright Test");
    await page.click("#showInput");
    const successMessage = await page.textContent("#message");
    expect(successMessage).toBe("Playwright Test");
  });
});
