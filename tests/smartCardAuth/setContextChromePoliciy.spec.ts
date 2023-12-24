import test, { expect } from "@playwright/test";
import { chromium } from "playwright";

const policies = {
  AutoSelectCertificateForUrls: {
    "1": {
      pattern: "myUrl",
      filter: {
        SUBJECT: {
          CN: "MyCert",
        },
      },
    },
  },
};

test("set chrome policy via context", async ({ browser }) => {
  //   const browser = await chromium.launch();
  const context = await browser.newContext({
    permissions: ["geolocation"],
    // chromiumSandbox: false,
    ...policies, // pass policies here
  });

  // Use the context...
  const page = await context.newPage();

  await page.goto("https://e.newgov.gov.il/");

  //   await page.pause();

  await browser.close();
});
