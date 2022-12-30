import {
    Button,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Typography,
    Table,
} from '@mui/material';
import axios from 'axios';
import { useSessionStorage, useLocalStorage } from 'usehooks-ts';
import { useGithubAPI } from '../apis/github';
import { StorageKeys, VercelCreateProjectData } from '../models';
import DoneIcon from '@mui/icons-material/Done';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { IDS, SECRET_KEYS, TEMPLATE_NAME } from '../constants';
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
            return <CircularProgress color="info" />;
        case CreateStepStatus.completed:
            return <DoneIcon color="success" />;
        case CreateStepStatus.failed:
            return <ReportGmailerrorredIcon color="error" />;
        default:
            return <DoneIcon color="disabled" />;
    }
};

const getStatusColor = (status: CreateStepStatus) => {
    switch (status) {
        case CreateStepStatus.inProgress:
            return 'info';
        case CreateStepStatus.completed:
            return 'success';
        case CreateStepStatus.failed:
            return 'error';
        default:
            return 'primary';
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
    const [githubAPIKey] = useSessionStorage(StorageKeys.repoAPIKey, '');
    const [vercelAPIKey] = useSessionStorage(StorageKeys.repoAPIKey, '');
    const [repoName] = useLocalStorage(StorageKeys.repoName, '');
    const [repoOwner] = useLocalStorage(StorageKeys.repoOwner, '');

    const [frontendProjectName] = useLocalStorage(
        StorageKeys.frontendProjectName,
        ''
    );
    const [vercelCreateData, setVercelCreateData] =
        useLocalStorage<VercelCreateProjectData>(StorageKeys.vercelCreateData, {
            id: '',
            accountId: '',
        });
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
                repoName,
                TEMPLATE_NAME
            );
        },
        [IDS.STEPS.CREATE_FRONTEND]: async () => {
            const createRes = await vercelAPI.createProject(
                frontendProjectName
            );
            setVercelCreateData(
                // TS running out of brains here with the return types
                createRes.data
            );
            return;
        },
        [IDS.STEPS.CREATE_REPO_SECRETS]: async () => {
            return await Promise.all([
                await githubAPI.createRepoSecret(
                    repoOwner,
                    repoName,
                    SECRET_KEYS.VERCEL.PROJECT_ID,
                    vercelCreateData.id
                ),
                await githubAPI.createRepoSecret(
                    repoOwner,
                    repoName,
                    SECRET_KEYS.VERCEL.ORG_ID,
                    vercelCreateData.accountId
                ),
            ]);
        },
        [IDS.STEPS.DEPLOY_FRONTEND]: async () => {
            return await githubAPI.createRepoFromTemplate(repoName, 'stuff');
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
        const createRes = await Promise.allSettled([
            await executeStep(IDS.STEPS.CREATE_REPO),
            await executeStep(IDS.STEPS.CREATE_FRONTEND),
        ]);
        if (createRes) await executeStep(IDS.STEPS.CREATE_REPO_SECRETS);
    };

    const resetCreation = async () => {
        // TODO: Check in progress and prompt
        setCreateState(initialCreateState);
    };

    return (
        <>
            <Button onClick={createProject}>Create Project</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={3} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {createState.map((step, index) => (
                            <TableRow key={index}>
                                <TableCell width={'30%'}>
                                    {step.label}
                                </TableCell>
                                <TableCell width={'20%'}>
                                    {getStatusIcon(step.status)}
                                </TableCell>
                                <TableCell>{step.statusMessage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={resetCreation}>Reset creation</Button>
        </>
    );
};

export default PageCreate;
