import { Divider, FormControl } from '@mui/material';
import type { ReactElement } from 'react';
import GenerationLayout from '../../components/layouts/generator';
import RepoIdentifiers from '../../components/RepoIdentifiers';
import SelectPackageManager from '../../components/SelectPackageManager';
import type { NextPageWithLayout } from '../_app';

const PreferencesPage: NextPageWithLayout = () => {
    return (
        <FormControl>
            <SelectPackageManager />
            <RepoIdentifiers />
        </FormControl>
    );
};

PreferencesPage.getLayout = function getLayout(page: ReactElement) {
    return <GenerationLayout>{page}</GenerationLayout>;
};

export default PreferencesPage;
