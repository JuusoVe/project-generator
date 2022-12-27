import { Stack } from '@mui/system';
import WorkflowStepper from '../GeneratorStepper';
import BasicLayout from './basic';

export default function GeneratorLayout({
    children,
}: React.PropsWithChildren<{}>) {
    return (
        <>
            <BasicLayout>
                <WorkflowStepper />
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {children}
                </Stack>
            </BasicLayout>
        </>
    );
}
