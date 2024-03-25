import test from "@playwright/test";
import { readFileSync } from "fs";

// This exapmle test simulates image drag-and-drop from pc to the drop-zone of www.dragdrop.com test site.
// In order for this test to work you should create an image file called "image-1.png",
// and place it at the project's root directory.

test("drag and drop file", async ({ page }) => {
  // Navigate to the page with the drop zone
  await page.goto("https://www.dragdrop.com/test/");

  // Read your file into a buffer
  const buffer = readFileSync("./image-1.png");

  // Create the DataTransfer and File
  const dataTransfer = await page.evaluateHandle((data) => {
    const dt = new DataTransfer();
    // Convert the buffer to a hex array
    const file = new File([data.toString("hex")], "image-1.png", {
      type: "application/png",
    });
    dt.items.add(file);
    return dt;
  }, buffer);

  // Now dispatch the "drop" event
  await page.dispatchEvent("#demo-upload", "drop", { dataTransfer });

  // Let the tester see the result
  await page.waitForTimeout(4000);

  // Clear
  await page.locator(`[href="/test"]`).click();
  await page.waitForTimeout(8000);
});
