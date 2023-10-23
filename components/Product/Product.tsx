import Link from "next/link";
import styles from './Product.module.scss';
import Image from "next/image";
import { useAddConfigurableProductsToCart, useAddToBasket } from "../../hooks/useAddToBasket";
import cartId from "../../constants/cartId";
import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductImageGallery from "../ProductImageGallery/ProductImageGallery";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import notification from "../../constants/notification";

const Product = (props:any) => {
	const { product } = props;

	const [quantity, setQuantity] = useState(1);
	const [variantQuantity, setVariantQuantity] = useState([]);
	const [selectedVariant, setSelectedVariant] = useState<any>(product?.products?.items[0].variants[0].product);
	const [showAttributesDropdown, setShowAttributesDropdown] = useState(false);

	// const [theProduct, setTheProduct] = useState<any>(null);

	const yourCartId = useReactiveVar(cartId);
	
	const { addToCart } = useAddToBasket();
	const { addConfigurableProductsToCart } = useAddConfigurableProductsToCart();


	const theProduct = product?.products?.items[0];

	const price = new Intl.NumberFormat( undefined, {
		style: 'currency',
		currency: theProduct?.price_range.maximum_price.final_price.currency,
	  });

	  

	  useEffect(() => {

		let newVariantQuantity:any = []
		
		theProduct.variants && theProduct.variants.length > 0 && theProduct.variants.map((productVariant:any, index:any) => {
			
			newVariantQuantity.push('1');

			return
			
		});

		setVariantQuantity(newVariantQuantity);

	  }, [product]);


	  function hideOnClickOutside(element:any) {

			const outsideClickListener = (event:any) => {
				if(element !== event.target){
					setShowAttributesDropdown(false);
					removeClickListener();
				}
			}
		
			const removeClickListener = () => {
				document.removeEventListener('click', outsideClickListener);
			}
		
			document.addEventListener('click', outsideClickListener);
		}


	  const handleDropdownShow = (element:any) => {

			hideOnClickOutside(element.target);

			setShowAttributesDropdown(!showAttributesDropdown);


		}

		const handleAddToCart = async (event: any, sku: String, quantity: Number, parentSku: any, productName:any) => {

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
				
				notification({notificationType: 'success', message: productName + ' added to cart.'});
	
				currentTarget.classList.remove(styles.addingToCart);
				setQuantity(1);
			});
		}

		const handleAddConfigurableToCart = async (event: any, sku: String, quantity: Number, parentSku: any, productName: any) => {

			event.preventDefault();
	
			let currentTarget = event.currentTarget;
			currentTarget.classList.add(styles.addingToCart);
	
			const data = {
				input: {
				cart_id: yourCartId,
				cart_items: [
				{
					parent_sku: parentSku,
					data: {
						quantity: quantity,
						sku: sku
					}
				}
				]}};
	
			await addConfigurableProductsToCart({variables: data}).then((res) => {
				console.log(res);
				
				notification({notificationType: 'success', message: productName + ' added to cart.'});
	
				currentTarget.classList.remove(styles.addingToCart);
				setQuantity(1);
			});
		}



	  console.log(theProduct);
	  console.log(selectedVariant);

	return <div className="product">
		 
		 <div className={styles.product}>

	  		<ProductImageGallery product={theProduct} />
			
			<div className={styles.productDetails}>
				<h1 className={styles.productTitle}>{ theProduct?.name }</h1>
				<div className="" style={{display: 'flex'}}>
					<div className={styles.sku}>SKU: { theProduct?.sku }</div>
					<div className={styles.inStock}>{ theProduct?.stock_status === 'IN_STOCK' ? 'IN STOCK' : 'OUT OF STOCK' }</div>
				</div>


				<div className={styles.variantsPrice}>


					{/* <div className={styles.price}><ProductPrice product={product} /></div> */}

					{(theProduct.variants.length > 0) && <div className={styles.attributesSelect + ' ' + (showAttributesDropdown && styles.dropdownOpen) + ' ' + (theProduct?.variants.length <= 1 && styles.singleVariant)}>


					{ theProduct?.variants && theProduct?.variants?.find((product:any) => {

						return product?.product?.uid == selectedVariant.uid

					})?.attributes.map((productAttribute:any) => {

						return <div className={styles.productAttributeSelected} key={productAttribute.uid} onClick={(element:any) => handleDropdownShow(element)}>{productAttribute.label}<svg xmlns="http://www.w3.org/2000/svg" width="11.297" height="6.428" viewBox="0 0 11.297 6.428">
						<path  d="M10.008.287,5.648,4.6,1.289.287A.621.621,0,0,0,.258.264a.668.668,0,0,0,0,1.055L5.133,6.193a.684.684,0,0,0,1.031,0l4.875-4.875a.668.668,0,0,0,0-1.055A.621.621,0,0,0,10.008.287Z"/>
					</svg>
					</div>

					}) }



					{theProduct?.variants.length > 1 && showAttributesDropdown && <div className={styles.additionalVariants}>{ theProduct?.variants.map((variant:any) => {

					return selectedVariant.uid !== variant.product.uid && <div className={styles.variant} key={variant.product.uid} onClick={() => {setSelectedVariant(variant.product); setShowAttributesDropdown(!showAttributesDropdown)}}>
									{ variant.attributes.map((attribute:any, index:any) => {
										return (index > 0 ? ', ' : '') + attribute.label 
									})}
								</div>

					}) } </div>}

					</div> }


					<div className={styles.price}><p className={styles.totalText}>Total</p><ProductPrice product={selectedVariant} /></div>

				</div>

				<div className={styles.priceAddToCart}>

					{selectedVariant.stock_status === 'IN_STOCK' && <><ProductQuantity value={quantity} setQuantity={setQuantity} layout={'single'} productId={selectedVariant.uid} singleProduct={true} />
						{/* <input type="number" value={quantity || '1'} onChange={(e: any) => setQuantity(e.target.value)} /> */}
						<button className={styles.addToBasket} onClick={(e) => theProduct ? handleAddConfigurableToCart(e, selectedVariant?.sku, quantity, theProduct.sku, selectedVariant?.name) : handleAddToCart(e, selectedVariant?.sku, quantity, theProduct.sku, selectedVariant?.name)}>
							<svg xmlns="http://www.w3.org/2000/svg" width="19.056" height="23.737" viewBox="0 0 19.056 23.737">
								<path id="Union_6" data-name="Union 6" d="M2.4,23.737A2.4,2.4,0,0,1,0,21.4V7.133a2.414,2.414,0,0,1,2.4-2.4h2.4a4.736,4.736,0,1,1,9.473,0h2.4a2.414,2.414,0,0,1,2.4,2.4V21.4a2.4,2.4,0,0,1-2.4,2.34Zm0-2.34H16.66V7.133h-2.4v2.34a1.171,1.171,0,1,1-2.34,0V7.133H7.132v2.34a1.171,1.171,0,1,1-2.34,0V7.133H2.4ZM7.132,4.737h4.793a2.452,2.452,0,0,0-2.4-2.4A2.452,2.452,0,0,0,7.132,4.737ZM8.837,19.652v-4.21H4.626V14.06H8.837V9.85h1.381v4.21H14.43v1.382H10.219v4.21Z" fill="#fff"/>
							</svg>
							<p>Add to Basket</p>
							<svg className={styles.addToBasketSpinner} width="24" height="24" stroke="#FFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								
								<g className={styles.spinner_V8m1}>
									<circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3">
									</circle>
								</g>
							</svg>
						</button></>}

				</div>

				
				
			
			</div>

			

		 </div>
		
	</div>
}

export default Product;