import { test as setup } from "@playwright/test";
import UseRegistryKey from "../helpers/reg/regConverted";

setup("do authenticate", async ({}) => {
  await UseRegistryKey.signUserToRegAndNav(
    process.env.PFX_USER1 as string,
    process.env.BASE_URL as string
  );
});
