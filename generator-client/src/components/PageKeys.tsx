import { FormControl, Typography } from '@mui/material';
import InputKeys from './InputKeys';

const PageKeys = () => {
    return (
        <>
            <Typography variant="h2">API keys</Typography>
            <FormControl>
                <InputKeys></InputKeys>
            </FormControl>
        </>
    );
};

export default PageKeys;
