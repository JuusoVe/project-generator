import {
    Button,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Table,
} from '@mui/material';
import axios from 'axios';
import { useSessionStorage, useLocalStorage } from 'usehooks-ts';
import { useGithubAPI } from '../apis/github';
import {
    CreateStepStatus,
    StepState,
    StorageKeys,
    VercelProjectData,
} from '../models';
import DoneIcon from '@mui/icons-material/Done';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import {
    IDS,
    INITIAL_CREATE_STATE,
    SECRET_KEYS,
    TEMPLATE_NAME,
} from '../constants';
import { useVercelAPI } from '../apis/vercel';

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

const PageCreate = () => {
    const [githubAPIKey] = useSessionStorage(StorageKeys.repoAPIKey, '');
    const [vercelAPIKey] = useSessionStorage(StorageKeys.frontendAPIKey, '');
    const [repoName] = useLocalStorage(StorageKeys.repoName, '');
    const [repoOwner] = useLocalStorage(StorageKeys.repoOwner, '');

    const [frontendProjectName] = useLocalStorage(
        StorageKeys.frontendProjectName,
        ''
    );
    const [, setVercelCreateData] = useLocalStorage<VercelProjectData>(
        StorageKeys.vercelCreateData,
        {
            id: '',
            accountId: '',
        }
    );
    const [createState, setCreateState] = useLocalStorage<StepState[]>(
        StorageKeys.createState,
        INITIAL_CREATE_STATE
    );

    const updateCreateState = (
        step: StepState['id'],
        status?: StepState['status'],
        statusMessage?: StepState['statusMessage']
    ) => {
        const stepIndex = createState.findIndex(({ id }) => id === step);
        if (stepIndex === -1) {
            console.log('Failed to determine step to update.');
            return;
        }
        const originalStepState = createState[stepIndex];
        // Maybe modify state
        const stepWithNewStatus = status
            ? { ...originalStepState, status }
            : originalStepState;
        // Maybe modify message
        const stepWithNewMessage = statusMessage
            ? { ...stepWithNewStatus, statusMessage }
            : stepWithNewStatus;

        const newState = createState;

        // Replace a single step state
        newState[stepIndex] = stepWithNewMessage;
        setCreateState(newState);
    };

    const githubAPI = useGithubAPI(githubAPIKey);
    const vercelAPI = useVercelAPI(vercelAPIKey);

    // API operations keyed by step ids
    const operations = {
        [IDS.STEPS.CREATE_REPO]: async () => {
            const result = await githubAPI.createRepoFromTemplate(
                repoName,
                TEMPLATE_NAME
            );

            if (result) {
                updateCreateState(
                    IDS.STEPS.CREATE_REPO,
                    CreateStepStatus.completed,
                    `url: ${result.data.html_url}`
                );
            }
            return result.data;
        },
        [IDS.STEPS.CREATE_FRONTEND]: async () => {
            const result = await vercelAPI.createProject(frontendProjectName);
            setVercelCreateData(
                // TS running out of brains here with the return types
                result.data
            );
            return result.data;
        },
        [IDS.STEPS.CREATE_REPO_SECRETS]: async (
            vercelProjectData: VercelProjectData
        ) => {
            return await Promise.all([
                await githubAPI.createRepoSecret(
                    repoOwner,
                    repoName,
                    SECRET_KEYS.VERCEL.PROJECT_ID,
                    vercelProjectData.id
                ),
                await githubAPI.createRepoSecret(
                    repoOwner,
                    repoName,
                    SECRET_KEYS.VERCEL.ORG_ID,
                    vercelProjectData.accountId
                ),
                await githubAPI.createRepoSecret(
                    repoOwner,
                    repoName,
                    SECRET_KEYS.VERCEL.TOKEN,
                    vercelAPIKey
                        ? vercelAPIKey
                        : import.meta.env.VITE_TEST_VERCEL_TOKEN
                ),
            ]);
        },
        // [IDS.STEPS.WAIT_FOR_TESTS]: async () => {
        //     return await githubAPI.waitForTestComplete(repoOwner, repoName);
        // },
        [IDS.STEPS.WAIT_FOR_DEPLOYMENT]: async () => {
            const result = await vercelAPI.waitForDeployment(
                frontendProjectName
            );
            console.log('result in operation');

            console.log(result);

            return result;
        },
    };

    // TODO: Type this, can return AxiosResponse or void or..
    type StepFunction = (args?: any) => Promise<any>;

    // Execution wrapper to DRY up handling responses
    const executeStep = async (
        stepId: string,
        stepFunction: StepFunction,
        args?: VercelProjectData // This is a union of the possible args types, just this for now
    ) => {
        try {
            updateCreateState(stepId, CreateStepStatus.inProgress);
            const result = args
                ? await stepFunction(args)
                : await stepFunction();
            if (result) {
                updateCreateState(stepId, CreateStepStatus.completed);
                return result;
            }
        } catch (err) {
            // Message from data -> message from error -> fallback
            const failMessage = axios.isAxiosError(err)
                ? err.response?.data?.message ?? err.message
                : `Operation failed: Unable to parse message.`;
            updateCreateState(stepId, CreateStepStatus.failed, failMessage);
        }
    };

    // Orchestrate project creation.
    const createProject = async () => {
        setCreateState(INITIAL_CREATE_STATE);
        await executeStep(
            IDS.STEPS.CREATE_REPO,
            operations[IDS.STEPS.CREATE_REPO]
        );
        const createFrontendRes = await executeStep(
            IDS.STEPS.CREATE_FRONTEND,
            operations[IDS.STEPS.CREATE_FRONTEND]
        );
        await executeStep(
            IDS.STEPS.CREATE_REPO_SECRETS,
            operations[IDS.STEPS.CREATE_REPO_SECRETS],
            createFrontendRes
        );
        await executeStep(
            IDS.STEPS.WAIT_FOR_DEPLOYMENT,
            operations[IDS.STEPS.WAIT_FOR_DEPLOYMENT],
            createFrontendRes
        );
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
        </>
    );
};

export default PageCreate;
