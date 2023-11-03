import { useContext, useState } from "react";
import styles from './ProductCatalog.module.scss';
import ProductDetails from "../ProductDetails/ProductDetails";
import { useAddToWishlist } from "../../hooks/useAddToWishlist";
import { useRemoveFromWishlist } from "../../hooks/useRemoveFromWishlist";
 
const ProductCatalog = (props: any) => {
	const { product, layout, customer } = props;
	const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);


	const {addToWishList} = useAddToWishlist();
	const {removeFromWishList} = useRemoveFromWishlist();

	// console.log(customer?.customer?.wishlists[0]?.items_v2?.items);
	// console.log(product.uid);
	const handleAddToWishList = async (event:any, sku:any) => {
		
		event.preventDefault();

		let currentTarget = event.currentTarget;
		currentTarget.classList.add(styles.addingToCart);

		const data = {
			wishlistId: "1",
			wishlistItems: [
				{
					quantity: 1,
					sku: sku
				}
			]
		  };

		  await addToWishList({variables: data}).then((res) => {
			console.log(res);
				
		});
	}
	
	const handleRemoveWishList = async (event:any, uid:any) => {
		
		event.preventDefault();

		let currentTarget = event.currentTarget;
		currentTarget.classList.add(styles.addingToCart);

		let wishlistItemId = customer?.customer?.wishlists[0]?.items_v2?.items.filter((e:any) => e.product.uid === uid)[0]?.id;

		// console.log(wishlistItemId)

		const data = {
			wishlistId: "1",
			wishlistItemsIds: [ wishlistItemId ]
		  };

		  await removeFromWishList({variables: data}).then((res) => {
			console.log(res);
				
		});
	}

	// console.log(customer?.customer?.wishlists[0]?.items_v2?.items);


	const isProductInWishlist = () => {

		return customer?.customer?.wishlists[0]?.items_v2?.items.filter((e:any) => e.product.uid === product.uid).length > 0
	}

	// console.log(isProductInWishlist());
	// console.log(customer?.customer?.wishlists[0]?.items_v2?.items);

	return <><div className={styles.product + ' product ' + styles[layout]}>

		{ product && <div className={styles.productInner}>

			{ isProductInWishlist() ? <div className={styles.favourite} onClick={(event) => handleRemoveWishList(event, product.uid)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="17.556" viewBox="0 0 18 17.556">
			<path id="heart" d="M13.044,0a4.816,4.816,0,0,0-2.233.556A5.336,5.336,0,0,0,9,2.067,5.336,5.336,0,0,0,7.189.556,4.816,4.816,0,0,0,4.956,0,4.594,4.594,0,0,0,3,.422,4.885,4.885,0,0,0,1.422,1.578,5.419,5.419,0,0,0,.378,3.289,5.807,5.807,0,0,0,0,5.4,6.371,6.371,0,0,0,.544,8.022,11.358,11.358,0,0,0,2.1,10.5a30.367,30.367,0,0,0,2.433,2.644q1.422,1.389,3.156,3.122L9,17.556l1.311-1.311q1.733-1.711,3.156-3.1A30.367,30.367,0,0,0,15.9,10.5a11.358,11.358,0,0,0,1.556-2.478A6.371,6.371,0,0,0,18,5.4a5.807,5.807,0,0,0-.378-2.111,5.419,5.419,0,0,0-1.044-1.711A4.885,4.885,0,0,0,15,.422,4.594,4.594,0,0,0,13.044,0Z"/>
			</svg>
			</div> : <div className={styles.favourite} onClick={(event) => handleAddToWishList(event, product.sku)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="17.556" viewBox="0 0 18 17.556">
			<path id="heart_o" data-name="heart o" d="M13.044,1.911a2.791,2.791,0,0,1,2.178,1.011A3.62,3.62,0,0,1,16.111,5.4a4.605,4.605,0,0,1-.344,1.756,8.139,8.139,0,0,1-1.056,1.789,21.2,21.2,0,0,1-1.789,2.044q-1.078,1.1-2.522,2.5-.333.333-.689.678T9,14.889q-.378-.378-.733-.722t-.689-.678q-1.444-1.4-2.511-2.5A22.007,22.007,0,0,1,3.289,8.944,8.139,8.139,0,0,1,2.233,7.156,4.605,4.605,0,0,1,1.889,5.4a3.62,3.62,0,0,1,.889-2.478A2.791,2.791,0,0,1,4.956,1.911a2.717,2.717,0,0,1,1.322.333A5.505,5.505,0,0,1,7.556,3.267L9,4.756l1.489-1.489a11.671,11.671,0,0,1,1.2-.922A2.391,2.391,0,0,1,13.044,1.911Zm0-1.911a4.816,4.816,0,0,0-2.233.556A5.336,5.336,0,0,0,9,2.067,5.336,5.336,0,0,0,7.189.556,4.816,4.816,0,0,0,4.956,0,4.594,4.594,0,0,0,3,.422,4.885,4.885,0,0,0,1.422,1.578,5.419,5.419,0,0,0,.378,3.289,5.807,5.807,0,0,0,0,5.4,6.371,6.371,0,0,0,.544,8.022,11.358,11.358,0,0,0,2.1,10.5a30.367,30.367,0,0,0,2.433,2.644q1.422,1.389,3.156,3.122L9,17.556l1.311-1.311q1.733-1.711,3.156-3.1A30.367,30.367,0,0,0,15.9,10.5a11.358,11.358,0,0,0,1.556-2.478A6.371,6.371,0,0,0,18,5.4a5.807,5.807,0,0,0-.378-2.111,5.419,5.419,0,0,0-1.044-1.711A4.885,4.885,0,0,0,15,.422,4.594,4.594,0,0,0,13.044,0Z"/>
			</svg>
			</div>}

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