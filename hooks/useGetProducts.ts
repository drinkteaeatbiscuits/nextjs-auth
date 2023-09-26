import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
	query Products(
		$currentPage: Int, 
		$pageSize: Int, 
		$filter: ProductAttributeFilterInput,
		$sort: ProductAttributeSortInput) {
		products(
			currentPage: $currentPage, 
			pageSize: $pageSize,
			filter: $filter,
			sort: $sort ) {
				items {
					id
					name
					url_key
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
							image {
							  disabled
							  label
							  position
							  url
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
				"category_id": {
					"eq": null,
					"in": category_id ? category_id : null
				}
			},
			"sort": sort,
		}, 
		
	} );

};

export default useGetProducts;
