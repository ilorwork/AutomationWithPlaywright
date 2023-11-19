import os from "os";
import path from "path";
import fs, { writeFileSync, unlinkSync } from "fs";
import { exec } from "child_process";
import { Page, expect } from "@playwright/test";
// import { TempDirectory } from 'tmp-promise';

export default class UseRegistryKey {
  static async addRegAutoSelectCertificate(
    certificateName: string,
    env: string,
    page: Page
  ) {
    try {
      const policyUrl = "chrome://policy/";
      this.deleteRegFilesFromTempFile();
      this.creatRegFilesInTempFile(certificateName, env);
      this.writeRegistryUsingCMD();

      await new Promise((resolve) => setTimeout(resolve, 2000));
      await page.goto(policyUrl);
      const reloadPoliciesBtn = page.locator("//*[@id='reload-policies']");
      // var reloadPoliciesBtn = new Clickable("//*[@id='reload-policies']");
      const isClickable =
        (await reloadPoliciesBtn.isVisible()) &&
        (await reloadPoliciesBtn.isEnabled());
      if (isClickable) {
        await reloadPoliciesBtn.click();
        const noPoliciesSet = page.locator("//*[.='No policies set']");
        await expect(noPoliciesSet).not.toBeVisible();
        // new ElementBase("//*[.='No policies set']").WaitUntilDisappeared(40);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      // Why catch is empty??
    }
  }

  private static writeRegistryUsingCMD() {
    const filePath = path.join(
      this.getFileAdDTOReg(),
      `GoogleAutoSelectCertAdd.reg`
    );
    try {
      exec(`regedit.exe /s "${filePath}"`);
    } catch (error) {
      throw error;
    }
  }

  private static creatRegFilesInTempFile(certificateName: string, env: string) {
    const s = "\\";

    const file = fs.openSync(
      path.join(this.getFileAdDTOReg(), `GoogleAutoSelectCertAdd.txt`),
      "w"
    );

    fs.writeSync(file, `Windows Registry Editor Version 5.00\n`);
    fs.writeSync(
      file,
      `[HKEY_CURRENT_USER\\SOFTWARE\\Policies\\Google\\Chrome\\AutoSelectCertificateForUrls]\n`
    );
    fs.writeSync(
      file,
      `"1"="{${s}"pattern${s}":${s}"${env}${s}",${s}"filter${s}":{"${s}"SUBJECT${s}":{"${s}"CN${s}":${s}"${certificateName}${s}"}}}"`
    );
    fs.closeSync(file);

    const removeContent = `
      Windows Registry Editor Version 5.00
  
      [-HKEY_CURRENT_USER\\SOFTWARE\\Policies\\Google\\Chrome\\AutoSelectCertificateForUrls]
    `;

    writeFileSync(
      this.getFileAdDTOReg() + "GoogleAutoSelectCertRemove.reg",
      removeContent
    );
  }

  public static removeRegAutoSelectCertificate() {
    const filePath = path.join(
      this.getFileAdDTOReg(),
      `GoogleAutoSelectCertRemove.reg`
    );
    try {
      exec(`regedit.exe /s "${filePath}"`);
    } catch (error) {
      throw error;
    }
  }

  private static deleteRegFilesFromTempFile() {
    try {
      unlinkSync(
        path.join(
          UseRegistryKey.getFileAdDTOReg(),
          `GoogleAutoSelectCertAdd.reg`
        )
      );
      unlinkSync(this.getFileAdDTOReg() + "GoogleAutoSelectCertRemove.reg");
    } catch (error) {} // Why catch is empty??
  }

  // Remane it to getRegFilesPath or something after done converting from C#
  private static getFileAdDTOReg() {
    const tempDir = os.tmpdir();
    const folderPath = path.join(tempDir, "myapp-reg-files");

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    return folderPath;
  }
}
