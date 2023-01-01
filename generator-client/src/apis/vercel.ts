import axios from 'axios';
import retry from 'async-await-retry';
import { VercelProjectData } from '../models';
import { SECONDS_10 } from '../constants';

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
            Authorization: `Bearer ${
                // use env as a fallback for development
                apiKey ? apiKey : import.meta.env.VITE_TEST_VERCEL_TOKEN
            }`,
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
        const response = await client.post<VercelProjectData>(
            VERCEL_PROJECTS_PATH,
            {
                name: projectName,
                ...VERCEL_NEXT_PROJECT_CONFIG,
            }
        );

        return response;
    };

    const deleteProject = async (projectName: string) => {
        const response = await client.delete(
            VERCEL_PROJECTS_PATH + '/' + projectName
        );
        return response;
    };

    const getProject = async (projectName: string) => {
        const response = await client.get<VercelProjectData>(
            `${VERCEL_PROJECTS_PATH}/${projectName}`
        );
        return response;
    };

    const waitForDeployment = async (
        projectName: string
    ): Promise<VercelProjectData['latestDeployments']> => {
        return await retry(
            async () => {
                const project = await getProject(projectName);
                console.log('project:');
                console.log(project);

                const { latestDeployments: deployments } = project.data;
                if (!deployments || !deployments.length) {
                    throw new Error('No deployments.');
                }

                const deploymentComplete = deployments.some(
                    ({ readyState }) => {
                        return readyState === 'READY';
                    }
                );
                if (!deploymentComplete) {
                    throw new Error('Deployment not complete');
                }
                return deployments;
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
        createProject,
        deleteProject,
        waitForDeployment,
    };
};
