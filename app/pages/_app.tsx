import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from 'next/head'
import Script from 'next/script'
import * as gtag from '../lib/gtag'
import SEOSection from './_seo_section';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouterChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouterChange);
    };
  }, [router.events]);

  return (
    <div className="app">
      <Head>
        <title>時間変換計算（HH:MM↔10進数）</title>
        <meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
      </Head>
      <SEOSection />
      <Script
         strategy="afterInteractive"
         src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
       />
       { process.env.NEXT_PUBLIC_GADS_CLIENT && <Script
         data-ad-client={process.env.NEXT_PUBLIC_GADS_CLIENT}
         async
         src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`}
       />}
       <Script
         id="gtag-init"
         strategy="afterInteractive"
         dangerouslySetInnerHTML={{
           __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', '${gtag.GA_MEASUREMENT_ID}');
           `,
         }}
       />
      <Component {...pageProps} />
    </div>
  )
}
