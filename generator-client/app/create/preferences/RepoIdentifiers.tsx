'use client';

import { FormLabel, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { LocalStorageKeys } from '../../../models';

const REPO_NAME_LABEL = 'repository-name';

const SelectPackageManager = () => {
    const [repoNameValue, setRepoNameValue] = useLocalStorage(
        LocalStorageKeys.repoName,
        ''
    );

    const updateRepoName = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (event.target.value) {
            setRepoNameValue(event.target.value);
        }
    };

    const [repoOwnerValue, setRepoOwnerValue] = useLocalStorage(
        LocalStorageKeys.repoOwner,
        ''
    );

    return (
        <>
            {repoNameValue}
            {repoOwnerValue}
            <FormLabel id={REPO_NAME_LABEL}>Repository Details</FormLabel>
            <TextField
                id={REPO_NAME_LABEL}
                label="Repository Name"
                variant="outlined"
                required
                onChange={updateRepoName}
                value={repoNameValue}
            />
        </>
    );
};

export default SelectPackageManager;
