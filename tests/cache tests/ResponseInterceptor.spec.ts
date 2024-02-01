import { chromium, Browser, BrowserContext, Page, Route } from "playwright";
import * as fs from "fs";
import * as path from "path";
import test from "@playwright/test";

interface ResponseData {
  body: string;
  headers: { [key: string]: string };
}

export default class ResponseInterceptor {
  // private responses: { [url: string]: string } = {};
  private responses: { [url: string]: ResponseData } = {};
  private cacheDirectory = path.join(__dirname, "responses");
  private cacheFilePath = path.join(this.cacheDirectory, "responses.json");

  public async intercept(route: any, request: any) {
    const url = await request.url();

    if (url in this.responses) {
      const cachedRes = this.responses[url];
      // Serve cached response
      await route.fulfill({
        // json: this.responses[url],
        body: cachedRes.body,
        headers: cachedRes.headers,
        // contentType: "text/html", // Adjust content type as needed
      });
    } else {
      await route.continue();
      try {
        const response = await route.request().response();
        if (response) {
          // const url = await response.url();
          const responseBody = await response.body();
          const responseHeaders = response.headers();
          // const responseBody2 = await route.request().postData();
          // const data = await response.json();
          this.responses[url] = {
            body: responseBody.toString(),
            headers: responseHeaders,
          };
          // this.responses[url] = responseBody.toString(); // (the first html&css reqs will wait to the js req if "defer" is being set by the app developer)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  public saveResponsesToFile(filePath: string = this.cacheFilePath) {
    // Write cache to file
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(this.responses /* , null, 2 */));
    // Myabe I should close the file connection here(using fynally)
  }

  public loadCacheFromFile(filePath: string = this.cacheFilePath) {
    // Load cache from file
    if (fs.existsSync(filePath)) {
      const cacheData = fs.readFileSync(filePath, "utf8");
      this.responses = JSON.parse(cacheData);
    }
  }
}

test("cache requests", async ({}) => {
  const interceptor = new ResponseInterceptor();
  interceptor.loadCacheFromFile();

  const browser: Browser = await chromium.launch({ headless: false });
  const context: BrowserContext = await browser.newContext();

  // Intercept all requests and save responses
  // await context.route("**/*", interceptor.intercept.bind(interceptor));
  const page: Page = await context.newPage();
  await page.route(
    "**/*",
    async (route, request) => await interceptor.intercept(route, request)
  );

  // await page.goto("https://meetmusic.onrender.com");
  await page.goto("https://playwright.dev/");
  // await page.goto("https://demo.playwright.dev/api-mocking/");

  // Your scraping/testing code here

  // Save responses to JSON file
  interceptor.saveResponsesToFile();

  await page.waitForTimeout(3000);

  await browser.close();
});
