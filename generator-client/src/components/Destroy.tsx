import { Button } from '@mui/material';
import { useLocalStorage, useSessionStorage } from 'usehooks-ts';
import { useGithubAPI } from '../apis/github';
import { StorageKeys } from '../models';

const DestroyButton = () => {
    const [apiKey, _setValue] = useSessionStorage(StorageKeys.repoAPIKey, '');
    const [repoNameValue, _setRepoNameValue] = useLocalStorage(
        StorageKeys.repoName,
        ''
    );
    const [repoOwnerValue, _setRepoOwnerValue] = useLocalStorage(
        StorageKeys.repoOwner,
        ''
    );
    const githubAPI = useGithubAPI(apiKey);
    const destroy = async () => {
        console.log('destroying');
        try {
            const res = await githubAPI.deleteUserRepo(
                repoOwnerValue,
                repoNameValue
            );
        } catch (err) {
            console.log(err);
        }
    };

    return <Button onClick={destroy}>destroy</Button>;
};

export default DestroyButton;
