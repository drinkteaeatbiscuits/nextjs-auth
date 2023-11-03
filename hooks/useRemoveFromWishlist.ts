import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";


const REMOVE_FROM_LIST = gql`
mutation RemoveProductsFromWishlist($wishlistId: ID!, $wishlistItemsIds: [ID!]!) {
  removeProductsFromWishlist(wishlistId: $wishlistId, wishlistItemsIds: $wishlistItemsIds) {
    user_errors {
      code
      message
    }
    wishlist {
      id
      items_count
    }
  }
}
`;

export const useRemoveFromWishlist = () => {

  const [removeFromWishList, { data, loading, error }] = useMutation( 
    REMOVE_FROM_LIST, { 
      errorPolicy: "ignore",
      onCompleted(data, res) {

        console.log(data);

        client.refetchQueries({ include: "active" });
        
      }
    });

  return {removeFromWishList};
};

