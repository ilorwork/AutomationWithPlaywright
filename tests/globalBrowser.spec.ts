import { test, expect, chromium } from "@playwright/test";
// let page;

test.beforeAll(async ({}) => {
  global.browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"],
  });
  global.context = await global.browser.newContext({ viewport: null });
});

test("has title", async ({}) => {
  const page = await global.context.newPage();

  await page.goto("");
  // Expect a title "to contain" a substring (using Regex).
  await expect(page).toHaveTitle(/ברוכים הבאים לאתר העריכה של gov.il/);
  // await page.waitForTimeout(10000)
});

test("has title2", async ({}): Promise<void> => {
  const page = await global.context.newPage();

  await page.goto("");
  await expect(page).toBeTruthy();
});

test("has title3", async ({}): Promise<void> => {
  const page = await global.context.newPage();

  await page.goto("");
  await expect(page).toHaveTitle(/MeetMusic/);
});
