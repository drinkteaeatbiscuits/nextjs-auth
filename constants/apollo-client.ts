import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, useReactiveVar } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import authenticatedVar from "./authenticated";

import { API_URL } from "./urls";
import Cookies from 'js-cookie';



const httpLink = new HttpLink({
    uri: `${API_URL}/graphql`,
    credentials: "include",
  });


// const authTokenVar = useReactiveVar(authenticatedVar);

const logoutLink = onError(({ graphQLErrors }) => {

  console.log(graphQLErrors);
  
  if (
    graphQLErrors?.length
  ) {
    authenticatedVar(false);
  }

});

const authMiddleware = new ApolloLink((operation, forward) => {
  
  const token = Cookies.get('customerToken');

  operation.setContext({
      headers: {
          authorization: token ? `Bearer ${token}` : ''
      }
  });

  return forward(operation);
});


const client =  new ApolloClient({
      cache: new InMemoryCache(),
      link: logoutLink.concat(authMiddleware.concat(httpLink)),
  });


export default client;
