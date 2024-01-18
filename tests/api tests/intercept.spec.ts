import { test, expect } from "@playwright/test";

test.beforeEach(
  async ({ page }) => await page.goto("https://meetmusic.onrender.com/")
);

// trying to answer this: https://stackoverflow.com/questions/77840069/playwright-js-how-to-intercept-on-http-calls-on-button-click

test("works perfectly", async ({ page }) => {
  const responsePromise = page.waitForResponse(
    "https://countriesnow.space/api/v0.1/countries"
  ); // note no 'await' here
  await page.locator("//button[text()='Create a new account']").click();
  const response = await responsePromise;

  // Check request status
  expect(response.status()).toBe(200);

  // Check the request body
  const data = await response.json();
  console.log(data);
});

// test("intercept http requests on click", async ({ page }) => {
//   const responsePromise1 = page.waitForResponse("/endpoint1"); // note no 'await' here
//   const responsePromise2 = page.waitForResponse("/endpoint2"); // note no 'await' here

//   await page.locator("<button locator>").click();

//   const response1 = await responsePromise1;
//   const response2 = await responsePromise2;

//   // Check requests status
//   expect(response1.status()).toBe(200);
//   expect(response2.status()).toBe(200);

//   // Print the second request's body
//   const data = await response2.json();
//   console.log(data);
// });

// test("check", async ({ page }) => {
//   const responsePromise = page.route(
//     "https://countriesnow.space/api/v0.1/countries",
//     (route) => route.continue()
//   ); // note no 'await' here
//   await page.locator("//button[text()='Create a new account']").click();
//   const response = await responsePromise;

//   expect(response.status()).toBe(200);

//   // Check the request body
//   const data = await response.json();
//   console.log(data);
// });

// test("Click on button and assert specific request", async ({ page }) => {
//   // Intercept the specific request
//   const [interceptedRequest] = await Promise.all([
//     page.waitForRequest("https://countriesnow.space/api/v0.1/countries"),
//     page.route("https://countriesnow.space/api/v0.1/countries", (route) => {
//       route.continue();
//     }),
//   ]);

//   // Click on the button that triggers the request
//   await page.locator("//button[text()='Create a new account']").click();

//   // Check the response status code
//   const response = await interceptedRequest.response();
//   expect(response?.status()).toBe(200);

//   // Check the request body
//   const requestBody = await response?.body();
//   // Replace 'expected-body' with the actual expected body
//   expect(requestBody).toBe("expected-body");
// });

// test("Intercept requests and check responses", async ({ page }) => {
//   //   await page.goto("https://meetmusic.onrender.com/");

//   await page.route(
//     "https://countriesnow.space/api/v0.1/countries",
//     async (route) => {
//       await route.continue();
//       // await route.
//     }
//   );

//   //   await page.route()

//   //   // Intercept request1
//   //   const request1 = await page.waitForRequest(
//   //     "https://countriesnow.space/api/v0.1/countries"
//   //   );
//   //   //   await request1.continue();

//   //   // Intercept request2
//   //   const request2 = await page.waitForRequest("**/your/request2/endpoint");
//   //   //   await request2.continue();

//   // Click on the button
//   await page.locator("//button[text()='Create a new account']").click();

//   const request1 = await page.waitForRequest(
//     "https://countriesnow.space/api/v0.1/countries"
//   );
//   //   await request1.continue();

//   // Intercept request2
//   const request2 = await page.waitForRequest("**/your/request2/endpoint");

//   // Check response status code for request1
//   const res = await request1.response();
//   expect(res?.status()).toEqual(200);
//   //   expect(await request1.response()).toBe(200);

//   // Check request body for request2
//   const res2 = await request2.response();
//   const data = await res2?.json();
//   console.log(data);
// });
