import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  from
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all"
  }
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: `https://${process.env.WP_API_DOMAIN}/graphql`
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
  defaultOptions
});
