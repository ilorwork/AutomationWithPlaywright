import ks from "node-key-sender";
import NotImplementedError from "../../helpers/errors";
import { expect } from "@playwright/test";
import test from "../../fixtures/pfxLoginFixture";

test("handle auth with node-key-sender using fixture", async ({ page }) => {
  await page.locator("#edit-name").fill("fdsafdsa");
  await page.locator("#edit-pass").fill("54235423");
  await page.locator("#edit-submit").click();

  //   await expect(page.locator(".messages.error")).toBeVisible();
  await expect(page.locator(".messages.error")).toContainText(
    "שם המשתמש והסיסמא אינם מוכרים"
  );

  // await page.waitForTimeout(2000);
});

test.skip("handle authentication using node-key-sender", async ({ page }) => {
  try {
    await page.goto("", { timeout: 2000 });
  } catch (error) {
    ks.setOption("globalDelayPressMillisec", 1000);
    // Do not touch the keyboard while this code run!!
    await ks.sendKey("down");
    await ks.sendKey("enter");
  }

  // await ks.sendKey("enter");
  // await ks.sendKey("0");
  // await ks.sendKey("0");
  // await ks.sendKey("0");
  // await ks.sendKey("0");
  // await ks.sendKey("enter");

  // await ks.sendKey(["0", "0", "0", "0"]);

  //   await page.goto(""); // should use credentials

  await page.locator("#edit-name").fill("fdsafdsa");
  await page.locator("#edit-pass").fill("54235423");
  await page.locator("#edit-submit").click();

  //   await expect(page.locator(".messages.error")).toBeVisible();
  await expect(page.locator(".messages.error")).toContainText(
    "שם המשתמש והסיסמא אינם מוכרים"
  );

  await page.waitForTimeout(2000);

  // await page.pause()
});

// test("handle", async ({}) => {
//   //   await page.goto(""); // should use credentials

//   await page.locator("#edit-name").fill("fdsafdsa");
//   await page.locator("#edit-pass").fill("54235423");
//   await page.locator("#edit-submit").click();

//   //   await expect(page.locator(".messages.error")).toBeVisible();
//   await expect(page.locator(".messages.error")).toContainText(
//     "שם המשתמש והסיסמא אינם מוכרים"
//   );

//   await page.waitForTimeout(2000);

//   // await page.pause()
// });
