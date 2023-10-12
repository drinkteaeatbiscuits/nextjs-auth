import { gql, useQuery } from "@apollo/client";
  
  const GET_ADDRESS = gql`
  query Shipping_addresses($cartId: String!) {
    cart(cart_id: $cartId) {
      shipping_addresses {
        uid
        postcode
        city
        company
        firstname
        lastname
        region {
          code
          label
          region_id
        }
        street
      }
    }
  }
  `;
  
  const useGetSelectedShippingAddress = ( cartId:any ) => {
      
    
  //   return useQuery( GET_BASKET, { errorPolicy: "ignore" } );
  
      const getSelectedShippingAddress = useQuery( 
        GET_ADDRESS, { 
          errorPolicy: "ignore",
          variables: {
            cartId: cartId
          }
        });
  
      // console.log(getBasket?.data?.customerCart?.id);
      /* getBasket?.data?.customerCart?.id && cartId(getBasket.data.customerCart.id); */
  
      return getSelectedShippingAddress;
  
  };
  
  export default useGetSelectedShippingAddress;
  