import { Page } from "@playwright/test";

export default abstract class basePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public abstract isPageDisplayed(): Promise<void>;
}
