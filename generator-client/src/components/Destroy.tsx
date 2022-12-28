import { Button } from '@mui/material';

const DestroyButton = () => {
    const destroy = () => {
        console.log('destroying');
    };

    return <Button onClick={destroy}>destroy</Button>;
};

export default DestroyButton;
