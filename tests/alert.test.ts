import { chromium, test } from "@playwright/test";
// Maybe you'll be able to answer it after making it work - https://stackoverflow.com/questions/47796598/automated-testing-with-smart-card-authentication-selenium-or-other-option

test.describe.skip("handle authentication alert tests", () => {
  test("handle alert according to chatGPT", async ({ page }) => {
    // NOTE: add alert "alert("myAlert")" at Email field's onChange listener
    // in order to make this test pass.
    await page.goto("");

    // Wait for the alert to appear
    page.on("dialog", (dialog) => {
      dialog.accept();
      console.log(`Dialog message: ${dialog.message()}`);
    });

    await page.getByRole("textbox", { name: "email" }).fill("fdsa");

    await page.waitForTimeout(8000);
  });

  test("handle authentication according to Cloude.ai", async ({}) => {
    const browser = await chromium.launch({
      headless: false, // for debugging
      slowMo: 50, // slow down actions
    });

    const context = await browser.newContext({
      // ignoreHTTPSErrors: true, // allow self-signed certs (I'm not sure if needed)
      // provide credentials
      // httpCredentials: { // No need to pass here if you pass from the config file.
      //   username: "foo",
      //   password: "bar",
      // },
    });

    const page = await context.newPage();

    await page.goto("https://example.com"); // will use credentials

    await browser.close();
  });
});
