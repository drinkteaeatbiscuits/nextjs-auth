import Link from "next/link";
import styles from './ProductCatalog.module.scss';
import { useAddToBasket } from "../../hooks/useAddToBasket";
import cartId from "../../constants/cartId";
import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductQuantity from "../ProductQuantity/ProductQuantity";

const ProductCatalog = (props: any) => {
	const { product, layout } = props;

	const [quantity, setQuantity] = useState(1);

	const [variantQuantity, setVariantQuantity] = useState([]);

	const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);

	const yourCartId = useReactiveVar(cartId);


	const { addToCart } = useAddToBasket();

	// console.log(product);


	const theProduct = product;

	// const price = new Intl.NumberFormat( undefined, {
	// 	style: 'currency',
	// 	currency: theProduct?.price_range.maximum_price.final_price.currency,
	//   });

	const handleAddToCart = async (event: any, sku: String, quantity: Number) => {

		event.preventDefault();

		let currentTarget = event.currentTarget;

		currentTarget.classList.add(styles.addingToCart);

		const data = {
			cartId: yourCartId,
			cartItems: [
				{
					quantity: quantity,
					sku: sku
				}
			]
			
		  };

		await addToCart({variables: data}).then((res) => {
			console.log(res);
			currentTarget.classList.remove(styles.addingToCart);
		});

	  }

	useEffect(() => {

		let newVariantQuantity: any = []

		theProduct?.variants && theProduct?.variants?.length > 0 && theProduct?.variants.map((productVariant: any, index: any) => {

			newVariantQuantity.push('1');

		});

		setVariantQuantity(newVariantQuantity);

	}, [product]);

	// console.log(theProduct);


	return <div className={styles.product + ' product ' + styles[layout]}>

		{theProduct && <div className={styles.productInner}>


			{!theProduct?.variants && <div className={styles.simpleProduct}>
				<div className={styles.imagWrap}>
					<LazyLoadImage
						className={styles.thumbnail}
						alt={theProduct?.thumbnail?.label}

						src={theProduct?.thumbnail?.url}
					/>
				</div>
				<div className={styles.productDetails}>
					<Link href={theProduct?.url_key}>{theProduct.name}</Link>
					<div className={styles.addToCart}>
						<div className={styles.price}><ProductPrice product={theProduct} /></div>

						<ProductQuantity value={quantity} setQuantity={setQuantity} />
						{/* <input type="number" value={quantity || '1'} onChange={(e: any) => setQuantity(e.target.value)} /> */}
						<button className={styles.addToBasket} onClick={(e) => handleAddToCart(e, theProduct?.sku, quantity)}>
							<svg xmlns="http://www.w3.org/2000/svg" width="19.056" height="23.737" viewBox="0 0 19.056 23.737">
								<path id="Union_6" data-name="Union 6" d="M2.4,23.737A2.4,2.4,0,0,1,0,21.4V7.133a2.414,2.414,0,0,1,2.4-2.4h2.4a4.736,4.736,0,1,1,9.473,0h2.4a2.414,2.414,0,0,1,2.4,2.4V21.4a2.4,2.4,0,0,1-2.4,2.34Zm0-2.34H16.66V7.133h-2.4v2.34a1.171,1.171,0,1,1-2.34,0V7.133H7.132v2.34a1.171,1.171,0,1,1-2.34,0V7.133H2.4ZM7.132,4.737h4.793a2.452,2.452,0,0,0-2.4-2.4A2.452,2.452,0,0,0,7.132,4.737ZM8.837,19.652v-4.21H4.626V14.06H8.837V9.85h1.381v4.21H14.43v1.382H10.219v4.21Z" fill="#fff"/>
							</svg>
						</button>
					</div>

				</div>
			</div>
			
			}

			{theProduct?.variants && theProduct?.variants?.length > 0 && <div className={styles.configurableProduct}>


				{ theProduct?.variants?.slice(0, 1 ).map((productVariant: any, index: any) => {
					
					return <div className={styles.configurableProductOption}>

						{ productVariant.attributes.length > 0 && <div className={styles.configurableProductOptionInner} key={productVariant.attributes[0].label}>
							<div className={styles.imagWrap}>
								<LazyLoadImage
									className={styles.thumbnail}
									alt={productVariant.product?.thumbnail?.label}

									src={productVariant.product?.thumbnail?.url}
								/>
							</div>
							<div className={styles.productDetails}>
								<Link href={theProduct?.url_key}>{theProduct.name}</Link>
								<p>{productVariant.attributes[0].label}</p>
								
								<div className={styles.addToCart}>
									<div className={styles.price}><ProductPrice product={productVariant.product} /></div>
									
									<input className={styles.quantity} type="number" value={quantity || '1'} onChange={(e: any) => setQuantity(e.target.value)} />
									<button className={styles.addToBasket} onClick={(e) => handleAddToCart(e, productVariant?.product?.sku, quantity)}>
									<svg xmlns="http://www.w3.org/2000/svg" width="19.056" height="23.737" viewBox="0 0 19.056 23.737">
									<path id="Union_6" data-name="Union 6" d="M2.4,23.737A2.4,2.4,0,0,1,0,21.4V7.133a2.414,2.414,0,0,1,2.4-2.4h2.4a4.736,4.736,0,1,1,9.473,0h2.4a2.414,2.414,0,0,1,2.4,2.4V21.4a2.4,2.4,0,0,1-2.4,2.34Zm0-2.34H16.66V7.133h-2.4v2.34a1.171,1.171,0,1,1-2.34,0V7.133H7.132v2.34a1.171,1.171,0,1,1-2.34,0V7.133H2.4ZM7.132,4.737h4.793a2.452,2.452,0,0,0-2.4-2.4A2.452,2.452,0,0,0,7.132,4.737ZM8.837,19.652v-4.21H4.626V14.06H8.837V9.85h1.381v4.21H14.43v1.382H10.219v4.21Z" fill="#fff"/>
									</svg>
									</button>
								</div>
								
							</div>
						</div>
						}

					
					
					</div>

				})} 

				{ showAdditionalOptions && <div className={styles.additionalOptions}>

				{ theProduct?.variants?.slice(1, theProduct?.variants.length ).map((productVariant: any, index: any) => {
					
					return <div className={styles.configurableProductOption}>

						{ productVariant.attributes.length > 0 && <div className={styles.configurableProductOptionInner} key={productVariant.attributes[0].label}>
							
							<div className={styles.imagWrap}>
								<LazyLoadImage
									className={styles.thumbnail}
									alt={productVariant.product?.thumbnail?.label}

									src={productVariant.product?.thumbnail?.url}
								/>
							</div>
							<div className={styles.productDetails}>
								<Link href={theProduct?.url_key}>{theProduct.name}</Link>
								<p>{productVariant.attributes[0].label}</p>
								
								<div className={styles.addToCart}>
									<div className={styles.price}><ProductPrice product={productVariant.product} /></div>
									
									<input className={styles.quantity} type="number" value={variantQuantity[index] || '1'} onChange={(e: any) => { let newVariantQuantity: any = [...variantQuantity]; newVariantQuantity[index] = e.target.value; setVariantQuantity(newVariantQuantity) }} />
									<button className={styles.addToBasket} onClick={(e) => handleAddToCart(e, productVariant?.product?.sku, quantity)}><svg xmlns="http://www.w3.org/2000/svg" width="19.056" height="23.737" viewBox="0 0 19.056 23.737">
									<path id="Union_6" data-name="Union 6" d="M2.4,23.737A2.4,2.4,0,0,1,0,21.4V7.133a2.414,2.414,0,0,1,2.4-2.4h2.4a4.736,4.736,0,1,1,9.473,0h2.4a2.414,2.414,0,0,1,2.4,2.4V21.4a2.4,2.4,0,0,1-2.4,2.34Zm0-2.34H16.66V7.133h-2.4v2.34a1.171,1.171,0,1,1-2.34,0V7.133H7.132v2.34a1.171,1.171,0,1,1-2.34,0V7.133H2.4ZM7.132,4.737h4.793a2.452,2.452,0,0,0-2.4-2.4A2.452,2.452,0,0,0,7.132,4.737ZM8.837,19.652v-4.21H4.626V14.06H8.837V9.85h1.381v4.21H14.43v1.382H10.219v4.21Z" fill="#fff"/>
									</svg>
									</button>
								</div>
								
							</div>
						</div>
						}

						
					
					</div>

				})} 
				</div> }

				<div className={ styles.showOptions } onClick={() => setShowAdditionalOptions(!showAdditionalOptions)} ><p>Show Options</p></div>
				
				</div>
				
				}





		</div>}

	</div>
}

export default ProductCatalog;