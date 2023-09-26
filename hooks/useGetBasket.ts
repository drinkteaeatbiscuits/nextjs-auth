import { gql, useQuery } from "@apollo/client";
import cartId from "../constants/cartId";

const GET_BASKET = gql`
query Basket {
	customerCart {
	  id
	  items {
		id
		product {
		  name
		  sku
		  __typename
		}
		quantity
		__typename
	  }
	  __typename
	  prices {
		grand_total {
		  currency
		  value
		}
		subtotal_excluding_tax {
		  value
		  currency
		}
		discounts {
		  amount {
			currency
			value
		  }
		  label
		}
	  }
	  total_quantity
	}
  }
`;

const useGetBasket = () => {
	
  
//   return useQuery( GET_BASKET, { errorPolicy: "ignore" } );

	const getBasket = useQuery( 
		GET_BASKET, { 
		errorPolicy: "ignore"
		});

	// console.log(getBasket?.data?.customerCart?.id);
	getBasket?.data?.customerCart?.id && cartId(getBasket.data.customerCart.id);

	return getBasket;

};

export default useGetBasket;
