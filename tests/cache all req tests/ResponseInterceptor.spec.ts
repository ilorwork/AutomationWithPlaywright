import * as fs from "fs";
import * as path from "path";
import test from "@playwright/test";

/* 
This file is written to answer this question: https://stackoverflow.com/q/77877288/19574650
the question:
```
I am doing some web scraping using playwright-python>=1.41, and have to launch the browser in a headed mode (e.g. launch(headless=False).

For CI testing, I would like to somehow cache the headed interactions with Chromium, to enable offline testing:

    First invocation: uses Chromium to make real-world HTTP transactions
    Later invocations: uses Chromium, but all HTTP transactions read from a cache

How can this be done? I can't find any clear answers on how to do this.
```

This code writing all server responses into a file on first execution of this test.
any other execution afterwords will check the cache first, if this res is in the cache, the req will get answered with the cached res.
if the res is not exists in the cache it will continue to the server.
*/

// Define response structure
interface ResponseData {
  body: string;
  headers: { [key: string]: string };
}

export default class ResponseCacher {
  private responses: { [url: string]: ResponseData } = {};
  private cacheFilePath = path.join(__dirname, "responses", "responses.json");

  public async intercept(route: any, request: any) {
    const url = await request.url();

    // If response exists in cache
    if (url in this.responses) {
      const cachedRes = this.responses[url];
      // Serve cached response
      await route.fulfill({
        body: cachedRes.body,
        headers: cachedRes.headers,
      });
      // If response isn't cashed
    } else {
      await route.continue();
      try {
        // Get res and store it in responses dictionary
        const response = await route.request().response();
        const responseBody = await response.body();
        const responseHeaders = response.headers();
        this.responses[url] = {
          body: responseBody.toString(),
          headers: responseHeaders,
        };
      } catch (error) {
        console.log(error);
      }
    }
  }

  public saveResponsesToFile() {
    // Create dir if not exist
    if (!fs.existsSync(path.dirname(this.cacheFilePath))) {
      fs.mkdirSync(path.dirname(this.cacheFilePath), { recursive: true });
    }
    // Write cache to file
    fs.writeFileSync(this.cacheFilePath, JSON.stringify(this.responses));
  }

  public loadCacheFromFile() {
    // Load cached responses from cache file
    if (fs.existsSync(this.cacheFilePath)) {
      const cacheData = fs.readFileSync(this.cacheFilePath, "utf8");
      this.responses = JSON.parse(cacheData);
    }
  }
}

let interceptor: ResponseCacher;

test.beforeEach(async ({ page }) => {
  interceptor = new ResponseCacher();
  interceptor.loadCacheFromFile();

  // Intercept all requests and save responses
  await page.route(
    "**/*",
    async (route, request) => await interceptor.intercept(route, request)
  );
});

test.afterEach(async ({ page }) => {
  interceptor.saveResponsesToFile();
});

test("cache requests", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Your scraping/testing code here

  await page.waitForTimeout(3000);
});
