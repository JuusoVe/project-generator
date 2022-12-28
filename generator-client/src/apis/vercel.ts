import axios from 'axios';
import { VercelCreateProjectResponse } from '../models';

const VERCEL_BASE_URL = 'https://api.vercel.com';
const VERCEL_PROJECTS_PATH = '/v9/projects';

const VERCEL_NEXT_PROJECT_CONFIG = {
    framework: 'nextjs',
    publicSource: false,
};

export const useVercelAPI = (apiKey: string) => {
    const client = axios.create({
        baseURL: VERCEL_BASE_URL,
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });
    /**
     * Example response:
     * {
     *    accountId: 'asdQWEadaWDAWeqwe',
     *    autoExposeSystemEnvs: true,
     *    buildCommand: null,
     *    createdAt: 1671359736888,
     *    devCommand: null,
     *    directoryListing: false,
     *    framework: null,
     *    gitForkProtection: true,
     *    id: 'prj_asdqweqwfwaewqe',
     *    installCommand: null,
     *    name: 'test-frontend-project',
     *    nodeVersion: '18.x',
     *    outputDirectory: null,
     *    publicSource: null,
     *    rootDirectory: null,
     *    serverlessFunctionRegion: 'iad1',
     *    sourceFilesOutsideRootDirectory: true,
     *    updatedAt: 1671359736888,
     *    live: false,
     *    latestDeployments: [],
     *    targets: {}
     * }
     *
     * TODO: We can define the start/build commands, node versions etc
     * directly here when creating.
     */
    const createProject = async (projectName: string) => {
        const createVercelProjectResponse =
            await client.post<VercelCreateProjectResponse>(
                VERCEL_PROJECTS_PATH,
                {
                    name: projectName,
                    ...VERCEL_NEXT_PROJECT_CONFIG,
                }
            );
        return createVercelProjectResponse.data;
    };

    const deleteProject = async (projectName: string) => {
        const deleteVercelProjectResponse = await client.delete(
            VERCEL_PROJECTS_PATH + '/' + projectName
        );
        return deleteVercelProjectResponse.data;
    };

    return {
        createProject,
        deleteProject,
    };
};
