import { gql, useQuery } from "@apollo/client";
  
  const GET_ADDRESSES = gql`
  query Addresses {
    customer {
      addresses {
        default_shipping
        default_billing
        city
        company
        country_code
        fax
        firstname
        id
        lastname
        middlename
        postcode
        prefix
        region {
          region
          region_code
          region_id
        }
        region_id
        street
        suffix
        telephone
        vat_id
      }
      default_shipping
      default_billing
    }
  }
  `;
  
  const useGetAddresses = () => {
      
    
  //   return useQuery( GET_BASKET, { errorPolicy: "ignore" } );
  
      const getAddresses = useQuery( 
        GET_ADDRESSES, { 
          errorPolicy: "ignore"
        });
  
      // console.log(getBasket?.data?.customerCart?.id);
      /* getBasket?.data?.customerCart?.id && cartId(getBasket.data.customerCart.id); */
  
      return getAddresses;
  
  };
  
  export default useGetAddresses;
  