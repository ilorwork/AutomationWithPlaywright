import { test as setup } from "@playwright/test";
import ks from "node-key-sender";
import NotImplementedError from "../helpers/errors";
import { STORAGE_STATE } from "../playwright.config";
import UseRegistryKey from "../helpers/reg/regConverted";
// import { exec } from "child_process";
// import { Page, chromium } from "@playwright/test";
// import util from "node:util";
// /**
//  * Executes a shell command and return it as a Promise.
//  * @param cmd {string}
//  * @return {Promise<string>}
//  */
// function execShellCommand(cmd) {
//   const exec = require("child_process").exec;
//   return new Promise((resolve, reject) => {
//     exec(cmd, (error, stdout, stderr) => {
//       if (error) {
//         console.warn(error);
//       }
//       resolve(stdout ? stdout : stderr);
//     });
//   });
// }

setup("do authenticate", async ({}) => {
  const page = await UseRegistryKey.signUserToRegAndNav(
    process.env.PFX_USER1 as string,
    process.env.BASE_URL as string
  );

  // await page.context().storageState({ path: STORAGE_STATE });
});
