import type { ReactElement } from 'react';
import GenerationLayout from '../../components/layouts/generator';
import type { NextPageWithLayout } from '../_app';

const SelectWorkflowPage: NextPageWithLayout = () => {
    return <p>No options exist yet</p>;
};

SelectWorkflowPage.getLayout = function getLayout(page: ReactElement) {
    return <GenerationLayout>{page}</GenerationLayout>;
};

export default SelectWorkflowPage;
