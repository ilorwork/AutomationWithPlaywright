import { Locator, Page } from "@playwright/test";
import homePage from "./homePage";

export default class loginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.emailField = page.getByRole("textbox", { name: "email" });
    this.passwordField = page.getByRole("textbox", { name: "password" });
    this.loginBtn = page.getByRole("button", { name: "log in" });
  }

  public doLogin = async (username: string, password: string) => {
    await this.emailField.fill(username);
    await this.passwordField.fill(password);
    await this.loginBtn.click();
    return new homePage(this.page);
  };
}
