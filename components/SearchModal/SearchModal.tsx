import { useEffect, useState } from 'react';
import style from './SearchModal.module.scss';
import useSearchProducts from '../../hooks/useSearchProducts';
import useDebounce from '../../hooks/useDebounce';
import Link from 'next/link';
import client from '../../constants/apollo-client';
import ProductCatalog from '../ProductCatalog/ProductCatalog';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';

const SearchModal = (props:any) => {


	const router = useRouter();
	const { url } = router.query;

	const {showSearchModal, setShowSearchModal, resetSearchModal} = props;
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

		setShowSearchModal && setShowSearchModal(false);

	  }, [url]);

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

		const cancelSearch = () => {
			setSearchTerm('');
			setSkip(true);
			setLoadedProducts(null);
		}


	return <div className={style.searchModal} style={{
		transform: showSearchModal ? 'translateY(0px)' : 'translateY(-100%)'}}>
		
		{/* <div className={style.closeWrap}>
			<div className={style.close} style={{cursor: 'pointer'}} onClick={() => { setShowSearchModal(false) }}>Close</div>
		</div> */}
		<div className={style.searchInputWrap}>

			<svg className={style.searchIcon} xmlns="http://www.w3.org/2000/svg" width="28.742" height="28.742" viewBox="0 0 28.742 28.742">
				<path d="M20.509,18.039l8.233,8.233-2.47,2.47-8.159-8.233V19.236l-.524-.449a10.422,10.422,0,0,1-6.961,2.545,10.245,10.245,0,0,1-7.522-3.106A10.245,10.245,0,0,1,0,10.7a10.369,10.369,0,0,1,3.106-7.56A10.1,10.1,0,0,1,10.554,0a10.184,10.184,0,0,1,7.522,3.144,10.369,10.369,0,0,1,3.106,7.56,10.422,10.422,0,0,1-2.545,6.961l.524.374Zm-15.119-2.1a7.27,7.27,0,0,0,5.239,2.1,7.2,7.2,0,0,0,5.239-2.133,7.017,7.017,0,0,0,2.171-5.2,7.139,7.139,0,0,0-2.171-5.239,7.139,7.139,0,0,0-5.239-2.171,7.017,7.017,0,0,0-5.2,2.171A7.2,7.2,0,0,0,3.293,10.7,7.27,7.27,0,0,0,5.389,15.943Zm23.353,12.8" fill="#d6d7dd"/>
			</svg>
			<input id='searchBox' className={style.searchInput} placeholder={'Search'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			{ searchTerm.length > 0 && <svg className={style.cancelSearch} onClick={() => cancelSearch()} xmlns="http://www.w3.org/2000/svg" width="11.27" height="11.27" viewBox="0 0 11.27 11.27">
				<path id="Path_15" data-name="Path 15" d="M9.877,0,5.634,4.243,1.392,0,0,1.392,4.242,5.635,0,9.878,1.392,11.27,5.634,7.027,9.877,11.27l1.392-1.392L7.027,5.635l4.242-4.243Z" transform="translate(0 0)" fill="#2e2e32"/>
			</svg>}
	
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