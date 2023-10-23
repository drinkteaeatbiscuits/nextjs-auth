import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = (props: any) => {
	const { breadcrumbs, category, url, isProductPage } = props;

	const [loadedBreadcrumbs, setLoadedBreadcrumbs] = useState<any>(null);
	const [loadedCategory, setLoadedCategory] = useState<any>(null);

	useEffect(() => {

		// console.log('breadcrumbs change');
		// console.log(breadcrumbs);

		breadcrumbs && setLoadedBreadcrumbs(breadcrumbs);
		category && setLoadedCategory(category);

	}, [ url, breadcrumbs, category ]);

	return <div className={styles.breadcrumbs}>

		{ loadedBreadcrumbs && loadedBreadcrumbs.map((breadcrumb: any, index:any) => {

		
			if(breadcrumb.currentCategory && !isProductPage){

				return <div key={breadcrumb.category_uid} className={styles.currentCategory}>{ breadcrumb.category_name }</div>

			}else if(breadcrumb.currentCategory && isProductPage){

				return <Fragment key={breadcrumb.category_uid || breadcrumb.id}><Link href={ breadcrumb.category_url_key || breadcrumb.url_key } >
				{ breadcrumb.category_name || breadcrumb.name }
				</Link>
				</Fragment>

			}else{

				return <Fragment key={breadcrumb.category_uid || breadcrumb.id}><Link href={ breadcrumb.category_url_key || breadcrumb.url_key } >
				{ breadcrumb.category_name || breadcrumb.name }
				</Link>
				{ ( index + 1 ) !== loadedBreadcrumbs.length && <div className={styles.divider}>/</div> }
				</Fragment>
			}
			
			
		})
		}
		
		{/* <div className={styles.currentCategory}>{ loadedCategory }</div> */}
	</div>
}

export default Breadcrumbs;