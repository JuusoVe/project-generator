import type { ReactElement } from 'react'
import BasicLayout from '../../components/layouts/basic'
import GenerationLayout from '../../components/layouts/generation'
import type { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
      <GenerationLayout>{page}</GenerationLayout>
  )
}

export default Page