import test, { expect } from "@playwright/test";

/* Unable to execute the anonymous test, but according to Cloude it has some disadvantages:
* No visibility or reporting like a test framework
* No retries, before/after hooks, etc
* Need to handle errors and cleanup manually

* I've added:
* No built-in fixtures
* No test name
*/

// Test syntax comparison:
test("my test", async ({}) => {
  // test actions...
});

// vs an async IIFE (immediately invoked function expression):

(async () => {
  // test actions
  console.log("Running test...");

  // assertions
  expect(true).toBe(true);

  console.log("Test finished");
})();
