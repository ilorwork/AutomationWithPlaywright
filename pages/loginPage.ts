import { Locator, Page, expect } from "@playwright/test";
import homePage from "./homePage";
import newAccountPage from "./newAccountPage";

export default class loginPage {
  private readonly page: Page;
  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly loginBtn: Locator;
  private readonly newAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByRole("textbox", { name: "email" });
    this.passwordField = page.getByRole("textbox", { name: "password" });
    this.loginBtn = page.getByRole("button", { name: "log in" });
    this.newAccountBtn = page.locator(
      "//button[text()='Create a new account']"
    );
  }

  public doLogin = async (username: string, password: string) => {
    await this.emailField.fill(username);
    await this.passwordField.fill(password);
    await this.loginBtn.click();
    return new homePage(this.page);
  };

  public isDisplayed = async () => {
    await expect(this.emailField).toBeVisible();
  };

  public gotoNewAccount = async () => {
    await this.newAccountBtn.click();
    return new newAccountPage(this.page);
  };
}
