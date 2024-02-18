import test from "@playwright/test";
import fs from "fs";
import path from "path";
import axios from "axios";

/* 
This code navigates to `https://playwright.dev/` and uses `Axios` to download a specific image by streaming the
image data directly from the server's response to the file using [`fs.createWriteStream()`][1] and [`pipe()`][2] method,
without buffering it in memory.
  [1]: https://nodejs.org/api/fs.html#fscreatewritestreampath-options
  [2]: https://nodejs.org/api/stream.html#readablepipedestination-options
*/
test("download image from website", async ({ page }) => {
  const base_url = "https://playwright.dev/";
  await page.goto(base_url);

  // Extract the endpoint of the image
  const imageUrl = await page
    .locator("//img[@alt='Browsers (Chromium, Firefox, WebKit)']")
    .getAttribute("src");

  // Specify the path where you want to save the image
  const imagePath = path.join(__dirname, "downloaded_image.jpg");

  if (!imageUrl) throw new Error("image Url not found");

  // Use Axios to stream the image data
  const response = await axios.get(base_url + imageUrl, {
    responseType: "stream",
  });
  // Write the image data to a file directly
  const writer = fs.createWriteStream(imagePath);

  // Initiate the data flow between Axios response (readable stream) and fs writer (writable stream)
  response.data.pipe(writer);

  // this code is redundant because Node.js automatically manages the completion and error handling.
  // // Wait for the image to finish downloading
  // await new Promise((resolve, reject) => {
  //   writer.on("finish", resolve);
  //   writer.on("error", reject);
  // });

  console.log("Image downloaded successfully at:", imagePath);
});
/**
 * When we make a GET request using Axios (`axios.get(imageUrl, { responseType: 'stream' })`),
 * Axios returns a response object.
 * This response object has a `data` property which is a readable stream representing the response body.
 * By setting `responseType: 'stream'`,
 * Axios ensures that the response data is streamed instead of being loaded into memory all at once.
 *
 * The `.pipe()` method in Node.js is used to redirect the readable stream (`response.data`) into a writable stream (`writer`),
 * which is created using `fs.createWriteStream()` to write the data to a file.
 * This allows us to efficiently handle large files without consuming excessive memory.
 *
 * In summary,
 * `response.data.pipe(writer)` connects the readable stream of the response data to the writable stream of the file,
 * allowing the image data to be streamed directly from the server to the file on disk without buffering it in memory.
 */
