import { test, expect, chromium, Page } from "@playwright/test";
import loginPage from "../pages/loginPage";
import homePage from "../pages/homePage";
import navBarPage from "../pages/navBarPage";
import NotImplementedError from "../helpers/errors";
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
    await home.isPageDisplayed();
  });
});

// Neet to check if there is a way to deny a test from running on a certain browser/environment
test.describe("login with chrome profile tests", () => {
  let page: Page;

  test.beforeEach(async ({}, testInfo) => {
    if (testInfo.project.name !== "chromium") test.skip();

    const userDataDir =
      "C:\\Users\\Ilor\\AppData\\Local\\Google\\Chrome\\User Data";
    const browserContext = await chromium.launchPersistentContext(userDataDir, {
      channel: "chrome",
    });

    page = browserContext.pages().at(0) as Page;
    if (!page) page = await browserContext.newPage();

    await page.goto("");
    const login = new loginPage(page);
    const home = await login.doLogin("a@b.c", "Aa123456");
    await home.isPageDisplayed();
  });

  test.afterEach(async ({}) => {
    const navBar = new navBarPage(page);
    await navBar.doLogout();
    //try {
    await navBar.isPageDisplayed();
    //} catch (error) {
    //if (error instanceof NotImplementedError)
    //console.log("NotImplementedError");
    //}
    // await page.waitForTimeout(3000);
  });

  test.fixme(
    "login with pc chrome user-profile-data",
    async (
      {
        /* when using browser in beforeHook page here is useless */
      }
    ) => {}
  );

  test.fixme("login with user-profile via recent connections", async ({}) => {
    // Need to be developed
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
    const home = await login.doLogin(userEmail, userPassword);
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
    const home = await login.doLogin(userEmail, userPassword);
    await home.isPageDisplayed();

    // Sec context
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    page2.goto("");

    const login2 = new loginPage(page2);
    const home2 = await login2.doLogin(userEmail, userPassword);
    await home2.isPageDisplayed();
  });
});
