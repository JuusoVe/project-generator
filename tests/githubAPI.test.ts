import request from 'supertest'
import app from '../src/app'
import { REPOS_GITHUB_PATH, SECRETS_PATH } from '../src/routes/repos'

const { TEST_REPO_OWNER } = process.env
const REPO_NAME = 'generator-test-repo'
const SECRET_ENV_NAME = 'TEST_SECRET_ENV'
const SECRET_VALUE = 'TEST_SECRET_VALUE'


beforeAll(async () => {
    const createResponse = await request(app).post(REPOS_GITHUB_PATH).send({ repoName: REPO_NAME })
    expect(createResponse.statusCode).toBe(200)
})

afterAll(async () => {
    const deleteResponse = await request(app).delete(REPOS_GITHUB_PATH).send({ username: TEST_REPO_OWNER, repoName: REPO_NAME })
    expect(deleteResponse.statusCode).toBe(200)
})

test('can create secrets', async () => {
    const createSecretResponse = await request(app).post(REPOS_GITHUB_PATH + SECRETS_PATH).send({ username: TEST_REPO_OWNER, repoName: REPO_NAME, envName: SECRET_ENV_NAME, secretValue: SECRET_VALUE })
    expect(createSecretResponse.statusCode).toBe(200)
})



