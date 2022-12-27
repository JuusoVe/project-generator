import WorkflowStepper from '../WorkflowStepper';
import BasicLayout from './basic';

export default function GenerationLayout({
    children,
}: React.PropsWithChildren<{}>) {
    return (
        <>
            <BasicLayout>
                <WorkflowStepper />
                <main>{children}</main>
            </BasicLayout>
        </>
    );
}
