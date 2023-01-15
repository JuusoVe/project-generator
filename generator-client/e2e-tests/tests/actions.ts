import { expect, Page } from '@playwright/test';

/*
 * Actions are pureish helper functions to hide implementation details
 * of what it exactly means to perform an action of some kind through the UI.
 *
 * Side effects should be avoided but palywright functions are used as such
 * to avoid unnecessary repitition is params.
 */

export const urlNavigateTo = async (page: Page, url: string) => {
    await page.goto(url);
    await expect(page).toHaveURL(url);
};

export const clickButton = async (page: Page, buttonId: string) => {
    const button = page.getByTestId(buttonId);
    await expect(button).toBeVisible();
    await button.click();
};

export const fillTextField = async (
    page: Page,
    fieldId: string,
    value: string
) => {
    const field = page.getByTestId(fieldId);
    await expect(field).toBeVisible();
    await expect(field).toBeEditable();
    await field.fill(value);
};
