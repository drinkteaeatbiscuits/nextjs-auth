import Link from 'next/link';
import styles from './ProductFilters.module.scss';

const ProductFilters = (props:any) => {
	
	const { categories, showFilters, setShowFiltersOverlay } = props;

	const showFiltersOverlay = () => {
		return showFilters && styles.showFilters
	}

	return <div className={styles.filters + ' ' + showFiltersOverlay()}>
		

		<div className={styles.filtersTop}>
			<div className={styles.filtersTitle}><span className={styles.filtersTitleText}>Filters</span></div>	
			<div className={styles.filtersClose}  onClick={() => { setShowFiltersOverlay(false) }}><svg xmlns="http://www.w3.org/2000/svg" width="18.301" height="18.301" viewBox="0 0 18.301 18.301">
				<path id="close" d="M.479,16.1A1.071,1.071,0,0,0,.44,17.862,1.071,1.071,0,0,0,2.2,17.822l6.953-6.875L16.1,17.822a1.071,1.071,0,0,0,1.758.039,1.071,1.071,0,0,0-.039-1.758L10.947,9.151,17.822,2.2A1.071,1.071,0,0,0,17.862.44,1.071,1.071,0,0,0,16.1.479L9.151,7.354,2.2.479A1.071,1.071,0,0,0,.44.44,1.071,1.071,0,0,0,.479,2.2L7.354,9.151Z" fill="#d6d7dd"/>
				</svg>
			</div>
			
		</div>
		
			
			{ categories?.categoryList.length > 0 && categories?.categoryList[0]?.children.length > 0 && <div className={styles.categories}>
				<p>Categories</p> 
				{ categories?.categoryList[0]?.children?.map((category:any) => {
				return <Link key={category.url_key} href={category.url_key}><p>{category.name}</p></Link>
				})
				}

			</div>
			}

	</div>
}
export default ProductFilters;