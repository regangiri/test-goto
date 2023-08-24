import "@/styles/globals.css";
import type { AppProps } from "next/app";
import apolloClient from "@/apolloClient";
import { ApolloProvider } from "@apollo/client";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import Head from "next/head";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <>
      <Head>
        <title>Phone Book App</title>
        <meta name="description" content="nextTS Phone Book" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={apolloClient}>
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </>
  );
}
