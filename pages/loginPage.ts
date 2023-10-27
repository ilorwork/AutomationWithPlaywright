import { Locator, Page, expect } from "@playwright/test";
import homePage from "./homePage";
import newAccountPage from "./newAccountPage";
import basePage from "./basePage";

export default class loginPage extends basePage {
  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly loginBtn: Locator;
  private readonly newAccountBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emailField = page.getByRole("textbox", { name: "email" });
    this.passwordField = page.getByRole("textbox", { name: "password" });
    this.loginBtn = page.getByRole("button", { name: "log in" });
    this.newAccountBtn = page.locator(
      "//button[text()='Create a new account']"
    );
  }

  public doLogin = async (
    username: string,
    password: string
  ): Promise<homePage> => {
    await this.emailField.fill(username);
    await this.passwordField.fill(password);
    await this.loginBtn.click();
    return new homePage(this.page);
  };

  public isPageDisplayed = async (): Promise<void> => {
    await expect(this.emailField).toBeVisible();
  };

  public gotoNewAccount = async (): Promise<newAccountPage> => {
    await this.newAccountBtn.click();
    return new newAccountPage(this.page);
  };
}
