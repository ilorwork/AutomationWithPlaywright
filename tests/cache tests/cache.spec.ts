import test, {
  Browser,
  BrowserContext,
  Page,
  chromium,
  expect,
} from "@playwright/test";
import CustomNetworkInterceptor from "./CustomNetworkInterceptor";

test.fixme("cache to use offline", async ({}) => {
  const interceptor = new CustomNetworkInterceptor();

  const browser: Browser = await chromium.launch({ headless: false });
  const context: BrowserContext = await browser.newContext();

  // Load cache from file
  //   interceptor.loadCacheFromFile();

  // Create a custom context with the network interceptor
  context.setDefaultNavigationTimeout(60000); // Set a timeout if needed
  await context.route("**/*", interceptor.intercept.bind(interceptor));

  const page: Page = await context.newPage();
  await page.goto("https://meetmusic.onrender.com");

  // Your scraping/testing code here
  await expect(page).toHaveTitle(/MeetMusic/);
  // await page.waitForTimeout(10000)

  // Save cache to file
  //   interceptor.saveCacheToFile();

  await browser.close();
});
