import { gql, useLazyQuery, useQuery } from "@apollo/client";
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
		subtotal_with_discount_excluding_tax {
		  currency
		  value
		}
		subtotal_including_tax {
		  currency
		  value
		}
		subtotal_excluding_tax {
		  currency
		  value
		}
		grand_total {
		  currency
		  value
		}
		discounts {
		  amount {
			value
			currency
		  }
		  label
		}
		applied_taxes {
		  amount {
			currency
			value
		  }
		  label
		}
	  }
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

		selected_shipping_method {
		  amount {
			currency
			value
		  }
		  price_excl_tax {
			currency
			value
		  }
		  price_incl_tax {
			currency
			value
		  }
		  method_title
		  method_code
		  carrier_title
		  carrier_code
		}
		city
      	company
		country {
			code
			label
		}
		customer_notes
		firstname
		lastname
		postcode
		street
		telephone
		uid
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
	  }
	  
	  total_quantity
	  available_payment_methods {
		code
		is_deferred
		title
	  }
	  selected_payment_method {
		code
		purchase_order_number
		title
	  }
	}
  }
`;

const useGetBasket = () => {
	
  
//   return useQuery( GET_BASKET, { errorPolicy: "ignore" } );

	const getBasket = useLazyQuery( 
		GET_BASKET, { 
		errorPolicy: "ignore"
		});

	// console.log(getBasket?.data?.customerCart?.id);
	/* getBasket?.data?.customerCart?.id && cartId(getBasket.data.customerCart.id); */

	return getBasket;

};

export default useGetBasket;
