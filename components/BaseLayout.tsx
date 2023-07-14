import { FC, ReactNode } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import Head from "next/head";
import { roboto, montserrat } from "@/fonts";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/apollo/init";

type Props = {
  children: ReactNode;
};

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Head>
          <title>WIN.gg - Your competitive edge in gaming and esports</title>
        </Head>
        <div
          className={`bg-win-black text-white ${montserrat.variable} ${roboto.variable} font-body`}
        >
          {children}
        </div>
      </ApolloProvider>
    </ErrorBoundary>
  );
};

export default BaseLayout;
