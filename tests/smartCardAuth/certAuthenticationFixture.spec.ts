// login.spec.ts

import { test, expect } from './certAuthenticationFixture'  // <-- note the import of everything from our fixture.

// Read the comment at the start of the fixture file. route need to be added to the context somehow
test('auth using certAuthenticationFixture', async ({ context }) => {
  
    const page = await context.newPage();
    await page.goto("")

    const title = page.locator('title')

    await expect(title).toHaveText('My Title')
})