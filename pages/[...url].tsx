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


const CategoryPage = (props: any) => {

	const router = useRouter()
	const { url } = router.query;

	const [ pageNumber, setPageNumber ] = useState(1);

	const { data: categories } = useGetCategories( url );
	// const { data: products, refetch: refetchProducts } = useGetProducts( { pageNumber: pageNumber, pageSize: 9, category_id: null } );
	const { data: product, refetch: refetchProduct } = useGetProduct( { url_key: url } );
	const { data: products, fetchMore: fetchMoreProducts, refetch: refetchProducts } = useGetProducts( { pageNumber: pageNumber, pageSize: 9, category_id: null, sort: { position: 'DESC' } } );

	const [loadedProducts, setLoadedProducts] = useState<any>(null);
	const [categoriesArray, setCategoriesArray] = useState<any>(null);
	const [sortProducts, setSortProducts] = useState<any>({ position: 'DESC' });
	const [totalProducts, setTotalProducts] = useState<any>(null);
	const [showFiltersOverlay, setShowFiltersOverlay] = useState(false);

	const updateCategoryArray = () => {
		const categoryArray: any[] = []
			
			categories?.categories?.items.map((category:any) => {
				categoryArray.push( category.uid.toString() )
			})
		
		setCategoriesArray(categoryArray);

	}


	useEffect(() => {
		
		categories && updateCategoryArray();

	}, [categories]);


	useEffect(() => {

		setPageNumber(1);
		
		categoriesArray && refetchProducts({
			filter: {
				category_uid: {
					eq: null,
					in: categoriesArray,
				},
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
			},
			sort: sortProducts,
		});

	}, [ sortProducts ]);


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
							}
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

  
	return <div className={styles.container}>
		<Header />
		<main style={{paddingTop: '70px'}}>



			<ProductFilters categories={categories} showFilters={showFiltersOverlay} setShowFiltersOverlay={setShowFiltersOverlay} />

			<Breadcrumbs url={url} breadcrumbs={categories?.categories.items[0]?.breadcrumbs || product?.products?.items[0]?.categories} category={categories?.categories.items[0]?.name || product?.products?.items[0]?.name} />
			
			<h1>{categories?.categories.items[0]?.name}</h1>

			<ChildCategoriesCarousel categories={ categories?.categories?.items[0].children } />

				{ categories?.categories.items[0]?.display_mode !== 'PAGE' && <div className="">
			
				{ totalProducts && <p>{totalProducts} products found</p> }

				<select className="sort" value={Object.keys(sortProducts)[0]} onChange={ (event) => changeSortOption(event.target.value, sortProducts[Object.keys(sortProducts)[0]]) }>
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