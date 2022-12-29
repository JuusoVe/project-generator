import { Button, Box } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useSessionStorage, useLocalStorage } from 'usehooks-ts';
import { useGithubAPI } from '../apis/github';
import { StorageKeys } from '../models';
import DoneIcon from '@mui/icons-material/Done';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { TEMPLATE_NAME } from '../constants';

enum CreateStepStatus {
    notStarted = 'not-started',
    inProgress = 'in-progress',
    completed = 'completed',
    failed = 'failed',
}

enum CreateStep {
    createRepo = 'create-repo',
    createFrontend = 'create-frontend',
    createRepoSecrets = 'create-repo-secrets',
    deployFrontend = 'deploy-frontend',
}

interface StepState {
    label: string;
    status: CreateStepStatus;
    statusMessage: string;
    id: CreateStep;
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
        id: CreateStep.createRepo,
    },
    {
        label: 'Create frontend',
        status: CreateStepStatus.notStarted,
        statusMessage: '',
        id: CreateStep.createFrontend,
    },
    {
        label: 'Set repo secrets',
        status: CreateStepStatus.notStarted,
        statusMessage: '',
        id: CreateStep.createRepoSecrets,
    },
    {
        label: 'Deploying frontend',
        status: CreateStepStatus.notStarted,
        statusMessage: '',
        id: CreateStep.deployFrontend,
    },
];

const PageCreate = () => {
    const [apiKey, _setValue] = useSessionStorage(StorageKeys.repoAPIKey, '');
    const [repoNameValue, _setRepoNameValue] = useLocalStorage(
        StorageKeys.repoName,
        ''
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

    const githubAPI = useGithubAPI(apiKey);

    const operations = {
        [CreateStep.createRepo]: () =>
            githubAPI.createRepoFromTemplate(repoNameValue, TEMPLATE_NAME),
        [CreateStep.createFrontend]: () => {
            githubAPI.createRepoFromTemplate(repoNameValue, 'stuff');
        },
        [CreateStep.createRepoSecrets]: () => {
            githubAPI.createRepoFromTemplate(repoNameValue, 'stuff');
        },
        [CreateStep.deployFrontend]: () => {
            githubAPI.createRepoFromTemplate(repoNameValue, 'stuff');
        },
    };

    const executeStep = async (step: CreateStep) => {
        try {
            updateCreateState(step, CreateStepStatus.inProgress);
            await operations[step]();
            updateCreateState(
                CreateStep.createRepo,
                CreateStepStatus.completed
            );
        } catch (err) {
            const failMessage = axios.isAxiosError(err)
                ? err.response?.data.message ?? err.message
                : `Operation failed: Unable to parse message.`;

            updateCreateState(step, CreateStepStatus.failed, failMessage);
        }
    };

    const createProject = async () => {
        await executeStep(CreateStep.createRepo);
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
        </>
    );
};

export default PageCreate;
