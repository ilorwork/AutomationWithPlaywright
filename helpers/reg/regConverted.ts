import os from "os";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { Page, chromium } from "@playwright/test";
import { unlink } from "fs/promises";
import util from "node:util";

// Use promised exec - https://stackoverflow.com/a/70742322
const execPromise = util.promisify(exec);

// Investigate if creating this code as page fixture, setup proj, or beforeAll.
export default class UseRegistryKey {
  public static async signUserToRegAndNav(
    certificateName: string,
    url: string
  ): Promise<Page> {
    UseRegistryKey.createRegFile(certificateName, url);
    await UseRegistryKey.executeAddRegFile();

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await UseRegistryKey.confirmPolicyAddition(page);
    await page.goto(url);
    await UseRegistryKey.deleteRegPolicy();
    await UseRegistryKey.deleteRegFile();

    return page;
  }

  private static createRegFile(certName: string, url: string) {
    const s = "\\";

    const file = fs.openSync(
      path.join(this.getTempFilesPath(), `GoogleAutoSelectCertAdd.reg`),
      "w"
    );

    fs.writeSync(file, `Windows Registry Editor Version 5.00\n`);

    // Reg key
    fs.writeSync(
      file,
      `[HKEY_CURRENT_USER\\SOFTWARE\\Policies\\Google\\Chrome\\AutoSelectCertificateForUrls]\n\n`
    );

    // Reg value - example from google docs
    // "1"="{\"pattern\":\"https://www.example.com\",\"filter\":{\"ISSUER\":{\"CN\":\"certificate issuer name\", \"L\": \"certificate issuer location\", \"O\": \"certificate issuer org\", \"OU\": \"certificate issuer org unit\"}, \"SUBJECT\":{\"CN\":\"certificate subject name\", \"L\": \"certificate subject location\", \"O\": \"certificate subject org\", \"OU\": \"certificate subject org unit\"}}}"
    fs.writeSync(
      file,
      `"1"="{${s}"pattern${s}":${s}"${url}${s}",${s}"filter${s}":{${s}"SUBJECT${s}":{${s}"CN${s}":${s}"${certName}${s}"}}}"`
    );
    fs.closeSync(file);
  }

  private static async executeAddRegFile() {
    const filePath = path.join(
      this.getTempFilesPath(),
      `GoogleAutoSelectCertAdd.reg`
    );
    try {
      // exec(`regedit.exe /s "${filePath}"`);
      // REG is better - https://stackoverflow.com/a/35065236
      // exec(`REG IMPORT "${filePath}"`);
      await execPromise(`REG IMPORT "${filePath}"`);
      // const child = exec('REG IMPORT "' + filePath + '"', {}, (error) => {
      // console.error(error); // an AbortError
      // });
    } catch (error) {
      throw error;
    }
  }

  private static async confirmPolicyAddition(page: Page) {
    const policyUrl = "chrome://policy/";
    await page.goto(policyUrl);

    let isPolicyLoaded = false;
    let i = 0;
    const tries = 5;

    while (!isPolicyLoaded && i < tries) {
      const autoSelectCertPolicy = page.getByText(
        "AutoSelectCertificateForUrls"
      );

      if (await autoSelectCertPolicy.isVisible()) isPolicyLoaded = true;
      else {
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

  private static async deleteRegFile() {
    try {
      await unlink(
        path.join(
          UseRegistryKey.getTempFilesPath(),
          `GoogleAutoSelectCertAdd.reg`
        )
      );
      await unlink(
        path.join(
          UseRegistryKey.getTempFilesPath(),
          `GoogleAutoSelectCertRemove.reg`
        )
      );
    } catch (error) {
      console.error("Failed to delete reg files");
    }
  }

  private static getTempFilesPath() {
    const tempDir = os.tmpdir();
    const folderPath = path.join(tempDir, "myapp-reg-files");

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    return folderPath;
  }
}
