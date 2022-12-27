import WorkflowStepper from '../WorkflowStepper'
import BasicLayout from './basic'

export default function Layout({ children }) {
  return (
    <>
        <BasicLayout>
            <WorkflowStepper />

            <main>{children}</main>
</BasicLayout>
    </>
  )
}