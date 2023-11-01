import { useEffect, useState } from 'react';
import useGetCategories from '../../hooks/useGetCategories';
import styles from './CategoriesNavigation.module.scss'
import SearchModal from '../SearchModal/SearchModal';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const CategoriesNavigation = (props:any) => {

    const {showCategoriesNavigation} = props;

    const [showSearchModal, setShowSearchModal] = useState(false);
    const [getCategories, { data: categories }] = useGetCategories( ['shop'] );
    const [getBrandCategories, { data: brandCategories }] = useGetCategories( ['brands'] );

    useEffect(() => {
		
		!categories && getCategories();
		!brandCategories && getBrandCategories();

	}, []);

    useEffect(() => {
        
        showCategoriesNavigation && setShowSearchModal(true);
        !showCategoriesNavigation && setShowSearchModal(false);


    }, [showCategoriesNavigation]);

    // console.log(categories);
    
    return <div className={styles.CategoriesNavigation + ' ' + (showCategoriesNavigation && styles.showCategoriesNavigation)} style={{
		transform: showCategoriesNavigation ? 'translateY(0px)' : 'translateY(100%)',
		}}>
        <SearchModal showSearchModal={showSearchModal} />
        <div className={styles.categoriesInner}>
            <div className={styles.categories}>
                <div className={styles.categorySectionTitle}><p>Shop by Category</p></div>
                    {categories?.categories?.items[0]?.children?.length > 0 && categories?.categories?.items[0]?.children.map((category:any) => {
                        return <Link className={styles.categoryLink} key={category.uid} href={category.url_key}><div className={styles.category} >
                            { category.image && <LazyLoadImage
                                    className={styles.categoryImage}
                                    alt={ category.name }
                                    src={ category.image }
                                />}
                            
                                <p className={styles.categoryName}>{ category.name }</p>
                            </div></Link>
                    })}
            </div>
            
            <div className={styles.categories}>
                <div className={styles.categorySectionTitle}><p>Shop by Brand</p></div>
                    {brandCategories?.categories?.items[0]?.children?.length > 0 && brandCategories?.categories?.items[0]?.children.map((category:any) => {
                        return <Link key={category.uid} href={category.url_key}><div className={styles.category} >
                            { category.image && <LazyLoadImage
                                    className={styles.categoryImage}
                                    alt={ category.name }
                                    src={ category.image }
                                />}
                            
                                <p className={styles.categoryName}>{ category.name }</p>
                            </div></Link>
                    })}
            </div>
        </div>

    </div>
}

export default CategoriesNavigation