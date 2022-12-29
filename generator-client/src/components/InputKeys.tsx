import { FormLabel, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import { IDS } from '../constants';
import { StorageKeys } from '../models';
import { createTestIdProp } from './helpers';

const SelectPackageManager = () => {
    const [repoAPIKeyValue, setRepoAPIKeyValue] = useSessionStorage(
        StorageKeys.repoAPIKey,
        ''
    );

    const updateRepoAPIKey = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRepoAPIKeyValue(event.target.value);
    };

    const [frontendAPIKeyValue, setFrontendAPIKeyValue] = useSessionStorage(
        StorageKeys.frontendAPIKey,
        ''
    );

    const updateFrontendAPIKey = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFrontendAPIKeyValue(event.target.value);
    };

    return (
        <>
            <FormLabel>Repository Details</FormLabel>
            <TextField
                id={IDS.REPO_API_KEY_INPUT}
                label="Repository API key"
                variant="outlined"
                required
                onChange={updateRepoAPIKey}
                value={repoAPIKeyValue}
                inputProps={{
                    ...createTestIdProp(IDS.REPO_API_KEY_INPUT),
                }}
                type="password"
            />
            <TextField
                id={IDS.FRONTEND_API_KEY_INPUT}
                label="Frontend API key"
                variant="outlined"
                required
                onChange={updateFrontendAPIKey}
                value={frontendAPIKeyValue}
                inputProps={createTestIdProp(IDS.FRONTEND_API_KEY_INPUT)}
                type="password"
            />
        </>
    );
};

export default SelectPackageManager;
