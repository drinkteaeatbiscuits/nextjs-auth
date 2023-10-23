import { useState } from "react";
import styles from './ProductCatalog.module.scss';
import ProductDetails from "../ProductDetails/ProductDetails";
 
const ProductCatalog = (props: any) => {
	const { product, layout } = props;
	const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);

	// console.log(product);

	return <><div className={styles.product + ' product ' + styles[layout]}>

		{ product && <div className={styles.productInner}>

			{ // If Simple Product
			!product?.variants && <ProductDetails layout={layout} product={product} productType={'simple'} />}


			{ // If Product has variants
			product?.variants && product?.variants?.length > 0 && <div className={styles.configurableProduct}>
			
				{ product?.variants?.slice(0, 1 ).map((productVariant: any, index: any) => <ProductDetails layout={layout} product={productVariant.product} key={productVariant.product.uid} productAttributes={productVariant?.attributes} productType={'simple'} productLink={product.url_key} parentSku={product.sku} parentProduct={product} />)} 

				{ showAdditionalOptions && <div className={styles.additionalOptions}>

					{ product?.variants?.slice(1, product?.variants.length ).map((productVariant: any, index: any) => <ProductDetails layout={layout} product={productVariant.product} key={productVariant?.product?.uid} productAttributes={productVariant?.attributes} productType={'simple'}  productLink={product.url_key} parentSku={product.sku}  parentProduct={product} />)} 
				
				</div> }

					
			</div>}

		</div>}

				

	</div>
	{product?.variants && product?.variants?.length > 1 && layout === 'list' && <div className={ styles.showOptions } onClick={() => setShowAdditionalOptions(!showAdditionalOptions)} ><p>{showAdditionalOptions ? 'Hide Options' : 'Show Options'}</p></div>}
	</>	
}

export default ProductCatalog;