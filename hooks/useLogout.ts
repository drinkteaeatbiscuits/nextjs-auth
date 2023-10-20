import Cookies from "js-cookie";
import authenticatedVar from "../constants/authenticated";
import client from "../constants/apollo-client";

const useLogout = () => {

    const logout = () => {

        console.log('logout');

        Cookies.remove('customerToken');
		authenticatedVar(false);

        client.resetStore();
        
		// console.log('logout');
    
    }

    return { logout };
}

export default useLogout;