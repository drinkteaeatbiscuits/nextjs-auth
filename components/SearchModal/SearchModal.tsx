import { useEffect, useState } from 'react';
import style from './SearchModal.module.scss';
import useSearchProducts from '../../hooks/useSearchProducts';
import useDebounce from '../../hooks/useDebounce';
import Link from 'next/link';
import client from '../../constants/apollo-client';
import ProductCatalog from '../ProductCatalog/ProductCatalog';
import { useInView } from 'react-intersection-observer';

const SearchModal = (props:any) => {

	const {showSearchModal, setShowSearchModal} = props;
	const [ pageNumber, setPageNumber ] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [skip, setSkip] = useState(true);
	const [loadedProducts, setLoadedProducts] = useState<any>(null);
	const [totalProducts, setTotalProducts] = useState<any>(null);
	const debounceSearch = useDebounce(searchTerm, 300);
	
	const { data: products, fetchMore: fetchMoreProducts, refetch: refetchProducts } = useSearchProducts( { pageNumber: pageNumber, pageSize: 9, category_id: null, search: searchTerm, skip: skip } );


	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 0,
		rootMargin: "300px",
		onChange: (inView, entry) => {
			// console.log(inView);
			
			inView && pageNumber < products?.products?.page_info?.total_pages && handleGetMoreProducts();
		}
	  });


	  const handleGetMoreProducts = () => {
		setPageNumber( pageNumber + 1);
		getMoreProducts();
	  }
	  
	useEffect(() => {

		if(debounceSearch) {
			// console.log('quantity set');
			// console.log(searchTerm);
			setSkip(false);
			refetchProducts({
				search: searchTerm
			});
		}
	
	}, [debounceSearch]);
	
	useEffect(() => {

		if(showSearchModal === false ){
			setSearchTerm('');
			setSkip(true);
			setLoadedProducts(null);
		}
	

	}, [showSearchModal]);

	useEffect(() => {

		products && setLoadedProducts( products.products );
		products && setTotalProducts( products.products.total_count ) ;

	}, [ products ]);


	const getMoreProducts = async () => {

		// console.log('get more');
		// console.log(categoriesArray);

		const nextPageNumber = pageNumber + 1;

			await fetchMoreProducts({
					variables: { 
						currentPage: nextPageNumber,
						pageSize: 9,
						search: searchTerm	
						}
					}).then((data) => {

						// console.log(data.data?.products);

						loadedProducts && data.data?.products && setLoadedProducts((test:any) => { 

							// console.log(test);

							const itemsArray = data?.data?.products?.items.reduce(
								(acc:any, item:any) => {
								  return acc.filter( (e:any) => e.uid === item?.uid ).length > 0 ? acc : [...acc, item]
								},
								[...test.items]
							  )
							  
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

		
		
	  };



	return <div className={style.searchModal} style={{
		transform: showSearchModal ? 'translateY(0px)' : 'translateY(-100%)'}}>
		
		{/* <div className={style.closeWrap}>
			<div className={style.close} style={{cursor: 'pointer'}} onClick={() => { setShowSearchModal(false) }}>Close</div>
		</div> */}
		<div className={style.searchInputWrap}>
			<input className={style.searchInput} placeholder={'Search'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
				
		</div>
		<div className={style.searchResults + ' ' + (loadedProducts && loadedProducts.items && style.productsLoaded)}>
			{/* { products && products.products.items && products.products.items.map((product:any) => {
				return <div className='product' key={product.uid}><Link href={product.url_key}>{ product.name }</Link></div>
			})} */}
			{ loadedProducts && loadedProducts.items && loadedProducts.items.map((product:any) => {
				return <ProductCatalog key={product.uid} product={product}  layout={'list'} />
			})}


			{/* { loadedProducts && loadedProducts.items && <button onClick={() => handleGetMoreProducts()}>Load More</button> } */}

			{ loadedProducts && loadedProducts.items && pageNumber < products?.products?.page_info?.total_pages && <div ref={ref} className={style.loadMore} onClick={() => setPageNumber( pageNumber + 1 ) }>
					
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}} width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
						<circle cx="50" cy="50" fill="none" stroke="#e2e7eb" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
							<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
						</circle>
					</svg>

					<p style={{textAlign: 'center', color: '#a3afb0'}}>Load More</p>
				</div> }
		</div>
	</div>
}

export default SearchModal;