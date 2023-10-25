import { Locator, Page } from "@playwright/test";

export default class newAccountPage {
  private readonly page: Page;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly reEnterPassword: Locator;
  private readonly gender: Locator;
  private readonly birthDate: Locator;
  private readonly country: Locator;
  private readonly city: Locator;
  private readonly createNewAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.country = page.getByPlaceholder("Country");
  }

  public pickCountry = async (option: string) => {
    await this.country.selectOption(option);
  };
}
