import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => await page.goto(""));
// Both of this tests should prevent the app icon to appear.
// the first one by blocking all images requests,
// and the sec one by replacing/moking the icon with a simple js object- which isn't an image of course.

// Note: Enabling routing disables http cache.

test("block all images requests", async ({ page }) => {
  //   await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort()); // another option
  await page.route(/(png|jpeg)$/, (route) => route.abort());

  await expect(page).toHaveTitle(/MeetMusic/);
  await page.waitForTimeout(10000);
});

test("mok app icon req", async ({ page }) => {
  const jsonMocUser = [{ name: "Strawberry", id: 21 }];

  // Moc the icon request with js object which should cause the app icon to not show up(I didn't find a way to send an actual pic yet)
  // and i did that for poc mokking data.. couldn't find any other req to mok(auth required..).
  await page.route("**/MeetMusicIcon.png", async (route) => {
    await route.fulfill({
      status: 200,
      json: jsonMocUser,
    });
  });

  await expect(page).toHaveTitle(/MeetMusic/);
  await page.waitForTimeout(10000);
});
