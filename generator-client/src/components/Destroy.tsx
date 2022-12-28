import { Button } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';
import { useGithubAPI } from '../apis/github';
import { LocalStorageKeys } from '../models';

const DestroyButton = () => {
    const [apiKey, _setValue] = useLocalStorage(
        LocalStorageKeys.repoAPIKey,
        ''
    );
    // const githubAPI = useGithubAPI(apiKey);
    const destroy = () => {
        console.log('destroying');
    };

    return <Button onClick={destroy}>destroy</Button>;
};

export default DestroyButton;
