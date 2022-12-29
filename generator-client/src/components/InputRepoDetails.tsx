import { FormLabel, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { IDS } from '../constants';
import { StorageKeys } from '../models';
import { createTestIdProp } from './helpers';

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
        <>
            <FormLabel id={IDS.REPO_NAME_INPUT}>Repository Details</FormLabel>
            <TextField
                id={IDS.REPO_NAME_INPUT}
                label="Repository Name"
                variant="outlined"
                required
                onChange={updateRepoName}
                value={repoNameValue}
                inputProps={createTestIdProp(IDS.REPO_NAME_INPUT)}
                // data-testid={}
            />
            <TextField
                id={IDS.REPO_OWNER_INPUT}
                label="Repository Owner"
                variant="outlined"
                required
                onChange={updateRepoOwner}
                value={repoOwnerValue}
                inputProps={createTestIdProp(IDS.REPO_OWNER_INPUT)}
            />
        </>
    );
};

export default SelectPackageManager;
