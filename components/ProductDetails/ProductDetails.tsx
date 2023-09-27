import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from './ProductDetails.module.scss';
import Link from 'next/link';
import ProductPrice from '../ProductPrice/ProductPrice';
import ProductQuantity from '../ProductQuantity/ProductQuantity';

const ProductDetails = (props:any) => {

	const { product, productType, quantity, setQuantity, handleAddToCart, layout } = props;

	return <div className={styles[productType] + ' ' + styles[layout] }>
				<div className={styles.imagWrap}>
					<LazyLoadImage
						className={styles.thumbnail}
						alt={product?.thumbnail?.label}

						src={product?.thumbnail?.url}
					/>
				</div>
				<div className={styles.productDetails}>
					<div className={styles.productTitle}>
						<Link href={product?.url_key}>{product.name}</Link>
					</div>
					
					<div className={styles.addToCart}>
						<div className={styles.price}><ProductPrice product={product} /></div>

						<ProductQuantity value={quantity} setQuantity={setQuantity} />
						{/* <input type="number" value={quantity || '1'} onChange={(e: any) => setQuantity(e.target.value)} /> */}
						<button className={styles.addToBasket} onClick={(e) => handleAddToCart(e, product?.sku, quantity)}>
							<svg xmlns="http://www.w3.org/2000/svg" width="19.056" height="23.737" viewBox="0 0 19.056 23.737">
								<path id="Union_6" data-name="Union 6" d="M2.4,23.737A2.4,2.4,0,0,1,0,21.4V7.133a2.414,2.414,0,0,1,2.4-2.4h2.4a4.736,4.736,0,1,1,9.473,0h2.4a2.414,2.414,0,0,1,2.4,2.4V21.4a2.4,2.4,0,0,1-2.4,2.34Zm0-2.34H16.66V7.133h-2.4v2.34a1.171,1.171,0,1,1-2.34,0V7.133H7.132v2.34a1.171,1.171,0,1,1-2.34,0V7.133H2.4ZM7.132,4.737h4.793a2.452,2.452,0,0,0-2.4-2.4A2.452,2.452,0,0,0,7.132,4.737ZM8.837,19.652v-4.21H4.626V14.06H8.837V9.85h1.381v4.21H14.43v1.382H10.219v4.21Z" fill="#fff"/>
							</svg>
							<svg className={styles.addToBasketSpinner} width="24" height="24" stroke="#FFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								
								<g className={styles.spinner_V8m1}>
									<circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3">
									</circle>
								</g>
							</svg>
						</button>
					</div>

				</div>
			</div>

}

export default ProductDetails;