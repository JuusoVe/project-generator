'use client';

import { FormLabel, Stack, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { LocalStorageKeys } from '../models';

const REPO_NAME_LABEL = 'repository-name';
const REPO_OWNER_LABEL = 'repository-owner';

const SelectPackageManager = () => {
    const [repoNameValue, setRepoNameValue] = useLocalStorage(
        LocalStorageKeys.repoName,
        ''
    );

    const updateRepoName = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRepoNameValue(event.target.value);
    };

    const [repoOwnerValue, setRepoOwnerValue] = useLocalStorage(
        LocalStorageKeys.repoOwner,
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
