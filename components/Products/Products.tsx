import Link from "next/link";
import { useInView } from 'react-intersection-observer';
import styles from './Products.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useState } from "react";
import ProductPrice from "../ProductPrice/ProductPrice";

const Products = (props:any) => {
	const { products, pageNumber, setPageNumber } = props;

	const [layout, setLayout] = useState('');

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

	return <div className={ styles.products + ' ' + styles[layout] }>
			<div className="" style={{width: '100%'}}>		
				<div className="" onClick={() => setLayout('grid')}>grid</div>
				<div className="" onClick={() => setLayout('single')}>single</div>
				<div className="" onClick={() => setLayout('list')}>list</div>
			</div>

		 { products?.items && products?.items.map((product: any) => (

				<div className={styles.product} key={product.id}>
				<div className={styles.imagWrap}>
						<Link href={product.url_key}><LazyLoadImage
						className={styles.thumbnail}
						alt={product.thumbnail.label}
						
						src={product.thumbnail.url} 
						 /></Link>
				</div>
					

					<Link href={product.url_key}>{product.name}</Link>
					<p>{ product?.sku }</p>
					<p>{ product?.stock_status }</p>
					<ProductPrice product={product} />
				</div>
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