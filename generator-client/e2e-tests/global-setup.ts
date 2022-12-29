import path from 'path';
import dotenv from 'dotenv';

import { FullConfig } from '@playwright/test';
import { TEST_SECRET_ENV_KEYS } from './tests/test-constants';

async function globalSetup(_config: FullConfig) {
    dotenv.config({ path: path.resolve(__dirname, '.env.test') });

    const missingKeys: string[] = [];
    Object.values(TEST_SECRET_ENV_KEYS).forEach((key) => {
        if (!process.env[key]) {
            missingKeys.push(key);
        }
    });
    if (missingKeys.length) {
        throw new Error(`Missing required env keys: ${missingKeys.toString()}`);
    }
}

export default globalSetup;
