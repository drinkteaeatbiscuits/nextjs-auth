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
			}
			page_info {
				current_page
				page_size
				total_pages
			}
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
