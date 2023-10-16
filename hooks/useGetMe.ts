import { gql, useLazyQuery, useQuery } from "@apollo/client";

const GET_ME = gql`
  query Me {
    customer{
      email
    }
  }
`;

const useGetMe = () => {
  
  return useLazyQuery( GET_ME, {errorPolicy: "all"} );

};

export default useGetMe;
