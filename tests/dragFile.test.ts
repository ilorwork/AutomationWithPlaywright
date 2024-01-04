/// <reference lib="dom"/>
import test, { expect } from "@playwright/test";
import { readFileSync } from "fs";

// test("drag file", async ({page}) =>{
// const { test, expect } = require('@playwright/test');

test("drag and drop file", async ({ page }) => {
  // Navigate to the page with the drop zone
  await page.goto("https://www.dragdrop.com/test/");

  // Read your file into a buffer.
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

  // Now dispatch
  await page.dispatchEvent("#demo-upload", "drop", { dataTransfer });

  await page.waitForTimeout(4000);

  await page.locator(`[href="/test"]`).click();
  await page.waitForTimeout(8000);
});

test("drag and drop file2", async ({ page }) => {
  // Navigate to the page with the drop zone
  await page.goto("https://www.dragdrop.com/test/");

  // Read your file into a buffer.
  const buffer = readFileSync("./image-1.png");

  // Create the DataTransfer and File
  const dataTransfer = await scope.page.evaluateHandle((data) => {
    const dt = new DataTransfer();
    // Convert the buffer to a hex array
    const file = new File([data.toString("hex")], "image-1.png", {
      type: "application/png",
    });
    dt.items.add(file);
    return dt;
  }, buffer);

  // Now dispatch
  await page.dispatchEvent("#demo-upload", "drop", { dataTransfer });

  await page.waitForTimeout(4000);

  await page.locator(`[href="/test"]`).click();
  await page.waitForTimeout(8000);
});
