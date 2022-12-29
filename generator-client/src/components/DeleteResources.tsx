import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import { useLocalStorage, useSessionStorage } from 'usehooks-ts';
import { useGithubAPI } from '../apis/github';
import { StorageKeys } from '../models';

const DeleteResrouces = () => {
    const [destroySuccess, setDestroySuccess] = useLocalStorage(
        StorageKeys.destroySuccess,
        true
    );
    const [destroyStatusText, setDestroyStatusText] = useLocalStorage(
        StorageKeys.destroyStatusText,
        ''
    );
    const [apiKey, _setValue] = useSessionStorage(StorageKeys.repoAPIKey, '');
    const [repoNameValue, _setRepoNameValue] = useLocalStorage(
        StorageKeys.repoName,
        ''
    );
    const [repoOwnerValue, _setRepoOwnerValue] = useLocalStorage(
        StorageKeys.repoOwner,
        ''
    );
    const githubAPI = useGithubAPI(apiKey);
    const deleteRepository = async () => {
        try {
            const res = await githubAPI.deleteUserRepo(
                repoOwnerValue,
                repoNameValue
            );

            setDestroySuccess(true);
            setDestroyStatusText('Successfully deleted repo.');
        } catch (err) {
            setDestroySuccess(false);
            if (axios.isAxiosError(err)) {
                setDestroyStatusText(
                    `Destroy failed: ${
                        err.response?.data?.message ?? err.message
                    }`
                );
            } else {
                setDestroyStatusText(
                    `Destroy failed: Unable to parse message.`
                );
            }
        }
    };

    return (
        <Stack>
            <Typography
                variant="h4"
                sx={{ color: destroySuccess ? 'primary.main' : 'error.main' }}
            >
                {destroyStatusText}
            </Typography>
            <Button onClick={deleteRepository}>Delete resources</Button>
        </Stack>
    );
};
export default DeleteResrouces;
