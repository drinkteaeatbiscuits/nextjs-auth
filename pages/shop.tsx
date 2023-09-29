import { gql } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header/Header";
import client from "../constants/apollo-client";
import useGetCategories from "../hooks/useGetCategories";
import styles from "../styles/Home.module.scss";


const Shop: NextPage = () => {

	const { data: categories } = useGetCategories('');

	// categories && console.log(categories.categoryList[0].children[0].children);

	return <div className={styles.container}>
		<Header />
		<main style={{paddingTop: '70px'}}>
			<h1>Shop Page</h1>

			<div className="categories">
			{ categories && categories?.categoryList[0].children[0].children?.map((category: any) => (
				<div key={category.id}>
					<Link href={category.url_key}>{category.name}</Link>
				</div>
			))} 
			</div>
		</main>
	</div>
}

export default Shop;