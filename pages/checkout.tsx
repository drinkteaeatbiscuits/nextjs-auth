import { NextPage } from "next";
import Header from "../components/Header/Header";
import styles from "../styles/Home.module.scss";

const Checkout: NextPage = () => {

	// const {data, error, refetch, loading} = useGetBasket();

	// console.log(data);

	return <div className={styles.container}>
		<Header />

		<main style={{padding: '70px 0 0'}}>
        <h1>Checkout</h1>
        
      </main>
	</div>
}

export default Checkout;