import { Locator, Page, expect } from "@playwright/test";

export default class homePage {
  private readonly _page: Page;
  public get page(): Page {
    return this._page;
  }

  private followingHeader: Locator;

  constructor(page: Page) {
    // this.followingHeader = page.getByRole("heading", {
    //   name: "People you follow",
    // });
    // this.followingHeader = page.getByRole("textbox", { name: "email" });
  }

  public isDisplayed = async () => {
    this.followingHeader = this.page.getByRole("heading", {
      name: "People you follow",
    });
    expect(this.followingHeader).toBeVisible();
  };
}
