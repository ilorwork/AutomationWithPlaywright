import { exec } from "child_process";
import util from "node:util";

const execPromise = util.promisify(exec); // https://stackoverflow.com/a/70742322

export default class UseRegistryKey {
  public static async signUserToRegAndNav(
    certificateName: string,
    url: string
  ) {
    await UseRegistryKey.deleteOldRegPolicy();
    await UseRegistryKey.executeAddRegFile(url, certificateName);
    await UseRegistryKey.confirmPolicyAddition(certificateName);
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

  private static confirmPolicyAddition = async (certificateName: string) => {
    const key: string =
      "HKEY_CURRENT_USER\\SOFTWARE\\Policies\\Google\\Chrome\\AutoSelectCertificateForUrls";

    let isPolicyAdded = false;
    let i = 0;
    const tries = 5;
    do {
      try {
        const { stdout, stderr } = await execPromise(`reg query "${key}"`);
        if (stdout.includes(certificateName)) isPolicyAdded = true;
      } catch (error) {
        if (error.stderr.includes("unable to find the specified registry key"))
          await new Promise<void>((resolve) => setTimeout(resolve, 2000));
        if (i === tries - 1 && !isPolicyAdded)
          throw new Error(
            `Faild to find AutoSelectCertificateForUrls policy in registry after ${tries} tries`
          );
        else throw error;
      }
      i++;
    } while (!isPolicyAdded && i < tries);
  };

  private static async deleteOldRegPolicy() {
    try {
      await execPromise(
        `REG DELETE "HKEY_CURRENT_USER\\SOFTWARE\\Policies\\Google\\Chrome\\AutoSelectCertificateForUrls" /f`
      );
    } catch (error) {
      console.error("Failed to remove auto select policy from the registry");
    }
  }
}
