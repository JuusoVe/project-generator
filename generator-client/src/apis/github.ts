// @ts-ignore}
import axios from 'axios';
import { Endpoints } from '@octokit/types';

const GITHUB_BASE_URL = 'https://api.github.com';
const REPO_PATH = '/repos';
const TEMPLATE_REPO_OWNER = 'JuusoVe';

export const useGithubAPI = (apiKey: string) => {
    const client = axios.create({
        baseURL: GITHUB_BASE_URL,
        headers: {
            Authorization: `Bearer ${
                apiKey ? apiKey : import.meta.env.VITE_TEST_GH_TOKEN
            }`,
        },
    });

    const createRepoFromTemplate = async (
        newRepoName: string,
        templateRepoName: string
    ) => {
        const createRepoResponse = await client.post<
            Endpoints['POST /repos/{template_owner}/{template_repo}/generate']['response']
        >(`${REPO_PATH}/${TEMPLATE_REPO_OWNER}/${templateRepoName}/generate`, {
            name: newRepoName,
        });
        return createRepoResponse;
    };

    const deleteUserRepo = async (username: string, repoName: string) => {
        const deleteRepoResponse = await client.delete<
            Endpoints['DELETE /repos/{owner}/{repo}']['response']
        >(`${REPO_PATH}/${username}/${repoName}`);
        return deleteRepoResponse;
    };

    // const getRepoPublicEncryptionKey = async (
    //     username: string,
    //     repoName: string
    // ) => {

    //     return await githubAPIClient.rest.actions.getRepoPublicKey({
    //         repo: repoName,
    //         owner: username,
    //     });
    // };

    // const createRepoSecret = async (
    //     username: string,
    //     repoName: string,
    //     secretName: string,
    //     secretValue: string,
    //     keyId: string
    // ) => {
    //     return await githubAPIClient.rest.actions.createOrUpdateRepoSecret({
    //         owner: username,
    //         repo: repoName,
    //         secret_name: secretName,
    //         encrypted_value: secretValue,
    //         key_id: keyId,
    //     });
    // };

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
    // const triggerRepositoryPipeline = async (
    //     username: string,
    //     repoName: string,
    //     eventType: string
    // ) => {
    //     return await githubAPIClient.rest.repos.createDispatchEvent({
    //         owner: username,
    //         repo: repoName,
    //         event_type: eventType,
    //     });
    // };

    // const listWorkflows = async (username: string, repo: string) => {
    //     return await githubAPIClient.rest.actions.listRepoWorkflows({
    //         owner: username,
    //         repo: repo,
    //     });
    // };

    return {
        createRepoFromTemplate,
        deleteUserRepo,
        // getRepoPublicEncryptionKey,
        // createRepoSecret,
        // triggerRepositoryPipeline,
        // listWorkflows,
    };
};
