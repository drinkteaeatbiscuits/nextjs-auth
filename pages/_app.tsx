import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../constants/apollo-client";
import Guard from "../components/Guard";
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }: AppProps) {
  
  
  return (
      <ApolloProvider client={client}>
        <Guard excludedRoutes={["/login", "/signup"]}>
          <><Component {...pageProps} /><Analytics /></>
        </Guard>
      </ApolloProvider>
  );
}

export default MyApp;
