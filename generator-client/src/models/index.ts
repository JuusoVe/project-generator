export enum StorageKeys {
    repoName = 'repoName',
    repoOwner = 'repoOwner',
    packageManager = 'packageManager',
    frontendService = 'frontendService',
    frontendProjectName = 'frontendProjectName',
    repoAPIKey = 'repoAPIKey',
    frontendAPIKey = 'frontendAPIKey',
    destroySuccess = 'destroySuccess',
    destroyStatusText = 'destroyStatusText',
    createState = 'createState',
}

export type VercelCreateProjectResponse = {
    accountId: string;
    id: string;
};

export enum FrontEnds {
    vercel = 'vercel',
    netlify = 'netlify',
}
