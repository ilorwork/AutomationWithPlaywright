import test from "@playwright/test";
// import AuthPage from "../../helpers/reg/driverConverted";
import UseRegistryKey from "../../helpers/reg/regConverted";

test("Use AuthPage to authenticate", async ({}) => {
  // const authPage = new AuthPage(page);

  // await page.goto("");

  // Link to google chrome reg configuration docs
  // https://support.google.com/chrome/a/answer/9131254?hl=en#zippy=%2Cconfigure-settings-on-windows-computers
  // await authPage.signUserToRegAndNav(
  //   process.env.PFX_USER1 as string,
  //   process.env.BASE_URL as string
  // );
  // await page.pause();

  await UseRegistryKey.signUserToRegAndNav(
    process.env.PFX_USER1 as string,
    process.env.BASE_URL as string
  );
});
