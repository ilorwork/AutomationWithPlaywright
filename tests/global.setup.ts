import { test as setup } from "@playwright/test";
import ks from "node-key-sender";
import NotImplementedError from "../helpers/errors";

setup("do authenticate", async ({ page }) => {
  try {
    await page.goto("", { timeout: 2000 });
  } catch (error) {
    if (error instanceof NotImplementedError) console.error(error.message);
  }

  // Do not touch the keyboard while this code run!!
  await ks.sendKey("down");
  await ks.sendKey("enter");
});
