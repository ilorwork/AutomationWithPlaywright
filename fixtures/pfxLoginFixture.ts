// fixtures.ts
import ks from "node-key-sender";
import { Page, test as base } from "@playwright/test";

// export const test = base.extend({
//   page: async ({ page }, use) => {
//     await use(page);

//     try {
//       await page.goto("", { timeout: 2000 });
//     } catch (error) {
//       ks.setOption("globalDelayPressMillisec", 1000);
//       // Do not touch the keyboard while this code run!!
//       await ks.sendKey("down");
//       await ks.sendKey("enter");
//     }
//   },
// });

const test = base.extend<{ page: Page }>({
  // the <{ page: Page }> is not mandatory, but it looks like I should add it.
  page: async ({ page }, use) => {
    try {
      await page.goto("", { timeout: 2000 });
    } catch (error) {
      //   ks.setOption("globalDelayPressMillisec", 1000);
      // Do not touch the keyboard while this code run!!
      await ks.sendKey("down");
      await ks.sendKey("enter");
    }
    await use(page); // looks like the this use call need to be at the end of this code.
    // i don't understand why it behave like that or what it does and where it came from.
  },
});

export default test;

/* 
the key to make it work was to call `await use(page)` at the end of the fixture setup.

The reason for this is that `use` is actually a function that Playwright injects and passes to the fixture. This `use` function will execute the test body.

So by calling `await use(page)` at the end, it essentially chains things to:

1. Run the fixture setup 
2. Pass control to the test body via `use()`
3. Then the test body executes with the fixture applied

Without calling `use()` the control would never get passed back to the test body.

So while it may seem unusual to call a function that is passed in, that is how Playwright handles the execution flow under the hood.

In addition, the generic type syntax is not mandatory, but can help get auto-completions during development.

Understanding these fixtures and execution flow is very valuable for unlocking the power of Playwright.
*/
