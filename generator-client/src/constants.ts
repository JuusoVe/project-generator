import { StepState, CreateStepStatus } from './models';

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
        WAIT_FOR_TESTS: 'wait-for-tests',
        WAIT_FOR_DEPLOYMENT: 'wait-for-deployment',
    },
};

export const SECRET_KEYS = {
    VERCEL: {
        PROJECT_ID: 'VERCEL_PROJECT_ID',
        ORG_ID: 'VERCEL_ORG_ID',
        TOKEN: 'VERCEL_TOKEN',
    },
};

export const TBA_SUFFIX = ' (TBA)';

// TODO: Get this based on preferences
export const TEMPLATE_NAME = 'storefront-test-template';

export const TRIGGER_PIPELINE_EVENT_TYPE = 'manually-trigger-pipeline';

export const SECONDS_10 = 10_000;

export const INITIAL_CREATE_STATE: StepState[] = [
    {
        label: 'Create repo',
        status: CreateStepStatus.notStarted,
        statusMessage: '',
        id: IDS.STEPS.CREATE_REPO,
    },
    {
        label: 'Create frontend',
        status: CreateStepStatus.notStarted,
        statusMessage: '',
        id: IDS.STEPS.CREATE_FRONTEND,
    },
    {
        label: 'Set repo secrets',
        status: CreateStepStatus.notStarted,
        statusMessage: '',
        id: IDS.STEPS.CREATE_REPO_SECRETS,
    },
    // {
    //     label: 'Running tests',
    //     status: CreateStepStatus.notStarted,
    //     statusMessage: '',
    //     id: IDS.STEPS.WAIT_FOR_TESTS,
    // },
    {
        label: 'Deploying frontend',
        status: CreateStepStatus.notStarted,
        statusMessage: '',
        id: IDS.STEPS.WAIT_FOR_DEPLOYMENT,
    },
];
