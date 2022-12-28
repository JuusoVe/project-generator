import { Stack } from '@mui/system';
import { Outlet } from 'react-router-dom';
import WorkflowStepper from '../components/CreateSteps';
import Destroy from '../components/Destroy';

export default function CreateLayout() {
    return (
        <div>
            <WorkflowStepper />
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Outlet />
                <Destroy />
            </Stack>
        </div>
    );
}
