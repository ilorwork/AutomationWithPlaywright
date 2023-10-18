import { Locator, Page } from "@playwright/test";
import homePage from "./homePage";

export default class loginPage {
  private readonly page: Page;
  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
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
