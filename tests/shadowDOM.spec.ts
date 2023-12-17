import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("chrome://policy/");
});

test("locate shadow DOM element", async ({ page }) => {
  await page.getByText("AutoSelectCertificateForUrls").click();
  //   await expect(page).toHaveTitle(/MeetMusic/);
  await page.waitForTimeout(10000);
});
