import { test as base } from '@playwright/test';
import { TEST_SECRET_ENV_KEYS } from './test-constants';

type WorkerFixtures = {
    testSecrets: {
        githubUsername: string;
        githubToken: string;
        vercelToken: string;
    };
};

export const test = base.extend<{}, WorkerFixtures>({
    testSecrets: [
        async ({}, use) => {
            // These being set is ensured in ../global-setup.ts
            await use({
                githubUsername: process.env[
                    TEST_SECRET_ENV_KEYS.GITHUB_USERNAME
                ] as string,
                githubToken: process.env[
                    TEST_SECRET_ENV_KEYS.GITHUB_TOKEN
                ] as string,
                vercelToken: process.env[
                    TEST_SECRET_ENV_KEYS.VERCEL_TOKEN
                ] as string,
            });
        },
        { scope: 'worker' },
    ],
});
