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

export type VercelProjectData = {
    accountId: string;
    id: string;
    latestDeployments?: {
        alias?: string[];
        aliasAssigned?: (number | boolean) | null;
        aliasError?: {
            code: string;
            message: string;
        } | null;
        aliasFinal?: string | null;
        automaticAliases?: string[];
        builds?: {
            use: string;
            src?: string;
            dest?: string;
        }[];
        createdAt: number;
        createdIn: string;
        creator: {
            email: string;
            githubLogin?: string;
            gitlabLogin?: string;
            uid: string;
            username: string;
        } | null;
        deploymentHostname: string;
        name: string;
        forced?: boolean;
        id: string;
        /** Construct a type with a set of properties K of type T */
        meta?: { [key: string]: string };
        monorepoManager?: string | null;
        plan: string;
        private: boolean;
        readyState: string;
        requestedAt?: number;
        target?: string | null;
        teamId?: string | null;
        type: string;
        url: string;
        userId: string;
        withCache?: boolean;
        checksConclusion?: 'succeeded' | 'failed' | 'skipped' | 'canceled';
        checksState?: 'registered' | 'running' | 'completed';
        readyAt?: number;
        buildingAt?: number;
    }[];
};

export enum FrontEnds {
    vercel = 'vercel',
    netlify = 'netlify',
}

export enum CreateStepStatus {
    notStarted = 'not-started',
    inProgress = 'in-progress',
    completed = 'completed',
    failed = 'failed',
}

export interface StepState {
    label: string;
    status: CreateStepStatus;
    statusMessage: string;
    id: string;
}
