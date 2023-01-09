import { useReactiveVar } from "@apollo/client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import authenticatedVar from "../constants/authenticated";
import Cart from "./Cart";

const Header = () => {
	
	const router = useRouter();
	const authenticated = useReactiveVar(authenticatedVar);
	// console.log(authenticated);

	const handleLogout = () => {	
		Cookies.remove('customerToken');
		authenticatedVar(false);
		console.log('logout');
	}

	const [showBasket, setShowBasket] = useState(false);

	const toggleBasket = () => {
		
		setShowBasket(!showBasket);

	}

	

	return <>
		<header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
			<p>Top Gift</p>
			<nav style={{display: 'flex', gap: '1em'}}>
				{ authenticated && <Link href="/">Home</Link> }
				{ authenticated && <Link href="/shop">Shop</Link> }
				{ authenticated && <div style={{cursor: 'pointer'}} onClick={() => toggleBasket()}>Basket</div> }
				{/* { authenticated && <Link href="/basket">Basket</Link>} */}
				{ authenticated && <a href="#" onClick={() => handleLogout()}>Logout</a>}
				{ !authenticated && <Link href="/login">Login</Link>}
				{ !authenticated && <Link href="/signup">Signup</Link>}
			</nav>
		</header>
		<Cart showBasket={showBasket} setShowBasket={setShowBasket} />
	</>
}

export default Header;