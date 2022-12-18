import request from 'supertest'
import { REQUIRED_ENVS } from '../src'
import app from '../src/app'
import { FRONTENDS_VERCEL_PROJECT_PATH } from '../src/routes/frontends'
import {
    REPOS_GITHUB_PATH,
    SECRETS_PATH,
    TRIGGER_PIPELINE_PATH,
} from '../src/routes/repos'

const targetRepoOwner = process.env[REQUIRED_ENVS.targetRepoOwner]
const TARGET_REPO_NAME = 'generator-test-target-repo'
const TARGET_FRONTEND_PROJECT_NAME = 'test-frontend-project'
const VERCEL_TOKEN_SECRET_ENV_NAME = 'VERCEL_TOKEN'
const VERCEL_PROJECT_ID_SECRET_ENV_NAME = 'VERCEL_PROJECT_ID'
const VERCEL_ORG_ID_SECRET_ENV_NAME = 'VERCEL_ORG_ID'
const TRIGGER_PIPELINE_EVENT_NAME = 'manually-trigger-pipeline'

// These are set in create project step
let CREATED_VERCEL_PROJECT_ID: string
let CREATED_VERCEL_PROJECT_ORG_ID: string

test('can create a repo', async () => {
    const createRepoResponse = await request(app)
        .post(REPOS_GITHUB_PATH)
        .send({ repoName: TARGET_REPO_NAME })
    expect(createRepoResponse.statusCode).toBe(200)
})

test('can create a vercel project', async () => {
    const createFrontendProjectResponse = await request(app)
        .post(FRONTENDS_VERCEL_PROJECT_PATH)
        .send({ projectName: TARGET_FRONTEND_PROJECT_NAME })
    expect(createFrontendProjectResponse.statusCode).toBe(200)

    CREATED_VERCEL_PROJECT_ID = createFrontendProjectResponse.body.id
    CREATED_VERCEL_PROJECT_ORG_ID = createFrontendProjectResponse.body.accountId
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

test('can set vercel org id secret to repo', async () => {
    const createSecretResponse = await request(app)
        .post(REPOS_GITHUB_PATH + SECRETS_PATH)
        .send({
            username: targetRepoOwner,
            repoName: TARGET_REPO_NAME,
            envName: VERCEL_ORG_ID_SECRET_ENV_NAME,
            secretValue: CREATED_VERCEL_PROJECT_ORG_ID,
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
            secretValue: process.env[REQUIRED_ENVS.userVercelToken],
        })
    expect(createSecretResponse.statusCode).toBe(200)
})

test('can trigger a workflow in the repo', async () => {
    const triggerRepositoryPipelineResponse = await request(app)
        .post(REPOS_GITHUB_PATH + TRIGGER_PIPELINE_PATH)
        .send({
            username: targetRepoOwner,
            repoName: TARGET_REPO_NAME,
            eventType: TRIGGER_PIPELINE_EVENT_NAME,
        })
    console.log(triggerRepositoryPipelineResponse.body)
    expect(triggerRepositoryPipelineResponse.statusCode).toBe(200)
})

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
        const [firstError] = errors
        throw firstError
    }
})
