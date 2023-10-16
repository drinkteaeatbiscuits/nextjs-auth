import { useEffect, useState } from 'react';
import style from './SearchModal.module.scss';
import useSearchProducts from '../../hooks/useSearchProducts';
import useDebounce from '../../hooks/useDebounce';
import Link from 'next/link';

const SearchModal = (props:any) => {

	const {showSearchModal, setShowSearchModal} = props;
	const [ pageNumber, setPageNumber ] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [skip, setSkip] = useState(true);
	const [loadedProducts, setLoadedProducts] = useState<any>(null);
	const [totalProducts, setTotalProducts] = useState<any>(null);
	const debounceSearch = useDebounce(searchTerm, 300);
	
	const { data: products, fetchMore: fetchMoreProducts, refetch: refetchProducts } = useSearchProducts( { pageNumber: pageNumber, pageSize: 9, category_id: null, search: searchTerm, skip: skip } );

	useEffect(() => {

		if(debounceSearch) {
			// console.log('quantity set');
			console.log(searchTerm);
			setSkip(false);
			refetchProducts({
				search: searchTerm
			});
		}
	
	}, [debounceSearch]);

	// useEffect(() => {

		
	// 	searchTerm && refetchProducts({
	// 		search: searchTerm
	// 	});
	
	// }, [searchTerm]);

	console.log(products);


	return <div className={style.searchModal} style={{
		transform: showSearchModal ? 'translateY(0px)' : 'translateY(-100%)'}}>
		
		<div className={style.closeWrap}>
			<div className={style.close} style={{cursor: 'pointer'}} onClick={() => { setShowSearchModal(false) }}>Close</div>
		</div>

		<p>Search</p>

		<input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

		{ products && products.products.items && products.products.items.map((product:any) => {
			return <div className='product' key={product.uid}><Link href={product.url_key}>{ product.name }</Link></div>
		})}
		
	</div>
}

export default SearchModal;