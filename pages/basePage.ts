import { Page } from "@playwright/test";

export default abstract class basePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public abstract isPageDisplayed(): Promise<void>;
}
