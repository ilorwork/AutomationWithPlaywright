import { test, expect } from "@playwright/test";

test.beforeEach(async ({}, testInfo) => {
  console.log(`Running ${testInfo.title}`); // logs the test name
  // open a URL
  // clean up the DB
  // create a page object
  // dismiss a modal
  // load params
});

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring (using Regex).
  await expect(page).toHaveTitle(/MeetMusic/);
});
