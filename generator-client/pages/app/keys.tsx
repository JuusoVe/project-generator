import type { ReactElement } from 'react';
import GenerationLayout from '../../components/layouts/generator';
import type { NextPageWithLayout } from '../_app';

const KeysPage: NextPageWithLayout = () => {
    return <p>insert keys here</p>;
};

KeysPage.getLayout = function getLayout(page: ReactElement) {
    return <GenerationLayout>{page}</GenerationLayout>;
};

export default KeysPage;
