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
	const { data: products, fetchMore: fetchMoreProducts, refetch: refetchProducts } = useGetProducts( { pageNumber: pageNumber, pageSize: 9, category_id: null, sort: { position: 'DESC' } } );

	const [loadedProducts, setLoadedProducts] = useState<any>(null);
	const [categoriesArray, setCategoriesArray] = useState<any>(null);
	const [sortProducts, setSortProducts] = useState<any>({ position: 'DESC' });
	const [totalProducts, setTotalProducts] = useState<any>(null);

	

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

		setPageNumber(1);
		
		categoriesArray && refetchProducts({
			filter: {
				category_id: {
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

	}, [ url ]);

	useEffect(() => {

		// sortProducts && refetchProducts({
		// 	sort: sortProducts,
		// });

		// setLoadedProducts( null );
		// setTotalProducts( null );
		setPageNumber(1);
		sortProducts && refetchProducts({
			currentPage: 1,
			pageSize: 9,
			filter: {
				category_id: {
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

		console.log('get more');

		if( categoriesArray ) {

			const nextPageNumber = pageNumber + 1;

			await fetchMoreProducts({
					variables: { 
						"currentPage": nextPageNumber,
						"pageSize": 9,
						"filter": {
							"category_id": {
								"eq": null,
								"in": categoriesArray
							}
						},
						"sort": sortProducts,
							
						}
					}).then((data) => {

						data.data?.products && setLoadedProducts((test:any) => { 
			

							const itemsArray = data.data.products.items.reduce(
								(acc:any, item:any) => {
								
								  return acc.filter( (e:any) => e.id === item.id ).length > 0 ? acc : [...acc, item]
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

	// console.log(products);

	// console.log(pageNumber);
	// console.log(categories);
	// {categories?.categoryList[0]?.display_mode === null && console.log( 'test null')}
	// {categories?.categoryList[0]?.display_mode === 'PRODUCTS' && console.log( 'test products')}
  
	return <div className={styles.container}>
		<Header />
		<main style={{paddingTop: '70px'}}>

			<Breadcrumbs url={url} breadcrumbs={categories?.categoryList[0]?.breadcrumbs || product?.products?.items[0]?.categories} category={categories?.categoryList[0]?.name || product?.products?.items[0]?.name} />
			
			<h1>{categories?.categoryList[0]?.name}</h1>

			{ categories?.categoryList[0]?.display_mode !== 'PAGE' && <div className="">
			
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

			{ categories?.categoryList[0]?.display_mode === 'PAGE' && <Categories categories={ categories } /> }
			
			{ categories?.categoryList[0]?.display_mode === null && <Products products={ loadedProducts } pageNumber={pageNumber} setPageNumber={ getMoreProducts } /> }
			
			{ categories?.categoryList[0]?.display_mode === 'PRODUCTS' && <Products products={ loadedProducts } pageNumber={pageNumber} setPageNumber={ getMoreProducts } /> }
	  		

			{ product?.products?.items && product?.products?.items?.length > 0 && <Product product={ product } /> }
			
		</main>
	
	</div>
  }
  
  export default CategoryPage