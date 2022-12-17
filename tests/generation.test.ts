import request from 'supertest'
import { REQUIRED_ENVS } from '../src'
import app from '../src/app'
import { FRONTENDS_VERCEL_PROJECT_PATH } from '../src/routes/frontends'
import { REPOS_GITHUB_PATH, SECRETS_PATH } from '../src/routes/repos'

const targetRepoOwner = process.env[REQUIRED_ENVS.targetRepoOwner]
const TARGET_REPO_NAME = 'generator-test-target-repo'
const TARGET_FRONTEND_PROJECT_NAME = 'test-frontend-project'
const VERCEL_TOKEN_SECRET_ENV_NAME = 'VERCEL_TOKEN'
const VERCEL_PROJECT_ID_SECRET_ENV_NAME = 'VERCEL_PROJECT_ID'

// try-catches allow us to clean up other resources even if something fails
afterAll(async () => {
    const errors: unknown[] = []
    try {
        const deleteRepoResponse = await request(app)
            .delete(REPOS_GITHUB_PATH)
            .send({ username: targetRepoOwner, repoName: TARGET_REPO_NAME })
        expect(deleteRepoResponse.statusCode).toBe(200)
    } catch (err) {
        errors.push(err)
    }
    try {
        const deleteFrontendProjectResponse = await request(app)
            .delete(FRONTENDS_VERCEL_PROJECT_PATH)
            .send({ projectName: TARGET_FRONTEND_PROJECT_NAME })
        expect(deleteFrontendProjectResponse.statusCode).toBe(200)
    } catch (err) {
        errors.push(err)
    }
    if (errors.length) {
        throw errors[0]
    }
})

test('can create a repo', async () => {
    const createRepoResponse = await request(app)
        .post(REPOS_GITHUB_PATH)
        .send({ repoName: TARGET_REPO_NAME })
    expect(createRepoResponse.statusCode).toBe(200)
})

test('can create vercel project', async () => {
    const createFrontendProjectResponse = await request(app)
        .post(FRONTENDS_VERCEL_PROJECT_PATH)
        .send({ projectName: TARGET_FRONTEND_PROJECT_NAME })
    expect(createFrontendProjectResponse.statusCode).toBe(200)
})

test('can set vercel project id secret to repo', async () => {
    const createSecretResponse = await request(app)
        .post(REPOS_GITHUB_PATH + SECRETS_PATH)
        .send({
            username: targetRepoOwner,
            repoName: TARGET_REPO_NAME,
            envName: VERCEL_PROJECT_ID_SECRET_ENV_NAME,
            secretValue: TARGET_FRONTEND_PROJECT_NAME,
        })
    expect(createSecretResponse.statusCode).toBe(200)
})

test('can set vercel token secret to repo', async () => {
    const createSecretResponse = await request(app)
        .post(REPOS_GITHUB_PATH + SECRETS_PATH)
        .send({
            username: targetRepoOwner,
            repoName: TARGET_REPO_NAME,
            envName: VERCEL_TOKEN_SECRET_ENV_NAME,
            secretValue: REQUIRED_ENVS.userVercelToken,
        })
    expect(createSecretResponse.statusCode).toBe(200)
})
