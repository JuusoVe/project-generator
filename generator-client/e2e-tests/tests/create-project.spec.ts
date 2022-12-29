import { Page } from '@playwright/test';
import { test } from './fixtures';
import { fillTextField, urlNavigateTo } from './actions';
import { ROUTES, IDS } from '../../src/constants';
import { TEST_CONSTANTS } from './test-constants';

// Use a single page for the entire spec
let page: Page;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    // "forward" console logs to test running node process
    page.on('console', (msg) => console.log(msg.text()));
});

test('can fill project preferences', async ({ testSecrets }) => {
    // Set preferences
    await urlNavigateTo(page, ROUTES.CREATE.PREFERENCES);
    await fillTextField(page, IDS.REPO_NAME_INPUT, TEST_CONSTANTS.REPO_NAME);
    await fillTextField(page, IDS.REPO_OWNER_INPUT, testSecrets.githubUsername);
    await fillTextField(
        page,
        IDS.FRONTEND_PROJECT_NAME_INPUT,
        TEST_CONSTANTS.FRONTEND_PROJECT_NAME
    );
    // Set keys
    await urlNavigateTo(page, ROUTES.CREATE.KEYS);
    await fillTextField(page, IDS.REPO_API_KEY_INPUT, testSecrets.githubToken);
    await fillTextField(
        page,
        IDS.FRONTEND_API_KEY_INPUT,
        testSecrets.vercelToken
    );
});
