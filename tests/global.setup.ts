import { test as setup } from "@playwright/test";
import addAutoSelectUserPolicy from "../helpers/reg/regConverted";

setup("do authenticate", async ({}) => {
  await addAutoSelectUserPolicy(
    process.env.PFX_USER1 as string,
    process.env.BASE_URL as string
  );
});
