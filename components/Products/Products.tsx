import Link from "next/link";
import { useInView } from 'react-intersection-observer';
import styles from './Products.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useState } from "react";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductCatalog from "../ProductCatalog/ProductCatalog";

const Products = (props:any) => {
	const { products, pageNumber, setPageNumber } = props;

	const [layout, setLayout] = useState('list');

	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 0,
		rootMargin: "300px",
		onChange: (inView, entry) => {
			// console.log("in view");
			inView && pageNumber < products?.page_info?.total_pages && setPageNumber( pageNumber + 1 );
			
		}
	  });

	// console.log(products);
	// console.log('test');

	const layoutIconActive = (layoutOption:any) => {
		if(layout === layoutOption){
			return styles.activeIcon
		}
	}

	return <div className={ styles.products + ' products ' + layout }>
			<div className={styles.chooseLayout}>		
				<div className={layoutIconActive('grid')} onClick={() => setLayout('grid')}>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
						<path id="grid_2x2" data-name="grid 2x2" d="M1.5,7.5H6A1.521,1.521,0,0,0,7.5,6V1.5A1.442,1.442,0,0,0,7.055.445,1.442,1.442,0,0,0,6,0H1.5A1.442,1.442,0,0,0,.445.445,1.442,1.442,0,0,0,0,1.5V6A1.442,1.442,0,0,0,.445,7.055,1.442,1.442,0,0,0,1.5,7.5ZM12,7.5h4.5A1.521,1.521,0,0,0,18,6V1.5A1.442,1.442,0,0,0,17.555.445,1.442,1.442,0,0,0,16.5,0H12a1.442,1.442,0,0,0-1.055.445A1.442,1.442,0,0,0,10.5,1.5V6A1.521,1.521,0,0,0,12,7.5Zm-12,9a1.442,1.442,0,0,0,.445,1.055A1.442,1.442,0,0,0,1.5,18H6a1.521,1.521,0,0,0,1.5-1.5V12A1.521,1.521,0,0,0,6,10.5H1.5a1.442,1.442,0,0,0-1.055.445A1.442,1.442,0,0,0,0,12Zm10.5,0A1.521,1.521,0,0,0,12,18h4.5A1.521,1.521,0,0,0,18,16.5V12a1.521,1.521,0,0,0-1.5-1.5H12A1.521,1.521,0,0,0,10.5,12Z" fill="currentColor"/>
					</svg>
				</div>
				<div className={layoutIconActive('single')} onClick={() => setLayout('single')}>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
						<rect id="Rectangle_125" data-name="Rectangle 125" width="18" height="18" rx="4" fill="currentColor"/>
					</svg>
				</div>
				<div className={layoutIconActive('list')} onClick={() => setLayout('list')}>
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18">
						<path id="list" d="M.493,14.929A1.783,1.783,0,0,0,0,16.2,1.8,1.8,0,0,0,.493,17.47,1.568,1.568,0,0,0,1.684,18h.756a1.568,1.568,0,0,0,1.192-.53A1.8,1.8,0,0,0,4.125,16.2a1.783,1.783,0,0,0-.493-1.267A1.576,1.576,0,0,0,2.441,14.4H1.684A1.576,1.576,0,0,0,.493,14.929Zm0-7.19a1.877,1.877,0,0,0,0,2.535,1.576,1.576,0,0,0,1.192.524h.756a1.576,1.576,0,0,0,1.192-.524,1.783,1.783,0,0,0,.493-1.267,1.8,1.8,0,0,0-.493-1.274A1.568,1.568,0,0,0,2.441,7.2H1.684A1.56,1.56,0,0,0,.493,7.739Zm0-7.2A1.783,1.783,0,0,0,0,1.8,1.783,1.783,0,0,0,.493,3.071,1.576,1.576,0,0,0,1.684,3.6h.756a1.576,1.576,0,0,0,1.192-.524A1.783,1.783,0,0,0,4.125,1.8,1.8,1.8,0,0,0,3.632.53,1.568,1.568,0,0,0,2.441,0H1.684A1.56,1.56,0,0,0,.493.536Zm5.5,14.393A1.783,1.783,0,0,0,5.5,16.2a1.8,1.8,0,0,0,.493,1.274A1.568,1.568,0,0,0,7.184,18H20.316a1.568,1.568,0,0,0,1.192-.53A1.8,1.8,0,0,0,22,16.2a1.783,1.783,0,0,0-.493-1.267,1.576,1.576,0,0,0-1.192-.524H7.184A1.576,1.576,0,0,0,5.993,14.929Zm0-7.19a1.877,1.877,0,0,0,0,2.535,1.576,1.576,0,0,0,1.192.524H20.316a1.576,1.576,0,0,0,1.192-.524A1.783,1.783,0,0,0,22,9.006a1.8,1.8,0,0,0-.493-1.274,1.568,1.568,0,0,0-1.192-.53H7.184A1.56,1.56,0,0,0,5.993,7.739Zm0-7.2A1.783,1.783,0,0,0,5.5,1.8a1.783,1.783,0,0,0,.493,1.267A1.576,1.576,0,0,0,7.184,3.6H20.316a1.576,1.576,0,0,0,1.192-.524A1.783,1.783,0,0,0,22,1.8,1.8,1.8,0,0,0,21.507.53,1.568,1.568,0,0,0,20.316,0H7.184A1.56,1.56,0,0,0,5.993.536ZM22,17.915" fill="currentColor"/>
					</svg>
				</div>
			</div>

		 { products?.items && products?.items.map((product: any) => (

			<ProductCatalog product={product} key={product?.id} layout={layout} />

				// <div className={styles.product} key={product.id}>
				// 	<div className={styles.imagWrap}>
				// 		<Link href={product.url_key}><LazyLoadImage
				// 		className={styles.thumbnail}
				// 		alt={product.thumbnail.label}
				// 		src={product.thumbnail.url} 
				// 			/></Link>
				// 	</div>
					

				// 	<Link href={product.url_key}>{product.name}</Link>
				// 	{/* <p>{ product?.sku }</p> */}
				// 	{/* <p>{ product?.stock_status }</p> */}
				// 	<ProductPrice product={product} />
				// </div>
			))
		}
		

		{ pageNumber < products?.page_info?.total_pages && <div ref={ref} className={styles.loadMore} onClick={() => setPageNumber( pageNumber + 1 ) }>
		
			<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}} width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
				<circle cx="50" cy="50" fill="none" stroke="#e2e7eb" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
					<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
				</circle>
			</svg>

			<p style={{textAlign: 'center', color: '#a3afb0'}}>Load More</p>
		</div> }
	</div>
}

export default Products;