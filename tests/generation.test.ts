import request from 'supertest'
import app from '../src/app'
import { REPOS_GITHUB_PATH, SECRETS_PATH } from '../src/routes/repos'

const { TARGET_REPO_OWNER } = process.env
const TARGET_REPO_NAME = 'generator-test-target-repo'
const TARGET_SECRET_ENV_NAME = 'TEST_SECRET_ENV'
const TARGET_SECRET_VALUE = 'TEST_SECRET_VALUE'

beforeAll(async () => {
    const createResponse = await request(app)
        .post(REPOS_GITHUB_PATH)
        .send({ repoName: TARGET_REPO_NAME })
    expect(createResponse.statusCode).toBe(200)
})

afterAll(async () => {
    const deleteResponse = await request(app)
        .delete(REPOS_GITHUB_PATH)
        .send({ username: TARGET_REPO_OWNER, repoName: TARGET_REPO_NAME })
    expect(deleteResponse.statusCode).toBe(200)
})

test('can create secrets', async () => {
    const createSecretResponse = await request(app)
        .post(REPOS_GITHUB_PATH + SECRETS_PATH)
        .send({
            username: TARGET_REPO_OWNER,
            repoName: TARGET_REPO_NAME,
            envName: TARGET_SECRET_ENV_NAME,
            secretValue: TARGET_SECRET_VALUE,
        })
    expect(createSecretResponse.statusCode).toBe(200)
})
