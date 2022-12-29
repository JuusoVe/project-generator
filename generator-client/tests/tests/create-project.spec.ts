import { expect, test } from '@playwright/test';
import { urlNavigateTo } from './actions';
import { ROUTES } from '../../src/constants';

// export const urlNavigateTo = async (
//     page: Page,
//     expect: Expect,
//     url: string
// ) => {
//     await page.goto(url);
//     await expect(page).toHaveURL(`/.*${url}/`);
// };

test('homepage has title and links to intro page', async ({ page }) => {
    await urlNavigateTo(page, expect, ROUTES.CREATE.PREFERENCES);
});
