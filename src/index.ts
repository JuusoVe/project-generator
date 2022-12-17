import { checkRequiredEnvs } from './utils'

export const REQUIRED_ENVS = {
    templateRepoOwner: 'TEMPLATE_REPO_OWNER',
    templateRepoName: 'TEMPLATE_REPO_NAME',
    targetRepoOwner: 'TARGET_REPO_OWNER',
    userGitHubAccessKey: 'USER_GITHUB_ACCESS_KEY',
    userVercelToken: 'USER_VERCEL_TOKEN',
}

checkRequiredEnvs(REQUIRED_ENVS, process.env)
