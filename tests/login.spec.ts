import { test, expect, chromium, Page } from "@playwright/test";
import loginPage from "../pages/loginPage";
import homePage from "../pages/homePage";
import navBarPage from "../pages/navBarPage";
import NotImplementedError from "../helpers/errors";
import { getEnvVars } from "../helpers/envVars";
/*
This test file contains 2 seperated test.describe methods:
Because the 1 uses built-in page-fixture
and the 2 needed to create Browser and Context for its tests.
*/

const { USER_DATA_DIR, USER_EMAIL, USER_PASSWORD } = getEnvVars(process.env);

test.describe("basic login tests", () => {
  test.beforeEach(async ({ page }) => await page.goto(""));

  test("has title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Recent Connections" })
    ).toBeVisible();
  });

  test("log in", async ({ page }) => {
    // Do login
    await page.getByRole("textbox", { name: "email" }).fill(USER_EMAIL);
    await page.getByRole("textbox", { name: "Password" }).fill(USER_PASSWORD);
    // All these 3 are the same: (The third option is a shortcut for line 2 and works only on text)
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
    const home = await login.doLogin(USER_EMAIL, USER_PASSWORD);

    // Expect page to be displayed
    await home.isPageDisplayed();
  });
});

test.describe("login with chrome profile tests", () => {
  let page: Page;

  test.beforeEach(async ({}, testInfo) => {
    // Prevent the test from running on a certain browser/environment
    if (testInfo.project.name !== "chromium") test.skip();

    const browserContext = await chromium.launchPersistentContext(
      USER_DATA_DIR,
      {
        channel: "chrome",
      }
    );

    page = browserContext.pages().at(0) as Page;
    if (!page) page = await browserContext.newPage();

    await page.goto("");
    const login = new loginPage(page);
    const home = await login.doLogin(USER_EMAIL, USER_PASSWORD);
    await home.isPageDisplayed();
  });

  test.afterEach(async ({}) => {
    const navBar = new navBarPage(page);
    await navBar.doLogout();
    await navBar.isPageDisplayed();
  });

  test.fixme(
    "login with pc chrome user-profile-data",
    async (
      {
        /* when using browser in beforeHook, page here is useless */
      }
    ) => {}
  );

  test.fixme("login with user-profile via recent connections", async ({}) => {
    // Need to be developed
    throw new NotImplementedError("Incomplete test");
  });
});

test.describe("multi session tests", () => {
  test("log in and open another tab", async () => {
    const browser = await chromium.launch({
      // Note: all of this configs can be set globally via "use" section in the playwright.config file
      // headless: false,
      channel: "chrome", // Make test run on the computer's chrome browser
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    page.goto("");

    // First tab
    const login = new loginPage(page);
    const home = await login.doLogin(USER_EMAIL, USER_PASSWORD);
    await home.isPageDisplayed();

    // Sec tab
    const page2 = await context.newPage();
    page2.goto("");
    const home2 = new homePage(page2);
    await home2.isPageDisplayed();
  });

  test("log in in 2 windows", async () => {
    const browser = await chromium.launch({ headless: false });
    // First context
    const context = await browser.newContext();
    const page = await context.newPage();

    page.goto("");
    const login = new loginPage(page);
    const home = await login.doLogin(USER_EMAIL, USER_PASSWORD);
    await home.isPageDisplayed();

    // Sec context
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    page2.goto("");

    const login2 = new loginPage(page2);
    const home2 = await login2.doLogin(USER_EMAIL, USER_PASSWORD);
    await home2.isPageDisplayed();
  });
});
