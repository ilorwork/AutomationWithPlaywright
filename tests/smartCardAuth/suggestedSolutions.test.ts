import { chromium, test, /* Events */ } from "@playwright/test";
import * as CDP from "playwright-core";
const fs = require('fs');

// const { Runtime } = CDP;

import NotImplementedError from "../../helpers/errors";
// Maybe you'll be able to answer it after making it work - https://stackoverflow.com/questions/47796598/automated-testing-with-smart-card-authentication-selenium-or-other-option

test.describe("handle authentication alert tests", () => {
  test("handle alert according to chatGPT", async ({ page }) => {
    // NOTE: add alert "alert("myAlert")" at Email field's onChange listener
    // in order to make this test pass.
    await page.goto(process.env.BASE_URL);

    // Wait for the alert to appear
    page.on("dialog", (dialog) => {
      // dialog.accept();
      console.log(`Dialog message: ${dialog.message()}`);
    });

    // await page.getByRole("textbox", { name: "email" }).fill("fdsa");

    await page.waitForTimeout(4000);
  });

  test("handle authentication according to Cloude.ai", async ({}) => {
    const browser = await chromium.launch({
      headless: false,
      slowMo: 50, // slow down actions
    });

    const context = await browser.newContext({
      ignoreHTTPSErrors: true, // allow self-signed certs (I'm not sure if needed)
      // provide credentials
      httpCredentials: {
        // No need to pass here if you pass from the config file.
        username:
          "C:\\Users\\ilors\\Downloads\\AutomationWithPlaywright-main\\Jude Law.pfx",
        password: process.env.PFX_PASSWORD,
      },
    });
    const page = await context.newPage();

    // way 2
    // const context = await browser.newContext({
    //   acceptDownloads: true,
    //   extraHTTPHeaders: {
    //     'Authorization': 'Basic ' + Buffer.from('C:\\Users\\ilors\\Downloads\\AutomationWithPlaywright-main\\Jude Law.pfx').toString('base64'),
    //   },
    // });
    // const page = await context.newPage();

    // way 3
    await page.keyboard.press("Enter");

    // way 4 - Trying to combine chatGPT suggestion with Cloude's
    page.on("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss();
      // dialog.defaultValue()
    });

    await page.goto(""); // should use credentials

    await page.waitForTimeout(4000);

    // await page.pause()

    await browser.close();
  });

  test("check youtube lambda suggestions", async ({browser}) => {
    // const browser = await chromium.launch({
    //   headless: false, // for debugging
    //   slowMo: 50, // slow down actions
    // });

    const pfx = fs.readFileSync('C:\\Users\\ilors\\Downloads\\AutomationWithPlaywright-main\\Jude Law.pfx');
    console.log(pfx)
    const context = await browser.newContext({
      httpsCredentials: {
        certificate: pfx,
        password: process.env.PFX_PASSWORD
      }  
    });
    
    const page = await context.newPage();

    // Establish CDP session
    const client = await context.newCDPSession(page); // I think we should try to add httpCredentials here.
    try {
      await page.goto("", { timeout: 2000 });
    } catch (error) {
      if (error instanceof NotImplementedError) console.error(error.message);
    }
    await page.waitForTimeout(4000);
    // const dialogOpened = Runtime.dialogOpened;
    // CDP.chromium.connectOverCDP

    // Handle dialogOpened event
    // client.on(dialogOpened, async (event) => {
    //   if (event.type === "alert") {
    //     // Dismiss alert
    //     await client.send(dialogOpened, {
    //       accept: true,
    //     });

    //     console.log("Alert dismissed!");
    //   }
    // });

    // // Listen for dialog events via Runtime domain
    // client.on('Events.Runtime.dialogOpened', async event => {

    //     if(dialog.type === 'alert') {

    //       if (dialog.message.includes('Insert smart card')) {

    //         await dialog.dismiss();

    //         // Begin smart card session
    //         const sessionId = await client.SmartCard.beginSession({
    //           readerId: 'reader-001'
    //         });

    //         // Build APDU login command
    //         const command = '00A4040010A0000000031010';

    //         // Send APDU command to card
    //         await client.SmartCard.sendCommand({
    //           sessionId,
    //           command
    //         });

    //         // Check response is OK
    //         const response = await client.SmartCard.sendCommand({
    //           sessionId,
    //           command: '00C00000'
    //         });

    //         if(response.status === 'OK') {
    //           console.log('Smart card login successful');
    //         }

    //         // End session
    //         await client.SmartCard.endSession({sessionId});

    //       } else {
    //         // Handle other alerts
    //       }

    //     }

    //   });

    // Navigate to page that triggers smart card auth
    await page.goto("");
    await page.waitForTimeout(4000);
    // await page.pause()

    // Close browser
    await browser.close();

    // await page.goto(""); // will use credentials

    // await browser.close();
  });

  test("check all listeners behavior", async ({}) => {
    const browser = await chromium.launch({
      headless: false, // for debugging
      slowMo: 50, // slow down actions
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    context.on("dialog", (dialog) => {
      // dialog.accept();
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss();
      // dialog.defaultValue()
    });

    page.on("dialog", (dialog) => {
      console.log(`D`);
    });
    page.on("domcontentloaded", (dialog) => {
      console.log(`D`);
    });
    page.on("frameattached", (dialog) => {
      console.log(`D`);
    });
    page.on("framenavigated", (dialog) => {
      console.log(`D`);
    });
    page.on("load", (dialog) => {
      console.log(`D`);
    });
    page.on("console", (dialog) => {
      console.log(`D`);
    });
    page.on("pageerror", (dialog) => {
      console.log(`D`);
    });
    page.on("websocket", (dialog) => {
      console.log(`D`);
    });
    page.on("popup", (dialog) => {
      console.log(`D`);
    });
    page.on("request", (req) => {
      console.log(`D`, req);
    });
  });
});
