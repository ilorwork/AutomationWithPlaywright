import test from "@playwright/test";
import loginPage from "../pages/loginPage";

let login: loginPage;

test.beforeEach(async ({ page }) => {
  await page.goto("");
  login = new loginPage(page);
});

// Country field isn't a real select, it's MUI's custom select/list field
test.fixme("select element", async ({ page }) => {
  //   await page.locator("//button[text()='Create a new account']").click();
  const newAccountPage = await login.gotoNewAccount();

  await newAccountPage.pickCountry("Israel");
  await page.waitForTimeout(3000);

  // What really needs to be done here:
  /* 
  locate the custom select element and click on it
  wait for it to has property "" and that it set/changes to true
  locate the counries list - "#menu-" and find its ul child, and return a list of all its li's text
  choose the wanted one and click on it
  (maybe wait for the list to disappear) 
  */
});
