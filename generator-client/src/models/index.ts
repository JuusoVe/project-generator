export enum StorageKeys {
    repoName = 'repoName',
    repoOwner = 'repoOwner',
    packageManager = 'packageManager',
    frontendService = 'frontendService',
    frontendProjectName = 'frontendProjectName',
    repoAPIKey = 'repoAPIKey',
    frontendAPIKey = 'frontendAPIKey',
}

export type VercelCreateProjectResponse = {
    accountId: string;
    id: string;
};

export enum FrontEnds {
    vercel = 'vercel',
    netlify = 'netlify',
}
