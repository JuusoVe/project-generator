import { Page, test } from '@playwright/test';
import { fillTextField, urlNavigateTo } from './actions';
import { ROUTES, IDS } from '../../src/constants';
import { TEST_CONSTANTS } from './test-constans';

// Use a single page for the entire spec
let page: Page;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test('can fill project preferences', async () => {
    await urlNavigateTo(page, ROUTES.CREATE.PREFERENCES);
    await fillTextField(page, IDS.REPO_NAME_INPUT, TEST_CONSTANTS.REPO_NAME);
    await fillTextField(page, IDS.REPO_OWNER_INPUT, TEST_CONSTANTS.REPO_OWNER);
    await fillTextField(
        page,
        IDS.FRONTEND_PROJECT_NAME_INPUT,
        TEST_CONSTANTS.FRONTEND_PROJECT_NAME
    );
});
