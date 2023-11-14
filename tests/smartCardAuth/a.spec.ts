import { test, chromium } from "@playwright/test";
import { AuthChallengeResponse } from "@playwright-core/types/protocol/fetch";
import NotImplementedError from "../../helpers/errors";
// import { AuthChallengeResponse } from 'playwright-core/types/protocol/network';
const fs = require('fs');

// Looks like those listeners are meant for simple http auth
test("Try CDPSession's authRequired listener", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Establish CDP session
  const client = await context.newCDPSession(page);

  // Listen for auth request
  client.on("Fetch.authRequired", async (event) => {
    // Get auth challenge details
    const { authChallenge, requestId } = event;

    // If client cert challenge
    if (authChallenge.origin === "ClientCertificateRequested") {
      const pfx = fs.readFileSync(
        "C:\\Users\\ilors\\Downloads\\AutomationWithPlaywright-main\\Jude Law.pfx"
      );
      console.log(pfx);

      // Build auth challenge response
      const authChallengeResponse = {
        response: "ProvideCredentials",
        username: pfx,
        password: process.env.PFX_PASSWORD,
        // pkcs12: /* ArrayBuffer of PFX data */
        // pkcs12: [Buffer.from('C:\\Users\\ilors\\Downloads\\AutomationWithPlaywright-main\\Jude Law.pfx').toString('base64')],
      };

      const response: AuthChallengeResponse = {
        response: "ProvideCredentials",
        username: "myusername",
        password: "mypassword"
      };

      // Send auth response
      await client.send("Fetch.continueWithAuth", {
        requestId,
        authChallengeResponse: response,
      });
    }
  });

  // const options = {
  //   waitUntil: 'domcontentloaded'
  // };

  // // Navigate to page
  // await page.goto("", options);
  try {
    await page.goto("", { timeout: 2000 });
  } catch (error) {
    if (error instanceof NotImplementedError) console.error(error.message);
  }
  await page.waitForTimeout(8000);

  await page.goto("", { timeout: 2000 });

  // Close browser
  await browser.close();
});


// import { SyncPlaywright } from 'playwright';
// test("bard", async () => {


//   // Create a new browser context
//   // const playwright = new SyncPlaywright();
//   // const context = await playwright.startContext();
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   // Create a CDPSession object for the context
//   const session = await context.newCDPSession(page);

//   // Define the callback function to handle certificate requests
//   const handleCertificateRequest = async (event) => {
//     // Retrieve the pfx info from your application or data store
//     // const pfxInfo = await getPfxInfo();
//     const pfxInfo = fs.readFileSync(
//       "C:\\Users\\ilors\\Downloads\\AutomationWithPlaywright-main\\Jude Law.pfx"
//     );

//     // Send the pfx info to the browser
//     await session.send(
//       `certificateRequested.send(${JSON.stringify(pfxInfo)})`
//     );
//   };

//   // Attach the callback function to the 'certificateRequested' event
//   await session.on('certificateRequested', handleCertificateRequest);

//   // Navigate to the web page that triggers the Smart Card authentication alert
//   const url = 'https://example.com/page-that-prompts-smart-card-auth';
//   await session.goto(url);

//   // Wait for the page to load completely
//   await new Promise((resolve) => {
//     session.once('load', resolve);
//   });

//   // Close the browser context
//   await context.close();


// });
