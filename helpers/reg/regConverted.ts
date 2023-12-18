import { exec } from "child_process";
import util from "node:util";

const execPromise = util.promisify(exec); // https://stackoverflow.com/a/70742322

const addAutoSelectUserPolicy = async (certName: string, url: string) => {
  await deleteAutoSelectPolicy();
  await executeAddRegPolicy(url, certName);
  await confirmPolicyAddition(certName);
};

const executeAddRegPolicy = async (url: string, certName: string) => {
  const key: string =
    "HKEY_CURRENT_USER\\SOFTWARE\\Policies\\Google\\Chrome\\AutoSelectCertificateForUrls";
  const value: string = "1";
  const data: string = `{\\"pattern\\":\\"${url}\\",\\"filter\\":{\\"SUBJECT\\":{\\"CN\\":\\"${certName}\\"}}}`;

  try {
    await execPromise(`reg add "${key}" /v "${value}" /d "${data}"`);
  } catch (error) {
    throw error;
  }
};

const confirmPolicyAddition = async (certName: string) => {
  const key: string =
    "HKEY_CURRENT_USER\\SOFTWARE\\Policies\\Google\\Chrome\\AutoSelectCertificateForUrls";
  const errMsg = `Faild to find AutoSelectCertificateForUrls policy in registry`;

  try {
    const { stdout, stderr } = await execPromise(`reg query "${key}"`);
    if (!stdout.includes(certName)) throw new Error(`${errMsg}`);
    console.log("AutoSelectCertificateForUrls policy added successfully");
  } catch (error) {
    throw new Error(`${errMsg}, original error: ${error}`);
  }
};

export const deleteAutoSelectPolicy = async () => {
  try {
    await execPromise(
      `reg delete "HKEY_CURRENT_USER\\SOFTWARE\\Policies\\Google\\Chrome\\AutoSelectCertificateForUrls" /f`
    );
  } catch (error) {
    console.error("Failed to remove auto select policy from the registry");
  }
};

export default addAutoSelectUserPolicy;
