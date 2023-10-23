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
import styles from "../styles/Home.module.scss";
import ProductFilters from '../components/ProductFilters/ProductFilters';
import ChildCategoriesCarousel from '../components/ChildCategoriesCarousel/ChildCategoriesCarousel';
import Notifications from '../components/Notifications/Notifications';


const CategoryPage = (props: any) => {

	const router = useRouter();
	const { url } = router.query;

	const [ pageNumber, setPageNumber ] = useState(1);

	const [getCategories, { data: categories }] = useGetCategories( url );
	// const { data: products, refetch: refetchProducts } = useGetProducts( { pageNumber: pageNumber, pageSize: 9, category_id: null } );
	const { data: product, refetch: refetchProduct } = useGetProduct( { url_key: url } );
	const { data: products, fetchMore: fetchMoreProducts, refetch: refetchProducts } = useGetProducts( { pageNumber: pageNumber, pageSize: 9, category_id: null, sort: { position: 'DESC' } } );

	const [loadedProducts, setLoadedProducts] = useState<any>(null);
	const [categoriesArray, setCategoriesArray] = useState<any>(null);
	const [sortProducts, setSortProducts] = useState<any>({ position: 'DESC' });
	const [activeFilters, setActiveFilters] = useState<any>({});
	const [totalProducts, setTotalProducts] = useState<any>(null);
	const [showFiltersOverlay, setShowFiltersOverlay] = useState(false);

	const [breadcrumbs, setBreadcrumbs] = useState<any>(null);

	// console.log(products?.products?.aggregations);

	const updateCategoryArray = () => {
		const categoryArray: any[] = []
			
			categories?.categories?.items.map((category:any) => {
				categoryArray.push( category.uid.toString() )
			})
		
		setCategoriesArray(categoryArray);

	}

	useEffect(() => {
			
		url && getCategories();

		// console.log(url);

		url?.includes('shop') && setBreadcrumbs([{
			category_level: 2,
			category_name: 'Shop',
			category_uid: 'Mw==',
			category_url_key: 'shop',
			category_url_path: 'shop',
			currentCategory: true
		}]);

	}, [url]);


	useEffect(() => {
		
		categories && updateCategoryArray();

		if(categories && categories?.categories?.items[0]?.breadcrumbs){
			setBreadcrumbs([...categories?.categories?.items[0]?.breadcrumbs, 
				{
					category_level: categories?.categories.items[0]?.level,
					category_name: categories?.categories.items[0]?.name,
					category_uid: categories?.categories.items[0]?.uid,
					category_url_key: categories?.categories.items[0]?.url_key,
					category_url_path: categories?.categories.items[0]?.url_path,
					currentCategory: true
				}]);
		}else if( categories && !breadcrumbs && product ){

			// console.log('set breadcrumbs');
			// console.log(product?.products?.items[0]?.categories?.slice(-1)[0]?.breadcrumbs);
			product?.products?.items[0]?.categories?.slice(-1)[0]?.breadcrumbs && setBreadcrumbs(product?.products?.items[0]?.categories?.slice(-1)[0]?.breadcrumbs);

		}



	}, [categories, product]);

	// console.log(categories);

	useEffect(() => {

		setPageNumber(1);
		
		categoriesArray && refetchProducts({
			filter: {
				category_uid: {
					eq: null,
					in: categoriesArray,
				},
				...activeFilters
			},
			sort: sortProducts,
		});

	}, [categoriesArray]);


	useEffect(() => {

		products && setLoadedProducts( products.products );
		products && setTotalProducts( products.products.total_count ) ;

	}, [ products ]);


	useEffect(() => {

		setPageNumber(1);
		setLoadedProducts( null );
		setTotalProducts( null );
		setShowFiltersOverlay( false );

	}, [ url ]);

	useEffect(() => {

		setPageNumber(1);
		sortProducts && refetchProducts({
			currentPage: 1,
			pageSize: 9,
			filter: {
				category_uid: {
					eq: null,
					in: categoriesArray,
				},
				...activeFilters
			},
			sort: sortProducts,
		});

	}, [ sortProducts ]);



// console.log(categoriesArray);

	useEffect(() => {

		// console.log(activeFilters);

		refetchProducts({
			currentPage: 1,
			pageSize: 9,
			filter: {
				category_uid: {
					eq: null,
					in: categoriesArray,
				},
				...activeFilters
			},
			sort: sortProducts,
		});



		// console.log(combinedFilters)


	}, [activeFilters]);





	const changeSortOption = (name:any, order:any) => {
		
		const newSortObject = {}
		
		Object.assign(newSortObject,{[name]: order});

		setSortProducts( newSortObject );
	}

	// console.log(sortProducts);

	const getMoreProducts = async () => {

		// console.log('get more');
		// console.log(categoriesArray);

		if( categoriesArray ) {

			const nextPageNumber = pageNumber + 1;

			await fetchMoreProducts({
					variables: { 
						currentPage: nextPageNumber,
						pageSize: 9,
						filter: {
							category_uid: {
								eq: null,
								in: categoriesArray
							},
							...activeFilters
						},
						sort: sortProducts,
							
						}
					}).then((data) => {

						// console.log(data);

						data.data?.products && setLoadedProducts((test:any) => { 
			

							const itemsArray = data.data.products.items.reduce(
								(acc:any, item:any) => {
								
								  return acc.filter( (e:any) => e.uid === item?.uid ).length > 0 ? acc : [...acc, item]
								},
								[...test.items]
							  )
							  
							// const itemsArray = [...test.items, ...data.data.products.items];
							

							return {	
									__typename: 'Products',
									items: itemsArray,
									page_info: data.data.products.page_info,
									total_count: data.data.products.total_count,
								}
									 

					});
			
			
					}
				);

			setPageNumber(nextPageNumber);

		}
		
	  };


	//  console.log(product?.products?.items?.length);

  
	return <div className={styles.container}>
		<Header />
		<Notifications />
		<main style={{paddingTop: '70px'}}>

			<ProductFilters categories={categories} showFilters={showFiltersOverlay} setShowFiltersOverlay={setShowFiltersOverlay} filters={products?.products?.aggregations} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

			<Breadcrumbs url={url} breadcrumbs={ breadcrumbs } category={categories?.categories.items[0]?.name || product?.products?.items[0]?.name} isProductPage={product?.products?.items && product?.products?.items?.length > 0} />
			
			{categories?.categories.items[0]?.name && <h1>{categories?.categories.items[0]?.name}</h1>}

			{categories?.categories?.items[0]?.children && <ChildCategoriesCarousel categories={ categories?.categories?.items[0].children } />}

				{ categories?.categories.items[0]?.display_mode !== 'PAGE' && product?.products?.items?.length == 0 && <div className="">
			
				{ totalProducts && <p>{totalProducts} products found</p> }

				<select id='sort-products' className="sort" value={Object.keys(sortProducts)[0]} onChange={ (event) => changeSortOption(event.target.value, sortProducts[Object.keys(sortProducts)[0]]) }>
					<option className="" value={'position'}>Position</option>
					<option className="" value={'name'}>Name</option>
					<option className="" value={'price'}>Price</option>
					<option className="" value={'relevance'}>Relevance</option>
				</select>

				<div className="" onClick={() => { 
					// setSortProductsOrder( sortProductsOrder === 'ASC' ? 'DESC' : 'ASC' )
					changeSortOption(Object.keys(sortProducts)[0], sortProducts[Object.keys(sortProducts)[0]]  === 'ASC' ? 'DESC' : 'ASC')
				}
				}>
					{ sortProducts[Object.keys(sortProducts)[0]] }	
				</div>

			</div> }

			{ categories?.categories.items[0]?.display_mode === 'PAGE' && <Categories categories={ categories } /> }
			
			{ categories?.categories.items[0]?.display_mode === null && <Products products={ loadedProducts } pageNumber={pageNumber} setPageNumber={ getMoreProducts } showFiltersOverlay={ showFiltersOverlay } setShowFiltersOverlay={ setShowFiltersOverlay } /> }
			
			{ categories?.categories.items[0]?.display_mode === 'PRODUCTS' && <Products products={ loadedProducts } pageNumber={pageNumber} setPageNumber={ getMoreProducts } showFiltersOverlay={ showFiltersOverlay } setShowFiltersOverlay={ setShowFiltersOverlay } /> }
	  		

			{ product?.products?.items && product?.products?.items?.length > 0 && <Product product={ product } /> }
			
		</main>
	
	</div>
  }
  
  export default CategoryPage