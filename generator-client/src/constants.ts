export const ROUTES = {
    ROOT: '/',
    CREATE: {
        PREFERENCES: '/create/preferences',
        KEYS: '/create/keys',
        GENERATE: '/create/generate',
    },
};

export const IDS = {
    PACKAGE_MANAGER: 'package-manager-selector',
    FRONTEND: 'frontend-selector',
    REPO_NAME: 'repository-name',
    REPO_OWNER: 'repository-owner',
    REPO_API_KEY: 'repostiroy-api-key',
    FRONTEND_API_KEY: 'frontend-api-key',
};

const TEST_ID_PREFIX = 'testid-';

export const TEST_IDS = {
    INPUTS: {
        REPO_NAME: TEST_ID_PREFIX + IDS.REPO_NAME,
        REPO_OWNER: TEST_ID_PREFIX + IDS.REPO_OWNER,
        FRONTEND: TEST_ID_PREFIX + 'frontend-proejct-name',
    },
};

export const TBA_SUFFIX = ' (TBA)';
