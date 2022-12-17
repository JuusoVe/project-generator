import { Router } from 'express'
import { REQUIRED_ENVS } from '..'
import githubAPIClient from '../apis/github'
import { encryptSecret } from '../utils'

export const REPOS_GITHUB_PATH = '/repos/github'
export const SECRETS_PATH = '/secrets'

const {
    [REQUIRED_ENVS.templateRepoOwner]: templateRepoOwner,
    [REQUIRED_ENVS.templateRepoName]: templateRepoName,
} = process.env

const router = Router()

router.post(REPOS_GITHUB_PATH + SECRETS_PATH, async (req, res) => {
    const { username, repoName, envName, secretValue } = req.body
    const getPublicKeyResponse =
        await githubAPIClient.getRepoPublicEncryptionKey(username, repoName)
    const { key_id: keyId, key } = getPublicKeyResponse.data
    const encryptedSecret = await encryptSecret(key, secretValue)
    await githubAPIClient.createRepoSecret(
        username,
        repoName,
        envName,
        encryptedSecret,
        keyId
    )
    res.json('OK.')
})

router.post(REPOS_GITHUB_PATH, async (req, res) => {
    const { repoName } = req.body
    const createRepoResponse = await githubAPIClient.createRepoFromTemplate(
        repoName,
        templateRepoName as string,
        templateRepoOwner as string
    )
    res.json(createRepoResponse.data)
})

router.delete(REPOS_GITHUB_PATH, async (req, res) => {
    const { username, repoName } = req.body
    const deleteRepoResponse = await githubAPIClient.deleteUserRepo(
        username,
        repoName
    )
    res.json(deleteRepoResponse.data)
})

export default router
