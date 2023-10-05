import { gql, useQuery } from "@apollo/client";

const GET_CATEGORIES = gql`
query Categories($filters: CategoryFilterInput) {
          
	categoryList(filters: $filters) {
	  id
	  name
	  display_mode
	  breadcrumbs {
		category_id
		category_level
		category_name
		category_url_key
		category_url_path
		__typename
	  }
	  children {
		id
		name
		url_key
		children {
		  id
		  name
		  path
		  image
		  level
		  product_count
		  url_key
		  __typename
		}
		__typename
	  }
	  __typename
	}
  
}
`;

const GET_CATEGORIES_2 = gql`
query Categories(
	$filters: CategoryFilterInput, 
	$pageSize: Int, 
	$currentPage: Int) {
	categories(
	  filters: $filters, 
	  pageSize: $pageSize, 
	  currentPage: $currentPage) {
	  	items {
			name
	  		display_mode
			image
			uid
			breadcrumbs {
				category_url_path
				category_url_key
				category_uid
				category_name
				category_level
			}
			children {
				uid
				name
				display_mode
				url_key
				image
				children {
					level
					name
					path
					uid
					product_count
					image
					url_key
				}
			}
	  	}
	}
} 
`;

const useGetCategories = ( url: any ) => {
  
  return useQuery( GET_CATEGORIES_2, 
	{ 
		errorPolicy: "ignore", 
		variables: url ? {
			"filters": {
				"url_key": {
					"eq": url[0]
				}
			}
		} : { 
			
			
		}, 
		
	} );

};

export default useGetCategories;
