import Link from "next/link";

const Products = (props:any) => {
	const { products, pageNumber, setPageNumber } = props;

	const loadMoreProducts = () => {
		
		setPageNumber( pageNumber + 1 );

	}

	// console.log(products);

	return <div className="products">
		 { products?.items && products?.items.map((product: any) => (
				<div key={product.id}>
					<Link href={product.url_key}>{product.name}</Link>
					
				</div>
			))
		}
		

		<div className="" onClick={() => loadMoreProducts() }>Load More</div>
	</div>
}

export default Products;