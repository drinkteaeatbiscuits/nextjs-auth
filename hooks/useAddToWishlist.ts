import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";


const ADD_TO_LIST = gql`
mutation AddProductsToWishlist($wishlistId: ID!, $wishlistItems: [WishlistItemInput!]!) {
  addProductsToWishlist(wishlistId: $wishlistId, wishlistItems: $wishlistItems) {
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

export const useAddToWishlist = () => {

  const [addToWishList, { data, loading, error }] = useMutation( 
    ADD_TO_LIST, { 
      errorPolicy: "ignore",
      onCompleted(data, res) {

        console.log(data);

        client.refetchQueries({ include: "active" });
        
      }
    });

  return {addToWishList};
};

