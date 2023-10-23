import test from "@playwright/test";
import loginPage from "../pages/loginPage";
import homePage from "../pages/homePage";

let home: homePage;

test.describe("investigate typing methods behavior", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
    const login = new loginPage(page);
    const home = await login.doLogin("a@b.c", "Aa123456");
    await home.isDisplayed();
  });

  test("compare type, pressSequentially, and fill methods", async ({
    page,
  }) => {
    await page.locator("//button[text()='Create new post']").click();
    const textPostField = page.locator(
      "//textarea[@placeholder='Write some text']"
    );

    // Type method only checks that the element is attached to the DOM, it not checks is visible/enable/editable
    // So, this is how to do it manually. (in addition- latly type method got out of use and called as deprecated
    // use fill or pressSequentially(for typing char by char) instead)
    const isVisible = await textPostField.isVisible();
    const isEnabled = await textPostField.isEnabled();
    const isEditable = await textPostField.isEditable();

    if (isVisible && isEnabled && isEditable) {
      await textPostField.type("fdsa");
      await page.waitForTimeout(3000);
      await textPostField.pressSequentially("Hello"); // Types instantly
      await page.waitForTimeout(3000);
      await textPostField.pressSequentially("World", { delay: 100 }); // Types slower, like a user
      await page.waitForTimeout(3000);
      await textPostField.fill("ggg"); // fill method clr the field before filling it
    }
    await page.waitForTimeout(3000);
  });

  test("send text using fill command", async ({ page }) => {
    await page.locator("//button[text()='Create new post']").click();
    await page.getByPlaceholder("Write some text").fill("kjgh");
  });
});
