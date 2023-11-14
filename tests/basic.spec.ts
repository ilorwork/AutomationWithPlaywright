import { test, expect } from "@playwright/test";

test.beforeEach(async ({page}, testInfo) => {
  console.log(`Running ${testInfo.title}`); // logs the test name
  // open a URL
  await page.goto("");
  // clean up the DB
  // create a page object
  // dismiss a modal
  // load params
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring (using Regex).
  await expect(page).toHaveTitle(/MeetMusic/);
  // await page.waitForTimeout(10000)
});

// test("has title2", async ({ page }) => await expect(page).toHaveTitle(/MeetMusic/));
// test("has title3", async ({ page }) => await expect(page).toHaveTitle(/MeetMusic/));
