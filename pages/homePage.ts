import { Locator, Page, expect } from "@playwright/test";

export default class homePage {
  private readonly page: Page;
  private readonly followingHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.followingHeader = page.getByRole("heading", {
      name: "People you follow",
    });
  }

  public isDisplayed = async () => {
    // const spinnerLocator = this.page.locator("[class*=Loader_spinner_]");
    // await expect(spinnerLocator).toBeVisible({ timeout: 10000 });
    // await expect(spinnerLocator).not.toBeVisible();
    // /main/anps.Loader_spinner__vXljZ;

    await expect(this.followingHeader).toBeVisible({ timeout: 20000 }); // Extended timeout due to long loading time
  };
}
