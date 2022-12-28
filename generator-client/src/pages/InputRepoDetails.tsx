import { FormLabel, Stack, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { REPO_NAME_LABEL, REPO_OWNER_LABEL } from '../constants';
import { StorageKeys } from '../models';

const SelectPackageManager = () => {
    const [repoNameValue, setRepoNameValue] = useLocalStorage(
        StorageKeys.repoName,
        ''
    );

    const updateRepoName = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRepoNameValue(event.target.value);
    };

    const [repoOwnerValue, setRepoOwnerValue] = useLocalStorage(
        StorageKeys.repoOwner,
        ''
    );

    const updateRepoOwner = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRepoOwnerValue(event.target.value);
    };

    return (
        <Stack spacing={4}>
            <FormLabel id={REPO_NAME_LABEL}>Repository Details</FormLabel>
            <TextField
                id={REPO_NAME_LABEL}
                label="Repository Name"
                variant="outlined"
                required
                onChange={updateRepoName}
                value={repoNameValue}
            />
            <TextField
                id={REPO_OWNER_LABEL}
                label="Repository Owner"
                variant="outlined"
                required
                onChange={updateRepoOwner}
                value={repoOwnerValue}
            />
        </Stack>
    );
};

export default SelectPackageManager;
