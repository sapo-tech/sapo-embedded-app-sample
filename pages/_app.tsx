import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ComponentType, Fragment, ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode,
  layout?: ComponentType
}

type Props = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? (page => page)
  const Layout = Component.layout ?? Fragment

  return (
    <Layout>
      {getLayout(<Component {...pageProps} />)}
    </Layout>
  )
}
export default MyApp
