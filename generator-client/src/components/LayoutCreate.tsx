import { Stack } from '@mui/system';
import { Outlet } from 'react-router-dom';
import WorkflowStepper from './StepperWorkflow';
import Destroy from './DeleteResources';
import { Container } from '@mui/material';

export default function LayoutCreate() {
    return (
        <Container>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={12}
            >
                <WorkflowStepper />

                <Outlet />
                <Destroy />
            </Stack>
        </Container>
    );
}
