import { FormLabel, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import { IDENTIFIERS } from '../constants';
import { LocalStorageKeys } from '../models';

const SelectPackageManager = () => {
    const [repoAPIKeyValue, setRepoAPIKeyValue] = useSessionStorage(
        LocalStorageKeys.repoAPIKey,
        ''
    );

    const updateRepoAPIKey = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRepoAPIKeyValue(event.target.value);
    };

    const [frontendAPIKeyValue, setFrontendAPIKeyValue] = useSessionStorage(
        LocalStorageKeys.frontendAPIKey,
        ''
    );

    const updateFrontendAPIKey = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFrontendAPIKeyValue(event.target.value);
    };

    return (
        <>
            <FormLabel id={IDENTIFIERS.FRONTEND_API_KEY}>
                Repository Details
            </FormLabel>
            <TextField
                id={IDENTIFIERS.FRONTEND_API_KEY}
                label="Repository API key"
                variant="outlined"
                required
                onChange={updateRepoAPIKey}
                value={repoAPIKeyValue}
            />
            <TextField
                id={IDENTIFIERS.FRONTEND_API_KEY}
                label="Frontend API key"
                variant="outlined"
                required
                onChange={updateFrontendAPIKey}
                value={frontendAPIKeyValue}
            />
        </>
    );
};

export default SelectPackageManager;
