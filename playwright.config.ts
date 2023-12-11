import { defineConfig, devices } from "@playwright/test";
import path from "path";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config(); // Note!!! process.env is being augmented by helpers\env.d.ts file.

export const STORAGE_STATE = path.join(__dirname, "playwright/.auth/user.json");
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { open: "always" }]],

  // timeout: 5 * 60 * 1000,

  // path to the global setup files.
  // globalSetup: require.resolve("./global-setup"),

  // path to the global teardown files.
  // globalTeardown: require.resolve("./global-teardown"),

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: "https://meetmusic.onrender.com/",
    // baseURL: "http://localhost:3000/login",
    baseURL: process.env.BASE_URL,
    // channel: "chrome", // Make all tests run on the computer's chrome browser

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure", // on any faliure including retries
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: false,

    channel: "chrome",
    ignoreHTTPSErrors: true, // ????????????????????
    // httpCredentials: {
    //   // https://playwright.dev/docs/api/class-testoptions#test-options-http-credentials
    //   username: "C:\\Users\\ilors\\Downloads\\AutomationWithPlaywright-main\\Jude Law.pfx",
    //   password: "<Pfx password>", // process.env.PFX_PASSWORD
    // },

    launchOptions: {
      slowMo: 100,
      args: ["--start-maximized"],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    // globalSetup:
    {
      name: "setup",
      testMatch: /global.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        /* ...devices["Desktop Chrome"], */ viewport:
          null /* storageState: STORAGE_STATE */,
      },
      // dependencies: ["setup"],
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
