'use client';

import { FormControl } from '@mui/material';
import RepoIdentifiers from './RepoIdentifiers';
import SelectPackageManager from './SelectPackageManager';

const PreferencesPage = () => {
    return (
        <FormControl>
            <SelectPackageManager />
            <RepoIdentifiers />
        </FormControl>
    );
};

export default PreferencesPage;
