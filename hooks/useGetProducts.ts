import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
	query Products(
		$currentPage: Int, 
		$pageSize: Int, 
		$filter: ProductAttributeFilterInput,
		$sort: ProductAttributeSortInput ) {
		products(
			currentPage: $currentPage, 
			pageSize: $pageSize,
			filter: $filter,
			sort: $sort ) {
				items {
					uid
					name
					sku
					url_key
					only_x_left_in_stock
					stock_status
					thumbnail {
						disabled
						label
						position
						url
					  }
					
					options_container
				
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
					... on VirtualProduct {
						stock_status
						price_range {
						  maximum_price {
							discount {
							  amount_off
							  percent_off
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
					... on SimpleProduct {
						stock_status
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
										value
										currency
									}
									label
								}
								regular_price {
							  		currency
							  		value
								}	
							
						  	}
						  	minimum_price {
								final_price {
							  		currency
							  		value
								}
								regular_price {
							  		currency
							  		value
								}
						  	}	
						  
						}
					}
					... on VirtualProduct {
						stock_status
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
										value
										currency
									}
									label
								}
								regular_price {
							  		currency
							  		value
								}	
							
						  	}
						  	minimum_price {
								final_price {
							  		currency
							  		value
								}
								regular_price {
							  		currency
							  		value
								}
						  	}	
						  
						}
					}
					
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
				  }
				  page_info {
					current_page
					page_size
					total_pages
					__typename
				  }
				  __typename
				  total_count
				  sort_fields {
					default
					options {
					  label
					  value
					}
				},		  
			
			
			}
  	}
`;

const useGetProducts = ( props: any ) => {
	
	const { currentPage, pageSize, category_id, sort } = props;

  return useQuery( GET_PRODUCTS, 
	{ 
		errorPolicy: "ignore", 
		variables: {
			"currentPage": currentPage ? currentPage : 1,
			"pageSize": pageSize ? pageSize : 9,
			"filter": {
				"category_uid": {
					"eq": null,
					"in": category_id ? category_id : null
				}
			},
			"sort": sort,
		}, 
		
	} );

};

export default useGetProducts;
