import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
	query Products(
		$currentPage: Int, 
		$pageSize: Int, 
		$filter: ProductAttributeFilterInput) {
		products(
			currentPage: $currentPage, 
			pageSize: $pageSize, 
			filter: $filter) {
				items {
					id
					name
					url_key
					__typename
					attribute_set_id
					image {
					  disabled
					  label
					  position
					  url
					}
					only_x_left_in_stock
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
					price_tiers {
					  discount {
						amount_off
						percent_off
					  }
					  final_price {
						currency
						value
					  }
					  quantity
					}
					sku
					small_image {
					  disabled
					  label
					  position
					  url
					}
					stock_status
					thumbnail {
					  disabled
					  label
					  position
					  url
					}
					swatch_image
					... on ConfigurableProduct {
					  configurable_options {
						attribute_code
						attribute_id
						id
						label
						position
						product_id
						use_default
						values {
						  default_label
						  label
						  store_label
						  swatch_data {
							value
							... on ImageSwatchData {
							  thumbnail
							  value
							}
							... on TextSwatchData {
							  value
							}
							... on ColorSwatchData {
							  value
							}
						  }
						  use_default_value
						  value_index
						}
					  }
					}
				  }
				  page_info {
					current_page
					page_size
					total_pages
					__typename
				  }
				  __typename
				  total_count
		}
  	}
`;

const useGetProducts = ( props: any ) => {
	
	const {currentPage, pageSize, category_id} = props;

	// console.log(category_id);

  return useQuery( GET_PRODUCTS, 
	{ 
		errorPolicy: "ignore", 
		variables: {
			"currentPage": currentPage ? currentPage : 1,
			"pageSize": pageSize ? pageSize : 9,
			"filter": {
			"category_id": {
				"eq": null,
				"in": category_id ? category_id : null
				}
			}
		}, 
		
	} );

};

export default useGetProducts;
