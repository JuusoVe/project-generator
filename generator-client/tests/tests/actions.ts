import { Expect, Page } from '@playwright/test';

/*
 * Actions are pure functions to hide implementation details
 * of what it exactly means to perform an action of some kind through the UI.
 */

export const urlNavigateTo = async (
    page: Page,
    expect: Expect,
    url: string
) => {
    await page.goto(url);
    await expect(page).toHaveURL(url);
};
