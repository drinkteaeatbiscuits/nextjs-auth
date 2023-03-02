import { useReactiveVar } from '@apollo/client';
import Cookies from 'js-cookie';
import style from './NavigationMenu.module.scss';
import Link from 'next/link';
import authenticatedVar from '../../constants/authenticated';

const NavigationMenu = (props:any) => {

	const {showMenu, setShowMenu} = props;

	const authenticated = useReactiveVar(authenticatedVar);
	// console.log(data);
	// console.log(showBasket);
	const handleLogout = () => {	
		Cookies.remove('customerToken');
		authenticatedVar(false);
		console.log('logout');
	}

	return <div className={style.navigationMenu} style={{
		transform: showMenu ? 'translateX(0px)' : 'translateX(-100%)'}}>
		
		<div className={style.closeWrap}>
			<div className={style.close} style={{cursor: 'pointer'}} onClick={() => { setShowMenu(false) }}>Close</div>
		</div>
		
		<nav style={{display: 'flex', gap: '0.5em', flexDirection: 'column'}}>
			{ authenticated && <Link href="/">Home</Link> }
			{ authenticated && <Link href="/shop">Shop</Link> }
			{ authenticated && <Link href="/basket">Basket</Link> }
			
			{ authenticated && <a href="#" onClick={() => handleLogout()}>Logout</a>}
			{ !authenticated && <Link href="/login">Login</Link>}
			{ !authenticated && <Link href="/signup">Signup</Link>}	
		</nav> 
	</div>
}

export default NavigationMenu;