import { FormLabel, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { IDENTIFIERS } from '../constants';
import { LocalStorageKeys } from '../models';

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
        <>
            <FormLabel id={IDENTIFIERS.REPO_NAME}>Repository Details</FormLabel>
            <TextField
                id={IDENTIFIERS.REPO_NAME}
                label="Repository Name"
                variant="outlined"
                required
                onChange={updateRepoName}
                value={repoNameValue}
            />
            <TextField
                id={IDENTIFIERS.REPO_OWNER}
                label="Repository Owner"
                variant="outlined"
                required
                onChange={updateRepoOwner}
                value={repoOwnerValue}
            />
        </>
    );
};

export default SelectPackageManager;
