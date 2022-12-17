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

export default {
    createRepoFromTemplate,
    deleteUserRepo,
    getRepoPublicEncryptionKey,
    createRepoSecret,
}
