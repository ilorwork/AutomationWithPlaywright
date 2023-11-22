import { test, expect, chromium } from "@playwright/test";
const fs = require("fs");
const axios = require("axios");
const https = require("https");

test("client certificates", async ({}) => {
  const browser = await chromium.launch({
    args: ["--ignore-certificate-errors"],
  });

  // Load certificate files
  const pfxBuffer = fs.readFileSync(
    "C:\\Users\\ilors\\Downloads\\Jude Law.pfx"
  );
  const passphrase = process.env.PFX_PASSWORD;

  // Create browser context
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  });

  // Add route handler
  await context.route("**/*", async (route, request) => {
    // Build request options
    const url = new URL(request.url());
    console.log(url.href);
    console.log(url);
    const options = {
      url: url.origin,
      //   url: process.env.BASE_URL,
      method: request.method(),
      headers: request.headers(),
      httpsAgent: new https.Agent({ pfx: pfxBuffer, passphrase: passphrase }),
    };

    try {
      // Make request with axios
      const response = await axios(options);

      // Return response
      route.fulfill({
        status: response.status,
        body: response.data,
      });
    } catch (error) {
      // Handle errors
      //   console.error(error);
      throw error;
      //   route.abort(error);
    }
  });

  // Create test page
  const page = await context.newPage();

  // Navigate page
  await page.goto("");

  await page.goto("");
  // Assertions
  await expect(page).toHaveTitle(/ברוכים הבאים/);
  await page.waitForTimeout(3000);
});
