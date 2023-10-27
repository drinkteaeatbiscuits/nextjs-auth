import { useRouter } from 'next/router';
import styles from './BottomNavigationBar.module.scss'
import { useReactiveVar } from '@apollo/client';
import authenticatedVar from '../../constants/authenticated';
import useGetBasket from '../../hooks/useGetBasket';
import { useEffect, useState } from 'react';
import cartId from '../../constants/cartId';
import Cart from '../Cart/Cart';
import CategoriesNavigation from '../CategoriesNavigation/CategoriesNavigation';


const BottomNavigationBar = (props:any) => {

    

    const router = useRouter();

    const authenticated = useReactiveVar(authenticatedVar);

    const [getBasket, { data: cartData, error, refetch, loading: cartLoading }] = useGetBasket();

    const [showBasket, setShowBasket] = useState(false);
    const [showCategoriesNavigation, setShowCategoriesNavigation] = useState(false);

    const toggleBasket = () => {
		
		setShowBasket(!showBasket);
		setShowCategoriesNavigation(false);
		// setShowMenu(false);
	}
    
    const toggleCategoriesNavigation = () => {
		
		setShowCategoriesNavigation(!showCategoriesNavigation);
        setShowBasket(false);
		// setShowMenu(false);
	}

    const goToRoute = (route:string) => {

        setShowCategoriesNavigation(false);
        setShowBasket(false);
        router.push(route)
    }

    useEffect(() => {
		
		cartData?.customerCart?.id && cartId(cartData.customerCart.id);
		
	}, [cartData?.customerCart?.id]);

	useEffect(() => {
		// console.log(authenticated);
		authenticated && getBasket();

	}, [authenticated])


    return <div className={styles.navBarWrap}>
        <div className={styles.modalArea}>
            <Cart showBasket={showBasket} setShowBasket={setShowBasket} cartData={cartData} cartLoading={cartLoading} />
            <CategoriesNavigation showCategoriesNavigation={showCategoriesNavigation} />
       </div>
         <nav className={styles.bottomNavigationBar}>
            <div onClick={() => goToRoute('/')} className={styles.navigationItem + ' ' + styles.home}>
                <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19.5" height="18" viewBox="0 0 19.5 18">
                        <path id="md_home" data-name="md home" d="M7.5,18H2.906V9H0L9.75,0,19.5,9H16.594v9H12V12H7.5Zm12,0" fill="#d6d7dd"/>
                    </svg>
                </div>
                <span>Home</span>
            </div>
            <div className={styles.navigationItem + ' ' + styles.products} onClick={() => toggleCategoriesNavigation()}>
                <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26.007" height="18.62" viewBox="0 0 26.007 18.62">
                        <path id="Union_1" data-name="Union 1" d="M-1973.411,18.378l-5.14-5.188a7.261,7.261,0,0,1-4.7,1.648,7.119,7.119,0,0,1-5.261-2.182,7.182,7.182,0,0,1-2.158-5.236,7.183,7.183,0,0,1,2.158-5.237A7.119,7.119,0,0,1-1983.255,0a7.117,7.117,0,0,1,5.261,2.182,7.183,7.183,0,0,1,2.158,5.237,7.137,7.137,0,0,1-1.6,4.606l5.188,5.236a.747.747,0,0,1-.049,1.164.721.721,0,0,1-.533.194A.794.794,0,0,1-1973.411,18.378ZM-1987.377,3.3a5.613,5.613,0,0,0-1.7,4.122,5.612,5.612,0,0,0,1.7,4.121,5.614,5.614,0,0,0,4.122,1.7,5.611,5.611,0,0,0,4.121-1.7,5.613,5.613,0,0,0,1.7-4.121,5.613,5.613,0,0,0-1.7-4.122,5.611,5.611,0,0,0-4.121-1.7A5.614,5.614,0,0,0-1987.377,3.3ZM-1998,14.642V13.288h7.326v1.354Zm0-6.206V7.081h4.138V8.436Zm0-6.207V.874h7.326V2.229Z" transform="translate(1998)" fill="#d6d7dd"/>
                    </svg>
                </div>
                <span>Products</span>
            </div>
            <div className={styles.navigationItem + ' ' + styles.basket} onClick={() => toggleBasket()}>
                <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22.031" height="18.984" viewBox="0 0 22.031 18.984">
                        <path id="shopping_basket" data-name="shopping basket" d="M9.609,14.391a1.989,1.989,0,1,0,2.813-2.812,1.989,1.989,0,1,0-2.812,2.813ZM8.016,6.984h6l-3-4.406Zm8.2,0H21a1.034,1.034,0,0,1,.727.281.917.917,0,0,1,.3.7q-.469,1.875-1.406,5.273t-1.172,4.289a1.83,1.83,0,0,1-1.922,1.453H4.5a1.83,1.83,0,0,1-1.922-1.453L.047,8.25A.653.653,0,0,1,0,7.969a.917.917,0,0,1,.3-.7,1.034,1.034,0,0,1,.727-.281H5.813L10.172.422A.946.946,0,0,1,11.016,0a.88.88,0,0,1,.844.422Z" fill="#d6d7dd"/>
                    </svg>
                </div>
                <span>Basket</span>
                { cartData?.customerCart?.total_quantity > 0 && cartData?.customerCart?.total_quantity && <div className={styles.basketQuantity} style={{
							}}>{ cartData?.customerCart?.total_quantity }</div> }
            </div>
            <div onClick={() => goToRoute('/favourites')} className={styles.navigationItem  + ' ' + styles.favourites}>
                <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19.969" height="18.328" viewBox="0 0 19.969 18.328">
                        <path id="favorite_outline" data-name="favorite outline" d="M14.484,0a5.887,5.887,0,0,0-4.5,2.109A5.887,5.887,0,0,0,5.484,0,5.432,5.432,0,0,0,0,5.484c0,3.8,3.375,6.891,8.531,11.578l1.453,1.266,1.453-1.312c5.156-4.641,8.531-7.734,8.531-11.531A5.432,5.432,0,0,0,14.484,0ZM10.078,15.563l-.094.094-.094-.094C5.109,11.25,1.969,8.391,1.969,5.484A3.414,3.414,0,0,1,5.484,2.016,3.879,3.879,0,0,1,9.047,4.359h1.875a3.879,3.879,0,0,1,3.563-2.344A3.414,3.414,0,0,1,18,5.484C18,8.391,14.859,11.25,10.078,15.563Z" fill="#d6d7dd"/>
                    </svg>
                </div>

                <span>Favourites</span>
            </div>
            <div onClick={() => goToRoute('/account')} className={styles.navigationItem  + ' ' + styles.account}>
                <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.031" height="16.031" viewBox="0 0 16.031 16.031">
                        <path id="person" d="M2.719,11.156a14.046,14.046,0,0,1,5.3-1.125,14.126,14.126,0,0,1,5.273,1.1q2.742,1.1,2.742,2.883v2.016H0V14.016Q0,12.234,2.719,11.156Zm8.109-4.312A3.836,3.836,0,0,1,8.016,8.016,3.836,3.836,0,0,1,5.2,6.844,3.836,3.836,0,0,1,4.031,4.031,3.913,3.913,0,0,1,5.2,1.2,3.8,3.8,0,0,1,8.016,0a3.8,3.8,0,0,1,2.813,1.2A3.913,3.913,0,0,1,12,4.031,3.836,3.836,0,0,1,10.828,6.844Z" fill="#d6d7dd"/>
                    </svg>
                </div>

                <span>Account</span>
            </div>
        </nav>
        
        </div>
    
}

export default BottomNavigationBar;