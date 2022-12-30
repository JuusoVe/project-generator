import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import { useLocalStorage, useSessionStorage } from 'usehooks-ts';
import { useGithubAPI } from '../apis/github';
import { useVercelAPI } from '../apis/vercel';
import { StorageKeys } from '../models';

const DeleteResources = () => {
    const [destroyRepoSuccess, setDestroyRepoSuccess] = useLocalStorage(
        StorageKeys.destroyRepoSuccess,
        true
    );
    const [destroyRepoStatusText, setDestroyRepoStatusText] = useLocalStorage(
        StorageKeys.destroyRepoStatusText,
        ''
    );
    const [destroyFrontendSuccess, setDestroyFrontendSuccess] = useLocalStorage(
        StorageKeys.destroyFrontendSuccess,
        true
    );
    const [destroyFrontendStatusText, setDestroyFrontendStatusText] =
        useLocalStorage(StorageKeys.destroyFrontendStatusText, '');
    const [githubAPIKey] = useSessionStorage(StorageKeys.repoAPIKey, '');
    const [frontendAPIKey] = useSessionStorage(StorageKeys.frontendAPIKey, '');
    const [repoNameValue] = useLocalStorage(StorageKeys.repoName, '');
    const [repoOwnerValue] = useLocalStorage(StorageKeys.repoOwner, '');
    const [frontendNameValue] = useLocalStorage(
        StorageKeys.frontendProjectName,
        ''
    );

    const githubAPI = useGithubAPI(githubAPIKey);
    const vercelAPI = useVercelAPI(frontendAPIKey);

    const deleteResources = async () => {
        try {
            await githubAPI.deleteUserRepo(repoOwnerValue, repoNameValue);
            setDestroyRepoSuccess(true);
            setDestroyRepoStatusText('Successfully deleted repo.');
        } catch (err) {
            setDestroyRepoSuccess(false);
            setDestroyRepoStatusText(
                `Repository delete failed: ${
                    axios.isAxiosError(err)
                        ? err.response?.data?.message ?? err.message
                        : 'Unable to parse message.'
                }`
            );
        }
        try {
            await vercelAPI.deleteProject(frontendNameValue);
            setDestroyFrontendSuccess(true);
            setDestroyFrontendStatusText('Successfully deleted frontend.');
        } catch (err) {
            setDestroyFrontendSuccess(false);
            setDestroyFrontendStatusText(
                `Frontend delete failed: ${
                    axios.isAxiosError(err)
                        ? err.response?.data?.message ?? err.message
                        : 'Unable to parse message.'
                }`
            );
        }
    };

    return (
        <Stack>
            <Typography
                variant="h6"
                sx={{
                    color: destroyRepoSuccess ? 'primary.main' : 'error.main',
                }}
            >
                {destroyRepoStatusText}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    color: destroyFrontendSuccess
                        ? 'primary.main'
                        : 'error.main',
                }}
            >
                {destroyFrontendStatusText}
            </Typography>
            <Button onClick={deleteResources}>Delete resources</Button>
        </Stack>
    );
};
export default DeleteResources;
