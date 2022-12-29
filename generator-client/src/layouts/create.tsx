import { Stack } from '@mui/system';
import { Outlet } from 'react-router-dom';
import WorkflowStepper from '../components/WorkflowStepper';
import Destroy from '../components/DeleteResources';
import { Container } from '@mui/material';

export default function CreateLayout() {
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
