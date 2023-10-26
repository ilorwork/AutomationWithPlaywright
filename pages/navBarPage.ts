import { Locator, Page } from "@playwright/test";
import loginPage from "./loginPage";
import basePage from "./basePage";
import NotImplementedError from "../helpers/errors";

export default class navBarPage extends basePage {
  // readonly page: Page;
  private readonly userIcon: Locator;
  private readonly logOut: Locator;

  constructor(page: Page) {
    super(page);
    // this.page = page;
    this.userIcon = page.locator(`[data-testid="AccountCircleIcon"]`);
    this.logOut = page.locator(`'Log out'`);
  }

  public isPageDisplayed = (): Promise<void> => {
    // return new Promise<void>((resolve) => {
    //   // Leave this method completely empty
    //   // You can add your logic here later if needed
    //   // For now, it's an empty Promise
    //   resolve();
    // });
    throw new NotImplementedError("This method is not implemented yet");
  };

  public doLogout = async (): Promise<loginPage> => {
    await this.userIcon.click();
    await this.logOut.click();
    const logInPage = new loginPage(this.page);
    await logInPage.isPageDisplayed();
    return logInPage;
  };
}
