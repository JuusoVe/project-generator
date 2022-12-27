import { Octokit } from '@octokit/rest'
import { Endpoints } from '@octokit/types'
import { REQUIRED_ENVS } from '..'

const githubAPIClient = new Octokit({
    auth: process.env[REQUIRED_ENVS.userGitHubAccessKey],
    userAgent: 'coreGenerator',
})

export type GithubRepo = Endpoints['POST /user/repos']['response']['data']

const createRepoFromTemplate = async (
    newRepoName: string,
    templateRepoName: string,
    templateRepoOwner: string
) => {
    return await githubAPIClient.rest.repos.createUsingTemplate({
        name: newRepoName,
        template_repo: templateRepoName,
        template_owner: templateRepoOwner,
        private: true,
    })
}

const deleteUserRepo = async (username: string, repoName: string) => {
    return await githubAPIClient.rest.repos.delete({
        owner: username,
        repo: repoName,
    })
}

const getRepoPublicEncryptionKey = async (
    username: string,
    repoName: string
) => {
    return await githubAPIClient.rest.actions.getRepoPublicKey({
        repo: repoName,
        owner: username,
    })
}

const createRepoSecret = async (
    username: string,
    repoName: string,
    secretName: string,
    secretValue: string,
    keyId: string
) => {
    return await githubAPIClient.rest.actions.createOrUpdateRepoSecret({
        owner: username,
        repo: repoName,
        secret_name: secretName,
        encrypted_value: secretValue,
        key_id: keyId,
    })
}

/**
 * This sends an event similar to manually triggering a pipeline from the GUI.
 * The pipeline configuration must allow manual triggers by defining the
 * repository_dispatch event in the triggers ie:
 *
 * ./github/workflows/example.yml
 *
 * on:
 *  repository_dispatch:
 *      types: [manually-trigger-pipeline]
 *
 *  The types filter is optional but highly recommended to avoid accidental triggers.
 */
const triggerRepositoryPipeline = async (
    username: string,
    repoName: string,
    eventType: string
) => {
    return await githubAPIClient.rest.repos.createDispatchEvent({
        owner: username,
        repo: repoName,
        event_type: eventType,
    })
}

const listWorkflows = async (username: string, repo: string) => {
    return await githubAPIClient.rest.actions.listRepoWorkflows({
        owner: username,
        repo: repo,
    })
}

export default {
    createRepoFromTemplate,
    deleteUserRepo,
    getRepoPublicEncryptionKey,
    createRepoSecret,
    triggerRepositoryPipeline,
    listWorkflows,
}
