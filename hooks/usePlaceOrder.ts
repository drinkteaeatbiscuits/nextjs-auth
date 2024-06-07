import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";


const PLACE_ORDER = gql`
mutation PlaceOrder($input: PlaceOrderInput) {
    placeOrder(input: $input) {
      order {
        order_number
        client_secret
      }
    }
  }`;

export const usePlaceOrder = () => {

  const [placeOrder, { data, loading, error }] = useMutation( 
    PLACE_ORDER, { 
      errorPolicy: "all",
      onCompleted(data, res) {

        console.log(data);
        

        client.refetchQueries({ include: "active" });
        
      }
    });

  return { placeOrder };
};

