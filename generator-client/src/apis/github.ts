import axios from 'axios';
import { Endpoints } from '@octokit/types';
import { encryptSecret } from '../helpers';
import retry from 'async-await-retry';
import { SECONDS_10 } from '../constants';

const GITHUB_BASE_URL = 'https://api.github.com';
const REPO_PATH = '/repos';
const TEMPLATE_REPO_OWNER = 'JuusoVe';

export const useGithubAPI = (apiKey: string) => {
    const client = axios.create({
        baseURL: GITHUB_BASE_URL,
        headers: {
            Authorization: `Bearer ${
                // use env as a fallback for development
                apiKey ? apiKey : import.meta.env.VITE_TEST_GH_TOKEN
            }`,
        },
    });

    const createRepoFromTemplate = async (
        newRepoName: string,
        templateRepoName: string
    ) => {
        const response = await client.post<
            Endpoints['POST /repos/{template_owner}/{template_repo}/generate']['response']['data']
        >(`${REPO_PATH}/${TEMPLATE_REPO_OWNER}/${templateRepoName}/generate`, {
            name: newRepoName,
        });
        return response;
    };

    const deleteUserRepo = async (username: string, repoName: string) => {
        const response = await client.delete<
            Endpoints['DELETE /repos/{owner}/{repo}']['response']['data']
        >(`${REPO_PATH}/${username}/${repoName}`);
        return response;
    };

    /**
     * Fetches a public key to sign a repo secret with.
     */
    const getRepoPublicEncryptionKey = async (
        username: string,
        repoName: string
    ) => {
        const response = await client.get<
            Endpoints['GET /repos/{owner}/{repo}/actions/secrets/public-key']['response']['data']
        >(`${REPO_PATH}/${username}/${repoName}/actions/secrets/public-key`);
        return response;
    };

    const createRepoSecret = async (
        username: string,
        repoName: string,
        secretName: string,
        secretValue: string
    ) => {
        const getPublicKeyResponse = await getRepoPublicEncryptionKey(
            username,
            repoName
        );

        const { key_id: publicKeyId, key: publicKeyValue } =
            getPublicKeyResponse.data;

        const encryptedSecretValue = await encryptSecret(
            publicKeyValue,
            secretValue
        );

        const createSecretResponse = await client.put<
            Endpoints['PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}']['response']['data']
        >(
            `${REPO_PATH}/${username}/${repoName}/actions/secrets/${secretName}`,
            {
                encrypted_value: encryptedSecretValue,
                key_id: publicKeyId,
            }
        );

        return createSecretResponse;
    };

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
    const triggerRepoPipeline = async (
        username: string,
        repoName: string,
        eventType: string
    ) => {
        const response = await client.post<
            Endpoints['POST /repos/{owner}/{repo}/dispatches']['response']['data']
        >(`${REPO_PATH}/${username}/${repoName}/dispatches`, {
            event_type: eventType,
        });
        console.log('trigger res:');
        console.log(response.data);

        return response;
    };

    const listWorkflows = async (username: string, repoName: string) => {
        const response = await client.get<
            Endpoints['GET /repos/{owner}/{repo}/actions/runs']
        >(`${REPO_PATH}/${username}/${repoName}/actions/runs`);
        return response;
    };

    const listWorkflowRuns = async (username: string, repoName: string) => {
        const response = await client.get<
            Endpoints['GET /repos/{owner}/{repo}/actions/runs']
        >(`${REPO_PATH}/${username}/${repoName}/actions/runs`);
        return response;
    };

    const waitForTestComplete = async (username: string, repoName: string) => {
        retry(
            async () => {
                const workflows = await listWorkflowRuns(username, repoName);
                console.log('workflows');
                console.log(workflows.data);
                throw new Error('Just throwing lol.');
            },
            undefined,
            {
                retriesMax: 12,
                interval: SECONDS_10,
                exponential: false,
            }
        );
    };

    return {
        createRepoFromTemplate,
        deleteUserRepo,
        getRepoPublicEncryptionKey,
        createRepoSecret,
        triggerRepoPipeline,
        waitForTestComplete,
    };
};
