import { test, expect, chromium } from "@playwright/test";
import loginPage from "../pages/loginPage";
/*
This test file contains 2 seperated test.describe methods:
Because the 1 uses built-in page-fixture
and the 2 needed to create Browser and Context for its tests.
*/

test.describe("basic login tests", () => {
  test.beforeEach(async ({ page }) => await page.goto(""));

  test("has title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Recent Connections" })
    ).toBeVisible();
  });

  test("log in", async ({ page }) => {
    // Do login
    await page.getByRole("textbox", { name: "email" }).fill("a@b.c");
    await page.getByRole("textbox", { name: "Password" }).fill("Aa123456");
    // All these 3 are the same:
    // await page.getByRole("button", { name: "log in" }).click();
    // await page.click("text=Log In");
    await page.click("'Log In'");

    await page.waitForTimeout(3000); // the corresponding for thread.sleep

    // Expects page to have a specific heading.
    await expect(
      page.getByRole("heading", { name: "People you follow" })
    ).toBeVisible();
  });

  test("log in with POM", async ({ page }) => {
    const login = new loginPage(page);
    // Do login
    const home = await login.doLogin("a@b.c", "Aa123456");

    // Expects page to have a specific heading.
    // await expect(
    //   page.getByRole("heading", { name: "People you follow" })
    // ).toBeVisible();
    // await home.isDisplayed();
    // await expect(a).toBeVisible();
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
    await login.doLogin("a@b.c", "Aa123456");

    // Sec tab
    const page2 = await context.newPage();
    page2.goto("");
    await page.waitForTimeout(3000); // Required if there are no other action after navigation - test fail whithout it
  });

  test("log in in 2 windows", async () => {
    const browser = await chromium.launch({ headless: false });
    // First context
    const context = await browser.newContext();
    const page = await context.newPage();

    page.goto("");
    const login = new loginPage(page);
    await login.doLogin("a@b.c", "Aa123456");

    // Sec context
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    page2.goto("");

    await page.waitForTimeout(3000);

    page.goto("");
    const login2 = new loginPage(page2);
    await login2.doLogin("a@b.c", "Aa123456");
    await page.waitForTimeout(3000); // Required if there are no other action after navigation - missing report data whithout it
  });
});
