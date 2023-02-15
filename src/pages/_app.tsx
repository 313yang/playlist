import React from "react";
import Navbar from "@/components/layout/Navbar";
import GlobalStyle from "@/styles/GlobalStyle";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { QueryClient, Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Head>
            <title>Soundy</title>
            <meta name="image" content="/favicon.ico" />
            <meta name="description" content="Make music playlist to your mood" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <Navbar />
          <Sidebar />
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
