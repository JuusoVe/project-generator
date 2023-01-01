import { FormControl, Typography } from '@mui/material';
import InputFrontendDetails from './InputFrontendDetails';
import InputRepoDetails from './InputRepoDetails';
import SelectPackageManager from './SelectPackageManager';

const PagePreferences = () => {
    return (
        <>
            <FormControl>
                <SelectPackageManager />
                <InputRepoDetails />
                <InputFrontendDetails />
            </FormControl>
        </>
    );
};

export default PagePreferences;
