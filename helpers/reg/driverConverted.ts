import { Page } from "@playwright/test";
import UseRegistryKey from "./regConverted";
import NotImplementedError from "../errors";

/// Investigate if creating this code as page fixture.
export default class AuthPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goToAuthURL(certificateName: string, url: string) {
    const securityUrl = "https://sc.st.login.gov.il/nidp/idff/sso?id=TamuzCard";
    const selectTamuzCardUrl =
      "https://st.login.gov.il/nidp/idff/sso?id=TamuzCard";

    try {
      await this.page.goto("", { timeout: 2000 });
    } catch (error) {
      if (error instanceof NotImplementedError) console.error(error.message);
    }
    await this.goToURL(certificateName, securityUrl);
    await this.goToURL(certificateName, selectTamuzCardUrl);
    await this.page.goto(url);
  }

  private async goToURL(certificateName: string, url: string) {
    try {
      await UseRegistryKey.addRegAutoSelectCertificate(
        certificateName,
        url,
        this.page
      );
      await this.page.goto(url);
      UseRegistryKey.removeRegAutoSelectCertificate();
    } catch (e) {
      throw new Error(`Check your url or certificate name or ${e.message}`);
    }
  }
}
