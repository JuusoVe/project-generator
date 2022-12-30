export enum StorageKeys {
    // PREFERENCES
    repoName = 'repoName',
    repoOwner = 'repoOwner',
    packageManager = 'packageManager',
    frontendService = 'frontendService',
    frontendProjectName = 'frontendProjectName',
    // API KEYS
    repoAPIKey = 'repoAPIKey',
    frontendAPIKey = 'frontendAPIKey',
    // WORKFLOW STATE
    destroyRepoSuccess = 'destroyRepoSuccess',
    destroyRepoStatusText = 'destroyRepoStatusText',
    destroyFrontendSuccess = 'destroyFrontendSuccess',
    destroyFrontendStatusText = 'destroyFrontendStatusText',
    createState = 'createState',
    vercelCreateData = 'vercelCreateData',
}

export type VercelCreateProjectData = {
    accountId: string;
    id: string;
};

export enum FrontEnds {
    vercel = 'vercel',
    netlify = 'netlify',
}
