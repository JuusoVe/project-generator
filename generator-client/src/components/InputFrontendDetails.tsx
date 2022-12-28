import { FormLabel, Stack, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { IDENTIFIERS } from '../constants';
import { StorageKeys } from '../models';

const SelectPackageManager = () => {
    const [frontendProjectNameValue, setFrontendProjectNameValue] =
        useLocalStorage(StorageKeys.frontendProjectName, '');

    const updateFrontendProjectName = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFrontendProjectNameValue(event.target.value);
    };

    return (
        <>
            <FormLabel id={IDENTIFIERS.FRONTEND}>Frontend</FormLabel>
            <TextField
                id={IDENTIFIERS.FRONTEND}
                label="Frontend project name"
                variant="outlined"
                required
                onChange={updateFrontendProjectName}
                value={frontendProjectNameValue}
            />
        </>
    );
};

export default SelectPackageManager;
