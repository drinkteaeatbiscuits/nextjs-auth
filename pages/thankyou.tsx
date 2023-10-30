import { NextPage } from "next";
import Header from "../components/Header/Header";
import homeStyles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import useGetOrder from "../hooks/useGetOrder";
import { FormattedNumber, IntlProvider } from "react-intl";
import { useEffect } from "react";
import Notifications from "../components/Notifications/Notifications";
import BottomNavigationBar from "../components/BottomNavigationBar/BottomNavigationBar";
import Head from "../components/Head/Head";
import globalStyles from '../styles/globalStyles.module.scss';


const Thankyou: NextPage = (props:any) => {

	const router = useRouter();

	const [getOrder, {data: order, loading}] = useGetOrder({
		filter: {
		  number: {
			eq: router?.query?.order_number
		  }
		}
	  });

	const displayPrice = (price:any) => price?.value && price?.currency && <IntlProvider locale="en" defaultLocale="en"><FormattedNumber value={price?.value} style="currency" currency={price?.currency} /></IntlProvider>
   
	
	useEffect(() => {

		router?.query?.order_number && !order && getOrder();
	
	}, [router]);
	
	//   !loading && console.log(order?.customer?.orders?.items[0]);

	return <>
	<Head title={ 'Thankyou | Top Gift'}/>
	<BottomNavigationBar />
	<div className={homeStyles.container}>
		
		<Notifications />

		<main className={globalStyles.main}>
        <h1>Thankyou</h1>
		<p>Order Number: {router?.query?.order_number}</p>

		{!loading && order && <div className=""><h3>Order Summary</h3>
            
            { order.customer.orders.items[0].total.subtotal && <div className="row">Subtotal { displayPrice(order.customer.orders.items[0].total.subtotal) }</div> }  
            { order.customer.orders.items[0].total.shipping_handling.total_amount && <div className="row">Shipping { displayPrice(order.customer.orders.items[0].total.shipping_handling.total_amount) }</div> } 
            { order.customer.orders.items[0].total.total_tax && <div className="row">Tax { displayPrice(order.customer.orders.items[0].total.total_tax) }</div>  }
            { order.customer.orders.items[0].total.grand_total && <div className="row">Total { displayPrice(order.customer.orders.items[0].total.grand_total) }</div> }  
      
			</div>}
        
      </main>
	</div></>
}

export default Thankyou;