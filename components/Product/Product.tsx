import Link from "next/link";
import styles from './Product.module.scss';
import Image from "next/image";

const Product = (props:any) => {
	const { product } = props;

	const theProduct = product?.products?.items[0];

	const price = new Intl.NumberFormat( undefined, {
		style: 'currency',
		currency: theProduct?.price_range.maximum_price.final_price.currency,
	  });

	return <div className="product">
		 
		 <div className="" style={{
			display: 'flex',
			flexWrap: 'wrap',
			padding: '40px 0'
		 }}>
			<div className="">
			<Image style={{width: '450px'}} alt={ theProduct?.name } src={ theProduct.image.url } />
			</div>
			
			<div className="" 
				style={{
					padding: '24px',
					flexShrink: 1,
					width: '50%'
				}}>
				<h1>{ theProduct?.name }</h1>
				<p>{ theProduct?.sku }</p>
				<p>{ theProduct?.stock_status }</p>
				<p>{ price.format( theProduct?.price_range.maximum_price.final_price.value ) }</p>
				<button>Add to Basket</button>
			</div>

		 </div>
		
	</div>
}

export default Product;