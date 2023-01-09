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
		}
	  }
	}
  
}
`;

const useGetCategories = ( url: any ) => {
  
  return useQuery( GET_CATEGORIES, 
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
