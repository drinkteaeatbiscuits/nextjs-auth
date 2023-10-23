import { gql, useQuery } from "@apollo/client";

const GET_PRODUCT = gql`
	query Products(
		$filter: ProductAttributeFilterInput) {
		products(
			filter: $filter) {
			items {
				uid
				id
				name
				url_key
				options_container
				only_x_left_in_stock
				media_gallery {
					url
					disabled
					label
					position
				}
				
      			... on ConfigurableProduct {
					canonical_url
					configurable_options {
						attribute_code
						label
						values {
							default_label
							label
							store_label
							
							use_default_value
						}
						uid
						use_default
					}
					options {
						title
					}
					variants {
						attributes {
						code
						label
						uid
						}
						product {
							name
							sku
							uid
							only_x_left_in_stock
							stock_status
							image {
								disabled
								label
								position
								url
							}
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
						}
					}
        			
				}
				categories {
					breadcrumbs {
						category_level
						category_name
						category_uid
						category_url_key
						category_url_path
					}
					name
					url_key
        			id
					position
					display_mode
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
				only_x_left_in_stock
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

const useGetProduct = (props: any) => {

	const { url_key } = props;

	// console.log(category_id);

	return useQuery(GET_PRODUCT,
		{
			errorPolicy: "ignore",
			variables: url_key ? {
				"filter": {
					"url_key": {
						"eq": url_key[0]
					}
				}
			} : {},

		});

};

export default useGetProduct;
