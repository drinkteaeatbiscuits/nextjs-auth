import { gql, useQuery } from "@apollo/client";
  
  const GET_SHIPPING_METHODS = gql`
  query Available_shipping_methods($cartId: String!) {
    cart(cart_id: $cartId) {
      shipping_addresses {
        available_shipping_methods {
          amount {
            currency
            value
          }
          available
          carrier_code
          carrier_title
          error_message
          method_code
          method_title
          price_excl_tax {
            currency
            value
          }
          price_incl_tax {
            currency
            value
          }
        }
        selected_shipping_method {
          carrier_code
          method_code
        }
        
      }
    }
  }
  `;
  
  const useGetShippingMethods = ( cartId:any ) => {
      
    
  //   return useQuery( GET_BASKET, { errorPolicy: "ignore" } );
  
      const getShippingMethods = useQuery( 
        GET_SHIPPING_METHODS, { 
          errorPolicy: "ignore",
          variables: {
            cartId: cartId
          }
        });
  
      // console.log(getBasket?.data?.customerCart?.id);
      /* getBasket?.data?.customerCart?.id && cartId(getBasket.data.customerCart.id); */
  
      return getShippingMethods;
  
  };
  
  export default useGetShippingMethods;
  