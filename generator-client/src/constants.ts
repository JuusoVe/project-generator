export const ROUTES = {
    ROOT: '/',
    CREATE: {
        PREFERENCES: '/create/preferences',
        KEYS: '/create/keys',
        GENERATE: '/create/generate',
    },
};

export const IDS = {
    PACKAGE_MANAGER_SELECTOR: 'package-manager-selector',
    FRONTEND_SELECTOR: 'frontend-selector',
    FRONTEND_PROJECT_NAME_INPUT: 'frontend-project-name-input',
    REPO_NAME_INPUT: 'repository-name-input',
    REPO_OWNER_INPUT: 'repository-owner-input',
    REPO_API_KEY_INPUT: 'repostiroy-api-key-input',
    FRONTEND_API_KEY_INPUT: 'frontend-api-key-input',
    STEPS: {
        CREATE_REPO: 'create-repo',
        CREATE_FRONTEND: 'create-frontend',
        CREATE_REPO_SECRETS: 'create-repo-secrets',
        DEPLOY_FRONTEND: 'deploy-frontend',
    },
};

export const SECRET_KEYS = {
    VERCEL: {
        PROJECT_ID: 'VERCEL_PROJECT_ID',
        ORG_ID: 'VERCEL_ORG_ID',
    },
};

export const TBA_SUFFIX = ' (TBA)';

// TODO: Get this based on preferences
export const TEMPLATE_NAME = 'storefront-test-template';
