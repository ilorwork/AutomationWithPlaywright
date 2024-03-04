import { test, expect } from "@playwright/test";

// test.afterAll(async ({ page }) => page.removeListener("request", logRequest));

const regexTitle = new RegExp(`MeetMusic`);

test("regular page load", async ({ page }) => {
  await page.goto("");
  await expect(page).toHaveTitle(regexTitle);
});

test("load page until the DOMContentLoaded event is fired", async ({
  page,
}) => {
  await page.goto("", { waitUntil: "domcontentloaded" }); // wait for the DOMContentLoaded event to be fired
  await expect(page).toHaveTitle(regexTitle);
});

test("load page until network is idle for 500 mili-sec", async ({ page }) => {
  // wait until there are no network connections for at least 500 ms.
  // Don't use this method for testing, rely on web assertions to assess readiness instead.
  await page.goto("", { waitUntil: "networkidle" });
  await expect(page).toHaveTitle(regexTitle);
});

// doesnot prints "Page loaded!"
test.fixme("listen to the page to load", async ({ page }) => {
  await page.goto("");
  await page.waitForLoadState();
  console.log("Print Check");
  page.once("load", () => console.log("Page loaded!"));

  await page.waitForTimeout(1000);
  await expect(page).toHaveTitle(regexTitle);
});

// Note that goto already waits for "load" event to finish. this is just an POC example.
test("wait For page-load Event", async ({ page }) => {
  const loadPromise = page.waitForEvent("load");
  await page.goto("");
  page = await loadPromise;
  await page.waitForLoadState(); // default state to wait for is `load`
  await expect(page).toHaveTitle(regexTitle);
});
