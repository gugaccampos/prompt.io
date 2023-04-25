import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { Analytics } from '@vercel/analytics/react'

import GlobalStyles from 'styles/global'
import { theme } from 'styles/theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>prompt!</title>
          <link rel="shortcut icon" href="/img/logop.png" />
          <link rel="apple-touch-icon" href="/img/logop.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#06092B" />
          <meta name="description" content="Adivinhe o prompt" />
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </>
  )
}

export default App
