import test from "@playwright/test";
import UseRegistryKey from "../../helpers/reg/regConverted";

test("Use Auto select registry key to authenticate", async ({}) => {
  const page = await UseRegistryKey.signUserToRegAndNav(
    process.env.PFX_USER1 as string,
    process.env.BASE_URL as string
  );
});
