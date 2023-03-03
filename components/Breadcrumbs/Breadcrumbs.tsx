import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = (props: any) => {
	const { breadcrumbs, category, url } = props;

	const [loadedBreadcrumbs, setLoadedBreadcrumbs] = useState<any>(null);
	const [loadedCategory, setLoadedCategory] = useState<any>(null);

	useEffect(() => {

		// console.log('breadcrumbs change');
		// console.log(breadcrumbs);

		breadcrumbs && setLoadedBreadcrumbs(breadcrumbs);
		category && setLoadedCategory(category);

	}, [ url, breadcrumbs, category ]);

	return <div className={styles.breadcrumbs}>

		{ loadedBreadcrumbs && loadedBreadcrumbs.map((breadcrumb: any) => {
			
			return <Fragment key={breadcrumb.category_id || breadcrumb.id}><Link href={ breadcrumb.category_url_key || breadcrumb.url_key } >
				{ breadcrumb.category_name || breadcrumb.name }
			</Link>
			<div className={styles.divider}>/</div>
			</Fragment>
		})
		}
		
		<div className={styles.currentCategory}>{ loadedCategory }</div>
	</div>
}

export default Breadcrumbs;