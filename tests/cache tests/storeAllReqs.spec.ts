import { chromium, Browser, BrowserContext, Page, Route } from "playwright";
import * as fs from "fs";
import * as path from "path";
import test from "@playwright/test";

export default class ResponseInterceptor {
  private responses: { [url: string]: string } = {};
  private cacheDirectory = path.join(__dirname, "responses");
  private cacheFilePath = path.join(this.cacheDirectory, "responses.json");

  public async intercept(route: any, request: any) {
    let gotit;
    if (request.url() in this.responses) {
      gotit = "fdsafdsafdsa";
    }
    await route.continue();
    try {
      const response = await route.request().response();
      if (response) {
        const url = response.url();
        const responseBody = await response.body();
        this.responses[url] = responseBody.toString();
      }
    } catch (error) {
      console.log(error);
    }
  }

  public saveResponsesToFile(filePath: string = this.cacheFilePath) {
    // Write cache to file
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(this.responses, null, 2));
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
  //   const cacheDirectory = path.join(__dirname, "responses");
  //   const cacheFilePath = path.join(cacheDirectory, "responses.json");
  const interceptor = new ResponseInterceptor();
  interceptor.loadCacheFromFile();

  const browser: Browser = await chromium.launch({ headless: false });
  const context: BrowserContext = await browser.newContext();

  // Intercept all requests and save responses
  await context.route("**/*", interceptor.intercept.bind(interceptor));

  const page: Page = await context.newPage();
  await page.goto("https://meetmusic.onrender.com");

  // Your scraping/testing code here

  // Save responses to JSON file
  interceptor.saveResponsesToFile();

  await browser.close();
});

// main().catch((error) => console.error(error));
