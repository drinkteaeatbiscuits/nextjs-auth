import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from './ChildCategoriesCarousel.module.scss';
import Link from 'next/link';

const ChildCategoriesCarousel = (props:any) => {

	const { categories } = props;

	console.log(categories);

	return <div className={styles.categories}>
		{categories?.length > 0 && categories.map((category:any) => {
			return <Link key={category.uid} href={category.url_key}><div className={styles.category} >
				{ category.image && <LazyLoadImage
						className={styles.categoryImage}
						alt={ category.name }
						src={ category.image }
					/>}
				
					<p className={styles.categoryName}>{ category.name }</p>
				</div></Link>
		})}
	</div>;

}

export default ChildCategoriesCarousel;