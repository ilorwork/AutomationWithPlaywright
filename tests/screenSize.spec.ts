import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => await page.goto(""));

test("maximize browser via playwright.config only", async ({ page }) => {
  // See my answer here: https://stackoverflow.com/a/77550024/19574650
  /*
  **You need 3 things:**
  1. Add `args: ["--start-maximized"]` to the `launchOptions`
  2. **Remove** the *DeviceDescriptor* `Desktop Chrome` from your project
  3. Set `viewport: null` in your project
  
  Example `playwright.config` file:
  ``` TypeScript
  import { defineConfig, devices } from "@playwright/test";
  
  export default defineConfig({
    use: {
      launchOptions: {
        // 1
        args: ["--start-maximized"],
      },
    },
  
    projects: [
      {
        name: "chromium",
        use: {
          // 2 (Make sure DeviceDescriptor is not set)
          // ...devices["Desktop Chrome"],
  
          // 3
          viewport: null,
        },
      },
    ],
  });
  ```
  */

  await page.waitForTimeout(5000);
});

test("set my pc viewport size (maximized)", async ({ page }) => {
  // this is my viewport size { width: 1536, height: 703 }
  // but the browser window looks like I draged it to the right bottom a little bit. the right and the bottom edges are hidden and the left side and the top are not touching the actual pc window edge.
  await page.setViewportSize({ width: 1536, height: 703 });

  await page.waitForTimeout(5000);
});

// I've answered it here https://stackoverflow.com/a/77550054/19574650
test("costume viewport size", async ({ page }) => {
  // Get the current viewport size
  const originalViewport = page.viewportSize();

  if (originalViewport) {
    const newWidth = originalViewport.width - 30;
    const newHeight = originalViewport.height;

    // Set the new viewport size
    await page.setViewportSize({ width: newWidth, height: newHeight });

    const newViewPort = page.viewportSize();
    originalViewport.width = originalViewport.width - 30;
    expect(newViewPort).toEqual(originalViewport);
  }
});

test.fixme(
  "set my pc viewport size using evaluate and subtract it",
  async ({ page }) => {
    const pxToSubtract: number = 150;

    const width = await page.evaluate(() => window.outerWidth);
    const height = await page.evaluate(() => window.outerHeight);
    const newHeight = height - pxToSubtract;
    const newWidth = width - pxToSubtract;
    await page.setViewportSize({ width: newWidth, height: newHeight });

    const afterChangeWidth = await page.evaluate(() => window.outerWidth);
    const afterChangeHeight = await page.evaluate(() => window.outerHeight);

    // Keeps on failling, maybe I don't fully understand how the viewport subtract affect the size...
    expect(afterChangeWidth).toEqual(width - pxToSubtract);
    expect(afterChangeHeight).toEqual(height - pxToSubtract);

    await page.waitForTimeout(5000);
  }
);
