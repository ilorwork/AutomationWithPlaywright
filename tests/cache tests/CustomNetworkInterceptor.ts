import path from "path";
import { chromium, Browser, BrowserContext, Page, Response } from "playwright";

export default class CustomNetworkInterceptor {
  private cache: { [url: string]: string }; // Your cache mechanism
  private cacheDirectory: string = path.join(__dirname, "myCache");
  private cacheFilePath: string = path.join(__dirname, "myCache", "cache.json");

  constructor() {
    this.cache = this.loadCacheFromFile();
  }

  public async intercept(route: any, request: any) {
    const url = request.url();
    if (url in this.cache) {
      // Serve cached response
      await route.fulfill({
        body: this.cache[url],
        contentType: "text/html", // Adjust content type as needed
      });
    } else {
      // Proceed with real-world HTTP transactions
      await route.continue();
      try {
        const response = await route.request().response();
        // const json = await response.json();
        // this.saveCacheToFile(response);

        const fileName = url.replace(/[:/]/g, "_"); // Replace special characters in URL
        const filePath = path.join(this.cacheDirectory, `${fileName}.json`);

        this.saveCacheToFile(filePath, response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  public saveCacheToFile(filePath, json) {
    // Write cache to file
    const fs = require("fs");
    if (!fs.existsSync(path.dirname(this.cacheFilePath))) {
      fs.mkdirSync(path.dirname(this.cacheFilePath), { recursive: true });
    }
    fs.writeFileSync(this.cacheFilePath, json);
    // Myabe I should close the file connection here(using fynally)
  }

  public loadCacheFromFile() {
    // Load cache from file
    const fs = require("fs");
    if (fs.existsSync(this.cacheFilePath)) {
      const cacheData = fs.readFileSync(this.cacheFilePath, "utf8");
      return JSON.parse(cacheData);
    }
  }
}
