import { exec } from "child_process";
import { Page, chromium } from "@playwright/test";
import util from "node:util";

// Use promised exec - https://stackoverflow.com/a/70742322
const execPromise = util.promisify(exec);

// Investigate if creating this code as page fixture, setup proj, or beforeAll.
export default class UseRegistryKey {
  public static async signUserToRegAndNav(
    certificateName: string,
    url: string
  ) /* : Promise<Page>  */ {
    await UseRegistryKey.executeAddRegFile(url, certificateName);

    await UseRegistryKey.confirmPolicyAddition();
    // await page.goto(url);
    // await UseRegistryKey.deleteRegPolicy();

    // return page;
  }

  private static async executeAddRegFile(url: string, certificateName: string) {
    const key: string =
      "HKEY_CURRENT_USER\\SOFTWARE\\Policies\\Google\\Chrome\\AutoSelectCertificateForUrls";
    const value: string = "1";
    const data: string = `{\\"pattern\\":\\"${url}\\",\\"filter\\":{\\"SUBJECT\\":{\\"CN\\":\\"${certificateName}\\"}}}`;

    try {
      await execPromise(`REG ADD "${key}" /v "${value}" /d "${data}"`);
    } catch (error) {
      throw error;
    }
  }

  private static async confirmPolicyAddition() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const policyUrl = "chrome://policy/";
    await page.goto(policyUrl);

    let isPolicyLoaded = false;
    let i = 0;
    const tries = 5;

    while (!isPolicyLoaded && i < tries) {
      const autoSelectCertPolicy = page.getByText(
        "AutoSelectCertificateForUrls"
      );

      if (await autoSelectCertPolicy.isVisible()) {
        isPolicyLoaded = true;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await page.locator("//*[@id='reload-policies']").click();
      }

      i++;
      if (i === tries && !isPolicyLoaded) {
        throw new Error(
          `Faild to load AutoSelectCertificateForUrls policy in 'chrome://policy/' after ${tries} tries`
        );
      }
    }
  }

  private static async deleteRegPolicy() {
    try {
      await execPromise(
        `REG DELETE "HKEY_CURRENT_USER\\SOFTWARE\\Policies\\Google\\Chrome\\AutoSelectCertificateForUrls" /f`
      );
    } catch (error) {
      console.error("Failed to remove auto select policy from the registry");
    }
  }
}
