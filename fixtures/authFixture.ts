import UseRegistryKey from "../helpers/reg2";
let page: Page;
export default async ({ page }) => {
  await page.addInitScript(async ({ page }) => {
    page.goToAuthURL = async (certificateName: string, url: string) => {
      const securityUrl = "https://s";
      const selectTamuzCardUrl = "https://t";

      await page.goto(url);
      await goToURL(certificateName, securityUrl);
      await goToURL(certificateName, selectTamuzCardUrl);
      await page.goto(url);
    };
  });

  const goToURL = async (certificateName: string, url: string) => {
    try {
      await UseRegistryKey.addRegAutoSelectCertificate(certificateName, url);
      await page.goto(url);
      await UseRegistryKey.removeRegAutoSelectCertificate();
    } catch (e) {
      throw new Error(`Check your url or certificate name or ${e.message}`);
    }
  };
};
