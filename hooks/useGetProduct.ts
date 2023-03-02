import { gql, useQuery } from "@apollo/client";

const GET_PRODUCT = gql`
	query Products(
		$filter: ProductAttributeFilterInput) {
		products(
			filter: $filter) {
			items {
				id
				name
				url_key
				categories {
					name
					url_key
        			id
				}
				description {
				  html
				}
				image {
				  disabled
				  label
				  position
				  url
				}
				short_description {
				  html
				}
				sku
				stock_status
				thumbnail {
				  disabled
				  label
				  position
				  url
				}
				price_range {
				  maximum_price {
					discount {
					  amount_off
					  percent_off
					}
					final_price {
					  currency
					  value
					}
					fixed_product_taxes {
					  amount {
						currency
						value
					  }
					  label
					}
					regular_price {
					  currency
					  value
					}
				  }
				  minimum_price {
					discount {
					  amount_off
					  percent_off
					}
					final_price {
					  currency
					  value
					}
					fixed_product_taxes {
					  amount {
						currency
						value
					  }
					  label
					}
					regular_price {
					  currency
					  value
					}
				  }
				}
				manufacturer
				attribute_set_id
			}
		}
  	}
`;

const useGetProduct = ( props: any ) => {
	
	const { url_key } = props;

	// console.log(category_id);

  return useQuery( GET_PRODUCT, 
	{ 
		errorPolicy: "ignore", 
		variables: url_key ? {
			"filter": {
			"url_key": {
				"eq": url_key[0]
				}
			}
		} : {}, 
		
	} );

};

export default useGetProduct;
