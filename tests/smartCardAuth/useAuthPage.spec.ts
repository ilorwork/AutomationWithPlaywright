import test from "@playwright/test";
import AuthPage from "../../helpers/reg/driverConverted";

test("Use AuthPage to authenticate", async ({ page }) => {
  const authPage = new AuthPage(page);

  // await page.goto("");

  await authPage.goToAuthURL(
    process.env.PFX_USER1 as string,
    process.env.BASE_URL as string
  );
});
