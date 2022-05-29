import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/api/graphqle",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;