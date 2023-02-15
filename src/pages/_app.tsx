import React from "react";
import Navbar from "@/components/layout/Navbar";
import GlobalStyle from "@/styles/GlobalStyle";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { QueryClient, Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SEO from "@/components/layout/SEO";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { query, pathname } = useRouter();

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
          <SEO
            title={
              !!query.title || !!query.keyword
                ? query.title || `Searching - ${query.keyword}`
                : `Soundy ${pathname !== "/" ? `- ${pathname.slice(1)}` : ""}`
            }
          />
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
