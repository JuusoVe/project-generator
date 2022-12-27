'use client';

import { Stack } from '@mui/system';
import WorkflowStepper from './CreateSteps';

export default function GeneratorLayout({
    children,
}: React.PropsWithChildren<{}>) {
    return (
        <>
            <WorkflowStepper />
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {children}
            </Stack>
        </>
    );
}
