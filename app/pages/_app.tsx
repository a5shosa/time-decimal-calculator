import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Head>
        <title>時間変換計算（HH:MM↔10進数）</title>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}
