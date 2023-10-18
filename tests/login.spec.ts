import { test, expect, chromium } from "@playwright/test";
import loginPage from "../pages/loginPage";
import homePage from "../pages/homePage";
/*
This test file contains 2 seperated test.describe methods:
Because the 1 uses built-in page-fixture
and the 2 needed to create Browser and Context for its tests.
*/

const userEmail: string = "a@b.c";
const userPassword: string = "Aa123456";

test.describe("basic login tests", () => {
  test.beforeEach(async ({ page }) => await page.goto(""));

  test("has title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Recent Connections" })
    ).toBeVisible();
  });

  test("log in", async ({ page }) => {
    // Do login
    await page.getByRole("textbox", { name: "email" }).fill(userEmail);
    await page.getByRole("textbox", { name: "Password" }).fill(userPassword);
    // All these 3 are the same:
    // await page.getByRole("button", { name: "log in" }).click();
    // await page.click("text=Log In");
    await page.click("'Log In'");

    // await page.waitForTimeout(3000); // the corresponding for thread.sleep

    // Expects page to have a specific heading.
    await expect(
      page.getByRole("heading", { name: "People you follow" })
    ).toBeVisible({ timeout: 20000 }); // Might needed to extand timeout due to long loading time
  });

  test("log in with POM", async ({ page }) => {
    const login = new loginPage(page);
    const home = await login.doLogin(userEmail, userPassword);

    // Expect page to be displayed
    await home.isDisplayed();
  });
});

test.describe("multi session tests", () => {
  test("log in and open another tab", async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    page.goto("");

    // First tab
    const login = new loginPage(page);
    const home = await login.doLogin(userEmail, userPassword);
    await home.isDisplayed();

    // Sec tab
    const page2 = await context.newPage();
    page2.goto("");
    const home2 = new homePage(page2);
    await home2.isDisplayed();
  });

  test("log in in 2 windows", async () => {
    const browser = await chromium.launch({ headless: false });
    // First context
    const context = await browser.newContext();
    const page = await context.newPage();

    page.goto("");
    const login = new loginPage(page);
    const home = await login.doLogin(userEmail, userPassword);
    await home.isDisplayed();

    // Sec context
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    page2.goto("");

    const login2 = new loginPage(page2);
    const home2 = await login2.doLogin(userEmail, userPassword);
    await home2.isDisplayed();
  });
});
