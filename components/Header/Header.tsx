import { useReactiveVar } from "@apollo/client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import authenticatedVar from "../../constants/authenticated";
import useGetBasket from "../../hooks/useGetBasket";
import Cart from "../Cart/Cart";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import SearchModal from "../SearchModal/SearchModal";
import styles from './Header.module.scss';
import cartId from "../../constants/cartId";


const Header = () => {

	const { data: cartData, error, refetch, loading: cartLoading } = useGetBasket();
	
	const router = useRouter();
	// console.log(authenticated);

	const [showBasket, setShowBasket] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [showSearchModal, setShowSearchModal] = useState(false);

	const toggleBasket = () => {
		
		setShowBasket(!showBasket);

	}

	useEffect(() => {
		
		cartData?.customerCart?.id && cartId(cartData.customerCart.id);
		
	}, [cartData?.customerCart?.id]);

	


	const logo = <svg className={styles.logo} onClick={() => router.push('/')} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="44" height="45.651" viewBox="0 0 44 45.651">
	<path d="M4.643,14.95c1.459,1.428,3.59.83,5.216.054A24.831,24.831,0,0,0,17.447,7.73c1.154-1.8,2.714-4.09,2-6.329C18.848.174,17.385-.045,16.161.007a13.161,13.161,0,0,0-4.82,1.574A17.832,17.832,0,0,0,6.859,5.229,13.994,13.994,0,0,0,4.1,10.295a5.665,5.665,0,0,0,.545,4.655" transform="translate(3.621 0.001)" fill="#2e2e2d" fillRule="evenodd"/>
	<path d="M4.643,16.244c1.459-1.43,3.59-.834,5.216-.056a24.9,24.9,0,0,1,7.588,7.268c1.154,1.8,2.714,4.1,2,6.335-.6,1.228-2.061,1.444-3.285,1.4a13.2,13.2,0,0,1-4.82-1.576,17.909,17.909,0,0,1-4.482-3.646A14.042,14.042,0,0,1,4.1,20.9a5.664,5.664,0,0,1,.545-4.655" transform="translate(3.621 14.458)" fill="#2e2e2d" fillRule="evenodd"/>
	<path d="M40.6,9.06a14.158,14.158,0,0,0-7.984-5.278,11.116,11.116,0,0,0-9.081,2.994C19.993,10.5,17.16,16.225,11.663,17.228c-3.4-.179-4.734-3.8-5.767-6.523-.452-1.036-1.3-1.64-2.352-.982A8.932,8.932,0,0,0,1.079,13.53,18.467,18.467,0,0,0,0,19.473a18.22,18.22,0,0,0,.937,5.968,8.431,8.431,0,0,0,2.385,3.817c1.108.669,1.94-.1,2.39-1.139,1.069-2.811,2.427-6.6,5.924-6.878,5.578.894,8.44,6.851,11.925,10.65a11.394,11.394,0,0,0,9.317,3.273,13.768,13.768,0,0,0,8.033-5.433A18.38,18.38,0,0,0,44,19.314,18.571,18.571,0,0,0,40.6,9.06M26.341,17.55V24.9a1.88,1.88,0,0,1-1.378-.578,1.9,1.9,0,0,1-.578-1.383V17.55H22.53a1.835,1.835,0,0,1-1.845-1.857h9.364a1.806,1.806,0,0,1-.539,1.316,1.778,1.778,0,0,1-1.31.541ZM38.014,24.9a1.84,1.84,0,0,1-1.744-1.063A4.48,4.48,0,0,1,33.315,24.9a4.585,4.585,0,0,1-3.32-1.358,4.638,4.638,0,0,1,0-6.616,4.561,4.561,0,0,1,3.32-1.374h2.744a1.855,1.855,0,0,1-1.853,1.861h-.891a2.6,2.6,0,0,0-1.95.834,2.762,2.762,0,0,0-.8,1.991,2.724,2.724,0,0,0,.8,1.981,2.709,2.709,0,0,0,3.9-.006,2.781,2.781,0,0,0,.8-2,1.9,1.9,0,0,1,.574-1.385,1.881,1.881,0,0,1,1.381-.578Z" transform="translate(0 3.466)" fill="#a3ba00" fillRule="evenodd"/>  
  </svg>;
  
	

	return <>
		<header className={styles.header}>

	
				<div className={styles.headerLeft}>
					<div className={styles.menuIconWrap} onClick={() => setShowMenu(!showMenu)}>
						<svg className={styles.menuIcon} xmlns="http://www.w3.org/2000/svg" width="35" height="21.001" viewBox="0 0 35 21.001">
  							<path d="M314,16V13h35v3Zm0-9V4h35V7Zm0-9V-5h35v3Z" transform="translate(-314 5)" fill="#d6d7dd"/>
						</svg>
					</div>
				</div>
				<div className={styles.headerCenter}>{ logo }</div>
				<div className={styles.headerRight}>
					<div className={styles.searchIconWrap}  onClick={() => setShowSearchModal(!showSearchModal)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="28.742" height="28.742" viewBox="0 0 28.742 28.742">
							<path d="M20.509,18.039l8.233,8.233-2.47,2.47-8.159-8.233V19.236l-.524-.449a10.422,10.422,0,0,1-6.961,2.545,10.245,10.245,0,0,1-7.522-3.106A10.245,10.245,0,0,1,0,10.7a10.369,10.369,0,0,1,3.106-7.56A10.1,10.1,0,0,1,10.554,0a10.184,10.184,0,0,1,7.522,3.144,10.369,10.369,0,0,1,3.106,7.56,10.422,10.422,0,0,1-2.545,6.961l.524.374Zm-15.119-2.1a7.27,7.27,0,0,0,5.239,2.1,7.2,7.2,0,0,0,5.239-2.133,7.017,7.017,0,0,0,2.171-5.2,7.139,7.139,0,0,0-2.171-5.239,7.139,7.139,0,0,0-5.239-2.171,7.017,7.017,0,0,0-5.2,2.171A7.2,7.2,0,0,0,3.293,10.7,7.27,7.27,0,0,0,5.389,15.943Zm23.353,12.8" fill="#d6d7dd"/>
						</svg>
					</div>
					<div className={styles.basketWrap} onClick={() => toggleBasket()}>
						<svg xmlns="http://www.w3.org/2000/svg" width="21.207" height="26.416" viewBox="0 0 21.207 26.416">
							<path d="M18.541,5.271H15.874a5.271,5.271,0,0,0-10.542,0H2.666A2.686,2.686,0,0,0,0,7.937V23.812a2.674,2.674,0,0,0,2.666,2.6H18.541a2.674,2.674,0,0,0,2.666-2.6V7.937A2.686,2.686,0,0,0,18.541,5.271ZM10.6,2.6A2.728,2.728,0,0,1,13.27,5.271H7.937A2.728,2.728,0,0,1,10.6,2.6Zm7.937,21.207H2.666V7.937H5.333v2.6a1.3,1.3,0,1,0,2.6,0v-2.6H13.27v2.6a1.3,1.3,0,1,0,2.6,0v-2.6h2.666Z" fill="#d6d7dd"/>
						</svg>
						{cartData?.customerCart?.total_quantity && <div className={styles.basketQuantity} style={{
							}}>{ cartData?.customerCart?.total_quantity }</div>}
					</div>
				</div>
	
		</header>
		<Cart showBasket={showBasket} setShowBasket={setShowBasket} cartData={cartData} cartLoading={cartLoading} />
		<NavigationMenu showMenu={showMenu} setShowMenu={setShowMenu} />
		<SearchModal showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal} />
	</>
}

export default Header;