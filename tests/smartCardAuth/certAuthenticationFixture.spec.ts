// login.spec.ts

import { test, expect } from './certAuthenticationFixture'  // <-- note the import of everything from our fixture.

test('auth using certAuthenticationFixture', async ({ context }) => {
  
    const page = await context.newPage();
    await page.goto("")

    const title = page.locator('title')

    await expect(title).toHaveText('My Title')
})