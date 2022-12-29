import { Button, Box } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useSessionStorage, useLocalStorage } from 'usehooks-ts';
import { useGithubAPI } from '../apis/github';
import { StorageKeys, VercelCreateProjectResponse } from '../models';
import DoneIcon from '@mui/icons-material/Done';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { IDS, TEMPLATE_NAME } from '../constants';
import { useVercelAPI } from '../apis/vercel';

enum CreateStepStatus {
    notStarted = 'not-started',
    inProgress = 'in-progress',
    completed = 'completed',
    failed = 'failed',
}

interface StepState {
    label: string;
    status: CreateStepStatus;
    statusMessage: string;
    id: string;
}

const getStatusIcon = (status: CreateStepStatus) => {
    switch (status) {
        case CreateStepStatus.inProgress:
            return <CircularProgress />;
        case CreateStepStatus.completed:
            return <DoneIcon />;
        case CreateStepStatus.failed:
            return <ReportGmailerrorredIcon />;
        default:
            return null;
    }
};

const getStatusColor = (status: CreateStepStatus) => {
    switch (status) {
        case CreateStepStatus.inProgress:
            return 'info.main';
        case CreateStepStatus.completed:
            return 'success.main';
        case CreateStepStatus.failed:
            return 'error.main';
        default:
            return 'primary.main';
    }
};

const initialCreateState: StepState[] = [
    {
        label: 'Create repo',
        status: CreateStepStatus.notStarted,
        statusMessage: '',
        id: IDS.STEPS.CREATE_REPO,
    },
    {
        label: 'Create frontend',
        status: CreateStepStatus.notStarted,
        statusMessage: '',
        id: IDS.STEPS.CREATE_FRONTEND,
    },
    {
        label: 'Set repo secrets',
        status: CreateStepStatus.notStarted,
        statusMessage: '',
        id: IDS.STEPS.CREATE_REPO_SECRETS,
    },
    {
        label: 'Deploy frontend',
        status: CreateStepStatus.notStarted,
        statusMessage: '',
        id: IDS.STEPS.DEPLOY_FRONTEND,
    },
];

const PageCreate = () => {
    const [githubAPIKey, _setGithubAPIKeyValue] = useSessionStorage(
        StorageKeys.repoAPIKey,
        ''
    );
    const [vercelAPIKey, _setVercelAPIKeyValue] = useSessionStorage(
        StorageKeys.repoAPIKey,
        ''
    );
    const [repoNameValue, _setRepoNameValue] = useLocalStorage(
        StorageKeys.repoName,
        ''
    );
    const [frontendProjectName, _setFrontendProjectNameValue] = useLocalStorage(
        StorageKeys.frontendProjectName,
        ''
    );
    const [vercelCreateData, setVercelCreateData] =
        useLocalStorage<VercelCreateProjectResponse>(
            StorageKeys.vercelCreateData,
            { id: '', accountId: '' }
        );
    const [createState, setCreateState] = useLocalStorage<StepState[]>(
        StorageKeys.createState,
        initialCreateState
    );
    const updateCreateState = (
        step: StepState['id'],
        status: StepState['status'],
        statusMessage: StepState['statusMessage'] = ''
    ) => {
        const stepIndex = createState.findIndex(({ id }) => id === step);
        if (stepIndex === -1) {
            console.log('Failed to determine step to update.');
            return;
        }
        const newState = createState;
        newState[stepIndex] = {
            ...createState[stepIndex],
            status,
            statusMessage,
        };
        setCreateState(newState);
    };

    const githubAPI = useGithubAPI(githubAPIKey);
    const vercelAPI = useVercelAPI(vercelAPIKey);

    // API operations keyed by step ids
    const operations = {
        [IDS.STEPS.CREATE_REPO]: async () => {
            return await githubAPI.createRepoFromTemplate(
                repoNameValue,
                TEMPLATE_NAME
            );
        },
        [IDS.STEPS.CREATE_FRONTEND]: async () => {
            return await vercelAPI.createProject(frontendProjectName);
        },
        [IDS.STEPS.CREATE_REPO_SECRETS]: async () => {
            return await githubAPI.createRepoFromTemplate(
                repoNameValue,
                'stuff'
            );
        },
        [IDS.STEPS.DEPLOY_FRONTEND]: async () => {
            return await githubAPI.createRepoFromTemplate(
                repoNameValue,
                'stuff'
            );
        },
    };

    // Execution wrapper to dry up handling responses
    const executeStep = async (step: string) => {
        try {
            updateCreateState(step, CreateStepStatus.inProgress);
            const res = await operations[step]();
            updateCreateState(step, CreateStepStatus.completed);
            return res;
        } catch (err) {
            const failMessage = axios.isAxiosError(err)
                ? err.response?.data?.message ?? err.message
                : `Operation failed: Unable to parse message.`;
            updateCreateState(step, CreateStepStatus.failed, failMessage);
        }
    };

    // Orchestrate project creation.
    const createProject = async () => {
        // Run repo creation and frontend creation in parallel
        await Promise.all([
            await executeStep(IDS.STEPS.CREATE_REPO),
            async () => {
                const frontendCreateRes = await executeStep(
                    IDS.STEPS.CREATE_FRONTEND
                );
                if (frontendCreateRes) {
                    setVercelCreateData(
                        frontendCreateRes.data as VercelCreateProjectResponse
                    );
                }
            },
        ]);
    };

    const resetCreation = async () => {
        // TODO: Check in progress and prompt
        setCreateState(initialCreateState);
    };

    return (
        <>
            <Button onClick={createProject}>Create Project</Button>
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto auto',
                    rowGap: 5,
                    columnGap: 2,
                    gridAutoRows: 'minmax(40px, auto)',
                }}
            >
                {createState.map((step) => {
                    return (
                        <>
                            <Box>{step.label}</Box>
                            <Box>{step.status}</Box>
                            <Box>{getStatusIcon(step.status)}</Box>
                            <Box>{step.statusMessage}</Box>
                        </>
                    );
                })}
            </Box>
            <Button onClick={resetCreation}>Reset creation</Button>
        </>
    );
};

export default PageCreate;
