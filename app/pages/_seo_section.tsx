import { DefaultSeo } from "next-seo";

export default function SEOSection() {
  return (
    <>
      <DefaultSeo
        defaultTitle="時間変換計算（HH:MM↔10進数）"
        description=""
        openGraph={{
          type: 'website',
          title: '時間変換計算（HH:MM↔10進数）',
          description: 'HH:MM形式の時間と10進数形式の時間を相互に変換できます。かんたんな計算にも対応しています。',
          site_name: '時間変換計算（HH:MM↔10進数）',
          url: 'https://time-dn-calc.a5shosa.com/',
          images: [
            {
              url: 'https://time-dn-calc.a5shosa.com/opengraph_image.png',
              width: 800,
              height: 600,
              alt: '時間変換計算（HH:MM↔10進数）',
              type: 'image/png'
            }
          ]
        }}
      />
    </>
  )
}