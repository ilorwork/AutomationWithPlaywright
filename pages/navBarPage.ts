import { Locator, Page } from "@playwright/test";
import loginPage from "./loginPage";

export default class navBarPage {
  private readonly page: Page;
  private readonly userIcon: Locator;
  private readonly logOut: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userIcon = page.locator(`[data-testid="AccountCircleIcon"]`);
    this.logOut = page.locator(`'Log out'`);
  }

  public doLogout = async (): Promise<loginPage> => {
    await this.userIcon.click();
    await this.logOut.click();
    const logInPage = new loginPage(this.page);
    logInPage.isPageDisplayed();
    return logInPage;
  };
}
