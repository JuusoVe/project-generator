import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";


const githubAPIClient = new Octokit({
    auth: process.env.GITHUB_ACCESS_KEY,
    userAgent: 'coreGenerator'
})

export type GithubRepo = Endpoints["POST /user/repos"]["response"]["data"]

const createRepo = async (repoName: string) => await githubAPIClient.rest.repos.createForAuthenticatedUser({ name: repoName })
const deleteUserRepo = async (username: string, repoName: string) => await githubAPIClient.rest.repos.delete({ owner: username, repo: repoName })
const getRepoPublicEncryptionKey = async (username: string, repoName: string) => await githubAPIClient.rest.actions.getRepoPublicKey({ repo: repoName, owner: username })
const createRepoSecret = async (username: string, repoName: string, secretName: string, secretValue: string, keyId: string) => {
    await githubAPIClient.rest.actions.createOrUpdateRepoSecret({ owner: username, repo: repoName, secret_name: secretName, encrypted_value: secretValue, key_id: keyId })
}

export default {
    createRepo,
    deleteUserRepo,
    getRepoPublicEncryptionKey,
    createRepoSecret
}