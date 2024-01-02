import { useState } from 'react'
import Head from 'next/head'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider as JotaiProvider } from 'jotai'
import { DevTools as JotaiDevTools } from 'jotai-devtools'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { CookiesProvider } from 'react-cookie'

import '@/styles/globals.css'
import { AuthRedirect } from '@/components/common/AuthRedirect'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 mins
          cacheTime: Infinity,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
        },
      },
    })
  )
  return (
    <SessionProvider session={session}>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <JotaiProvider>
              <AuthRedirect />
              {/* <JotaiDevTools /> */}
              <Head>
                <title>쿠팡이츠</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta
                  name="description"
                  content="패스트캠퍼스 쿠팡이츠 클론코딩 프로젝트"
                />
              </Head>
              <Component {...pageProps} />
            </JotaiProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CookiesProvider>
    </SessionProvider>
  )
}
