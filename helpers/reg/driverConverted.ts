import { Page } from "@playwright/test";
import UseRegistryKey from "./regConverted";

// /// Investigate if creating this code as page fixture, or beforeAll.
// export default class AuthPage {
//   private page: Page;

//   constructor(page: Page) {
//     this.page = page;
//   }

//   public async signUserToRegAndNav(certificateName: string, url: string) {
//     try {
//       await UseRegistryKey.signUserToRegAndNav(certificateName, url, this.page);
//       // await this.page.goto(url);
//       // UseRegistryKey.executeRemoveRegFile();
//     } catch (e) {
//       throw new Error(
//         `Check your url or certificate name. original error:s ${e.message}`
//       );
//     }
//   }
// }
