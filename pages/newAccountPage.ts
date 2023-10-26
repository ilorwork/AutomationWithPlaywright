import { Locator, Page } from "@playwright/test";
import basePage from "./basePage";
import NotImplementedError from "../helpers/errors";

export default class newAccountPage extends basePage {
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
    super(page);
    this.country = page.getByPlaceholder("Country");
  }

  public isPageDisplayed = (): Promise<void> => {
    throw new NotImplementedError("This method is not implemented yet");
  };

  public pickCountry = async (option: string): Promise<void> => {
    await this.country.selectOption(option);
  };
}
