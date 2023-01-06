import { gql, useQuery } from "@apollo/client";

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
  
  return useQuery( GET_BASKET, { errorPolicy: "ignore" } );

};

export default useGetBasket;
