import { test as setup } from "@playwright/test";
import ks from "node-key-sender";
import NotImplementedError from "../helpers/errors";
import { STORAGE_STATE } from "../playwright.config";

setup("do authenticate", async ({ page }) => {
  try {
    await page.goto("", { timeout: 2000 });
  } catch (error) {
    //   ks.setOption("globalDelayPressMillisec", 1000);
    // Do not touch the keyboard while this code run!!
    await ks.sendKey("down");
    await ks.sendKey("enter");
  }

  await page.context().storageState({ path: STORAGE_STATE });
});
