import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Categories from '../components/Categories';
import Header from '../components/Header'
import Products from '../components/Products';
import useGetCategories from '../hooks/useGetCategories';
import useGetProducts from '../hooks/useGetProducts';
import styles from "../styles/Home.module.css";


const CategoryPage = (props: any) => {
	const router = useRouter()
	const { url } = router.query;

	const [pageNumber, setPageNumber] = useState(1);

	const { data: categories } = useGetCategories( url );
	const { data: products, refetch: refetchProducts } = useGetProducts( { pageNumber: pageNumber, pageSize: 9, category_id: null } );

	const [loadedProducts, setLoadedProducts] = useState<any>({});

	useEffect(() => {

		categories && refetchProducts({
			currentPage: pageNumber,
			filter: {
				category_id: {
					eq: null,
					in: 345994
				}
			}
		});

		// products && setLoadedProducts({...loadedProducts, products: {...products.products}});
		// products && loadedProducts.length === 0 && setLoadedProducts([products.items]);

		products && setLoadedProducts( products.products );

		console.log(loadedProducts);
		
	}, [categories, products, pageNumber]);

	// console.log(pageNumber);
	// console.log(categories?.categoryList[0]?.display_mode);
  
	return <div className={styles.container}>
		<Header />
		<main>
			<Breadcrumbs breadcrumbs={categories?.categoryList[0]?.breadcrumbs} category={categories?.categoryList[0]?.name} />
			<h1>{categories?.categoryList[0]?.name}</h1>


			{ categories?.categoryList[0]?.display_mode === 'PAGE' && <Categories categories={ categories } /> }
			
			{ categories?.categoryList[0]?.display_mode === 'PRODUCTS' && <Products products={ loadedProducts } pageNumber={pageNumber} setPageNumber={setPageNumber} /> }

			
		</main>
	
	</div>
  }
  
  export default CategoryPage