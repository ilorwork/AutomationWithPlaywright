const { test, expect } = require("@playwright/test");
const fs = require("fs");

test("login with pfx", async ({ browser }) => {
  const pfx = fs.readFileSync(
    "C:\\Users\\ilors\\Downloads\\AutomationWithPlaywright-main\\Jude Law.pfx"
  );
  console.log(pfx);
  const context = await browser.newContext({
    httpsCredentials: {
      certificate: pfx,
      password: process.env.PFX_PASSWORD,
    },
  });

  const page = await context.newPage();

  const options = {
    waitUntil: "domcontentloaded",
  };

  // await page.url();

  await page.goto("", options);

  // Assertions to check logged in successfully

  await page.waitForTimeout(20000);
});

const { chromium } = require("playwright");

test("login with pfx3232", async ({}) => {
  const browser = await chromium.launchPersistentContext("", {
    headless: false, // Allow selecting cert
  });

  // const context = await browser.newContext();

  // Use OS installed certificate
  const page = await browser.newPage();

  await page.goto("");

  await browser.close();
});
