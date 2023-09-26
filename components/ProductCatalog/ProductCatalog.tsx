import Link from "next/link";
import styles from './ProductCatalog.module.scss';
import { useAddToBasket } from "../../hooks/useAddToBasket";
import cartId from "../../constants/cartId";
import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductCatalog = (props:any) => {
	const { product } = props;

	const [quantity, setQuantity] = useState(1);
	
	const [variantQuantity, setVariantQuantity] = useState([]);

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
		});

	  }

	  useEffect(() => {

		let newVariantQuantity:any = []
		
		theProduct.variants && theProduct.variants.length > 0 && theProduct.variants.map((productVariant:any, index:any) => {
			
			newVariantQuantity.push('1');
			
		});

		setVariantQuantity(newVariantQuantity);

	  }, [product]);


	return <div className="product">
		 
		 <div className="" style={{
			display: 'flex',
			flexWrap: 'wrap',
			padding: '40px 0'
		 }}>
			<div className={styles.imagWrap}>
					<LazyLoadImage
						className={styles.thumbnail}
						alt={theProduct.thumbnail.label}
						
						src={theProduct.thumbnail.url} 
						 />
				</div>
				<Link href={theProduct.url_key}>{theProduct.name}</Link>
			
				{/* <p>{ price.format( theProduct?.price_range.maximum_price.final_price.value ) }</p> */}
				<div className="add-to-cart">
				{ theProduct.variants && theProduct.variants.length > 0 ? theProduct.variants.map((productVariant:any, index:any) => {
				

					return productVariant.attributes.length > 0 && <div className="configurable-product-add-to-cart" key={productVariant.attributes[0].label}>
						<p>{productVariant.attributes[0].label}</p>
						<input type="number" value={variantQuantity[index] || '1'} onChange={(e:any) => { let newVariantQuantity:any = [...variantQuantity]; newVariantQuantity[index] = e.target.value; setVariantQuantity( newVariantQuantity ) }}  />
						<button onClick={(e) => handleAddToCart(e, productVariant.product.sku, variantQuantity[index])}>Add to Basket</button>
					
					</div>
				
				}) : <div className="simple-product-add-to-cart">
						<input type="number" value={quantity || '1'} onChange={(e:any) => setQuantity( e.target.value )}  />
						<button onClick={(e) => handleAddToCart(e, theProduct?.sku, quantity)}>Add to Basket</button>
				
					</div>}
			
			</div>

			

		 </div>
		
	</div>
}

export default ProductCatalog;