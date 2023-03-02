import Link from "next/link";
import { useInView } from 'react-intersection-observer';

const Products = (props:any) => {
	const { products, pageNumber, setPageNumber } = props;

	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 0,
		rootMargin: "300px",
		onChange: (inView, entry) => {
			console.log("in view");
			inView && pageNumber < products?.page_info?.total_pages && setPageNumber( pageNumber + 1 );
			
		}
	  });

	return <div className="products">
		 { products?.items && products?.items.map((product: any) => (
				<div style={{background: '#f7f7f7', width: '320px', height: '400px', borderRadius: '4px', margin: '8px'}} key={product.id}>
					<Link href={product.url_key}>{product.name}</Link>
					
				</div>
			))
		}
		

		{ pageNumber < products?.page_info?.total_pages && <div ref={ref} className="" onClick={() => setPageNumber( pageNumber + 1 ) }>
		
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