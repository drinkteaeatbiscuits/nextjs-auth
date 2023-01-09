import Link from "next/link";

const Breadcrumbs = (props: any) => {
	const { breadcrumbs, category } = props;

	// console.log(breadcrumbs);
	return <div style={{display: 'flex', gap: '8px'}}>
		{ breadcrumbs && breadcrumbs.map((breadcrumb: any) => {
			return <Link href={breadcrumb.category_url_key} key={breadcrumb.category_id}>
				{ breadcrumb.category_name }
			</Link>
		
		})
		}
		<div>{ category }</div>
	</div>
}

export default Breadcrumbs;