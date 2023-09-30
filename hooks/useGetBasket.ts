import { gql, useQuery } from "@apollo/client";
import cartId from "../constants/cartId";

const GET_BASKET = gql`
query Basket {
	customerCart {
	  id
	  items {
		
		uid
		prices {
			price {
			  currency
			  value
			}
		  }
		
		... on ConfigurableCartItem {
			product {
				image {
				  url
				  label
				}
				
			  }
			configurable_options {
				option_label
				configurable_product_option_value_uid
				value_label
			  }
			configured_variant {
				image {
					label
					url
				  }
			  ... on ConfigurableProduct {
				variants {
				  attributes {
					label
				  }
				}
			  }
			}
		  }
		  ... on SimpleCartItem {
			customizable_options {
			  label
			}
		  }
		  ... on VirtualCartItem {
			customizable_options {
			  label
			}
		  }
		product {
		  name
		  sku
		  url_key
		  image {
			url
		  }
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
	/* getBasket?.data?.customerCart?.id && cartId(getBasket.data.customerCart.id); */

	return getBasket;

};

export default useGetBasket;
