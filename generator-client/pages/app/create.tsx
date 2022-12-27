import type { ReactElement } from 'react';
import GenerationLayout from '../../components/layouts/generator';
import type { NextPageWithLayout } from '../_app';

const CreatePage: NextPageWithLayout = () => {
    return <p>select pref here</p>;
};

CreatePage.getLayout = function getLayout(page: ReactElement) {
    return <GenerationLayout>{page}</GenerationLayout>;
};

export default CreatePage;
