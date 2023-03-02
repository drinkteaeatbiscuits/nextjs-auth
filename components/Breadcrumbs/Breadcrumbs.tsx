import Link from "next/link";
import { Fragment } from "react";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = (props: any) => {
	const { breadcrumbs, category } = props;

	return <div className={styles.breadcrumbs}>

		{ breadcrumbs && breadcrumbs.map((breadcrumb: any) => {
			
			return <Fragment key={breadcrumb.category_id || breadcrumb.id}><Link href={ breadcrumb.category_url_key || breadcrumb.url_key } >
				{ breadcrumb.category_name || breadcrumb.name }
			</Link>
			<div className={styles.divider}>/</div>
			</Fragment>
		})
		}
		
		<div className={styles.currentCategory}>{ category }</div>
	</div>
}

export default Breadcrumbs;