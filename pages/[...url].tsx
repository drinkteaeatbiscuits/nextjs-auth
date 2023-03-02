import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Categories from '../components/Categories';
import Header from '../components/Header/Header'
import Product from '../components/Product/Product';
import Products from '../components/Products/Products';
import useGetCategories from '../hooks/useGetCategories';
import useGetProduct from '../hooks/useGetProduct';
import useGetProducts from '../hooks/useGetProducts';
import styles from "../styles/Home.module.css";


const CategoryPage = (props: any) => {

	const router = useRouter()
	const { url } = router.query;

	const [ pageNumber, setPageNumber ] = useState(1);

	const { data: categories } = useGetCategories( url );
	// const { data: products, refetch: refetchProducts } = useGetProducts( { pageNumber: pageNumber, pageSize: 9, category_id: null } );
	const { data: product, refetch: refetchProduct } = useGetProduct( { url_key: url } );
	const { data: products, fetchMore: fetchMoreProducts, refetch: refetchProducts } = useGetProducts( { pageNumber: pageNumber, pageSize: 9, category_id: null } );

	const [loadedProducts, setLoadedProducts] = useState<any>(null);
	const [categoriesArray, setCategoriesArray] = useState<any>(null);

	// console.log(categories?.categoryList);
	// console.log(url);

	const updateCategoryArray = () => {
		const categoryArray: any[] = []
			
			categories?.categoryList.map((category:any) => {
				categoryArray.push( category.id.toString() )
			})
		
		setCategoriesArray(categoryArray);

	}


	useEffect(() => {
		
		categories && updateCategoryArray();

	}, [categories]);


	useEffect(() => {
		
		categoriesArray && refetchProducts({
			filter: {
				category_id: {
					eq: null,
					in: categoriesArray,
				},
			},
		});

	}, [categoriesArray]);

	useEffect(() => {

		products && setLoadedProducts( products.products );

	}, [products]);

	useEffect(() => {

		setLoadedProducts( null );

	}, [url]);

	

	const getMoreProducts = async () => {

		if( categoriesArray ) {

			const { data } = await fetchMoreProducts({
					variables: { 
						"currentPage": pageNumber + 1,
						"pageSize": 9,
						"filter": {
						"category_id": {
								"eq": null,
								"in": categoriesArray
								}
						
							} 
						}
					});
			const { info, results } = data.products;

			setLoadedProducts(() => { 
				// console.log(prevProducts);
				return {	
						__typename: 'Products',
						items: [...loadedProducts.items, ...data.products.items],
						page_info: data.products.page_info
						}
						 
					}
				);
			setPageNumber(pageNumber + 1);

		}


		
	  };

	// console.log(pageNumber);
	// console.log(categories);
	// {categories?.categoryList[0]?.display_mode === null && console.log( 'test null')}
	// {categories?.categoryList[0]?.display_mode === 'PRODUCTS' && console.log( 'test products')}
  
	return <div className={styles.container}>
		<Header />
		<main style={{paddingTop: '70px'}}>

			<Breadcrumbs breadcrumbs={categories?.categoryList[0]?.breadcrumbs || product?.products?.items[0]?.categories} category={categories?.categoryList[0]?.name || product?.products?.items[0]?.name} />
			
			<h1>{categories?.categoryList[0]?.name}</h1>


			{ categories?.categoryList[0]?.display_mode === 'PAGE' && <Categories categories={ categories } /> }
			
			{ categories?.categoryList[0]?.display_mode === null && <Products products={ loadedProducts } pageNumber={pageNumber} setPageNumber={ getMoreProducts } /> }
			
			{ categories?.categoryList[0]?.display_mode === 'PRODUCTS' && <Products products={ loadedProducts } pageNumber={pageNumber} setPageNumber={ getMoreProducts } /> }
	  		

			{ product?.products?.items && product?.products?.items?.length > 0 && <Product product={ product } /> }
			
		</main>
	
	</div>
  }
  
  export default CategoryPage