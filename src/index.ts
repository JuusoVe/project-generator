import { checkRequiredEnvs } from './utils'

export const REQUIRED_ENVS = {
    templateRepoOwner: 'TEMPLATE_REPO_OWNER',
    templateRepoName: 'TEMPLATE_REPO_NAME',
}

checkRequiredEnvs(REQUIRED_ENVS, process.env)
