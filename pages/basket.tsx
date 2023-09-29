import { NextPage } from "next";
import Cart from "../components/Cart/Cart";
import Header from "../components/Header/Header";
import useGetBasket from "../hooks/useGetBasket";
import styles from "../styles/Home.module.scss";

const Basket: NextPage = () => {

	// const {data, error, refetch, loading} = useGetBasket();

	// console.log(data);

	return <div className={styles.container}>
		<Header />
		<main>
			

			Basket

		</main>
	</div>
}

export default Basket;