import { FormControl, Typography } from '@mui/material';
import InputFrontendDetails from './InputFrontendDetails';
import InputRepoDetails from './InputRepoDetails';
import SelectFrontend from './SelectFrontend';
import SelectPackageManager from './SelectPackageManager';

const PreferencesPage = () => {
    return (
        <>
            <Typography variant="h2">Pick your flavors</Typography>
            <FormControl>
                <SelectPackageManager />
                <InputRepoDetails />
                <SelectFrontend />
                <InputFrontendDetails />
            </FormControl>
        </>
    );
};

export default PreferencesPage;
