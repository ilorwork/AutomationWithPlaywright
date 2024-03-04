import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => await page.goto(""));

const regexTitle = new RegExp(`MeetMusic`);

test("first test @sanity @owner", async ({ page }) =>
  await expect(page).toHaveTitle(regexTitle));

test("second test @sanity@owner", async ({ page }) =>
  await expect(page).toHaveTitle(regexTitle));

test("third test @sanity", async ({ page }) =>
  await expect(page).toHaveTitle(regexTitle));
