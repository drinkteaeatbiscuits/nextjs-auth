import { NextPage } from "next";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Shop: NextPage = () => {

	return <div className={styles.container}>
		<Header />
		<main>
			<h1>Shop Page</h1>
		</main>
	</div>
}

export default Shop;