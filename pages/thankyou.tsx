import { NextPage } from "next";
import Header from "../components/Header/Header";
import homeStyles from "../styles/Home.module.scss";
import { useRouter } from "next/router";


const Thankyou: NextPage = (props:any) => {
	
	const router = useRouter();
    console.log(props);

	return <div className={homeStyles.container}>
		<Header />

		<main style={{padding: '70px 0 0'}}>
        <h1>Thankyou</h1>
		{/* <p>Order Number: {router.query.order_number}</p> */}
		
        
      </main>
	</div>
}

export default Thankyou;