import Link from "next/link";

const Categories = (props: any) => {

	const {categories} = props;

	// console.log(categories);

	return <div className="categories">
				
		{ categories && categories?.categoryList[0].children?.map((category: any) => (
			<div key={category.id}>
			<Link href={category.url_key}>{category.name}</Link>
				
			</div>
		))} 
		
	</div>

}

export default Categories;