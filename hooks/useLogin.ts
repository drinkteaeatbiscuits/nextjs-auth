import { gql, useMutation, useQuery } from "@apollo/client";
import client from "../constants/apollo-client";
import authenticatedVar from "../constants/authenticated";
import Cookies from 'js-cookie';

const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  generateCustomerToken(
    email: $email
    password: $password
  ) {
    token
  }
}
`;


export const useLogin = () => {

  const [login, { data, loading, error }] = useMutation( 
    LOGIN, { 
      errorPolicy: "ignore",
      onCompleted(data, res) {

        Cookies.set('customerToken', data.generateCustomerToken?.token, { secure: true });
        // document.cookie = `customerToken=${data.generateCustomerToken?.token}; path=/; secure=true http-only=true`;
        // authenticatedVar(true);

        client.refetchQueries({ include: "active" });
        
      }
    });

  return { login };
};
