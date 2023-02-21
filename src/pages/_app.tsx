import React from "react";
import Navbar from "@/components/layout/Navbar";
import GlobalStyle from "@/styles/GlobalStyle";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { QueryClient, Hydrate, QueryClientProvider, QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SEO from "@/components/layout/SEO";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { usePlaylist } from "@/util/store/usePlaylistStore";
export default function App({ Component, pageProps }: AppProps) {
  const { query } = useRouter();
  const playlist = usePlaylist();

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
          },
        },
        queryCache: new QueryCache({
          onError: (error: any) => toast.error(`Error: ${error?.message}`),
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <SEO
            title={
              !!query.keyword
                ? `Searching - ${query.keyword}`
                : `Soundy ${!!query.id ? `- ${playlist?.title}` : ""}`
            }
          />
          <Header />
          <Navbar />
          <Sidebar />
          <Toaster position="top-center" reverseOrder={false} />
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
