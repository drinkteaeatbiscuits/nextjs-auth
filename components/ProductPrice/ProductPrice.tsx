import {IntlProvider, FormattedMessage, FormattedNumber} from 'react-intl'

const ProductPrice = (props:any) => {
	const { product, selectedProductID } = props;

	// console.log(product);

	let productPrice;
	
	


	if( product?.price_range?.maximum_price?.final_price?.value === product?.price_range?.minimum_price?.final_price?.value && !selectedProductID ){
		
		productPrice = <IntlProvider locale="en" defaultLocale="en"><FormattedNumber value={product?.price_range?.minimum_price?.final_price?.value} style="currency" currency={product?.price_range?.minimum_price?.final_price?.currency} /></IntlProvider>

	} 

	if( product?.price_range?.maximum_price?.final_price?.value !== product?.price_range?.minimum_price?.final_price?.value && !selectedProductID ){
		
		productPrice = <IntlProvider locale="en" defaultLocale="en"><FormattedNumber value={product?.price_range?.minimum_price?.final_price?.value} style="currency" currency={product?.price_range?.minimum_price?.final_price?.currency} /></IntlProvider>

	} 
	
	return <p>{ productPrice }</p>
}

export default ProductPrice;