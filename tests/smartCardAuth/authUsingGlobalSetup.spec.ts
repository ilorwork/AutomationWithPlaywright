import { test } from "@playwright/test";

// This solution doesn't work because the global setup is using a different "page" obj,
// and when the test executes the auth alert shows up again
// even thogh we pass it's context using storageState: STORAGE_STATE at the project config.
test("auth using global setup", async ({ page }) => {
  await page.goto("/");
  await page.locator("#edit-name").fill("fdsafdsa");
  await page.waitForTimeout(2000);
});
