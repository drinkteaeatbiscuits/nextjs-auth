import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import client from "../constants/apollo-client";
import authenticatedVar from "../constants/authenticated";
// import { authToken } from "../constants/authenticated";
import useGetMe from "../hooks/useGetMe";
import Cookies from "js-cookie";
import Error from './Error/Error';

interface GuardProps {
  children: JSX.Element;
  excludedRoutes?: string[];
}

const Guard = ({ children, excludedRoutes }: GuardProps) => {
  const [getMe, { loading, error, data: customer, refetch }] = useGetMe();
  const authenticated = useReactiveVar(authenticatedVar);
  const router = useRouter();

  const token = Cookies.get('customerToken');


  useEffect(() => {

    !token && router.push("/login");
    token === 'undefined' && router.push("/login");
    
    !customer && token && getMe();    

  }, [router.pathname]);

  useEffect(() => {

    // customer && customer?.customer && excludedRoutes?.includes(router.pathname) && router.push("/");
    customer && customer?.customer && authenticatedVar(true);
    customer && !customer?.customer && authenticatedVar(false);

    customer && !customer?.customer && Cookies.remove('customerToken');

    // console.log(customer);

  }, [customer]);

  useEffect(() => {

    !token && router.push("/login");
    customer && customer?.customer && authenticatedVar(true);

  }, [token]);



  return (
    <>
      {excludedRoutes?.includes(router.pathname) ? (
        children
      ) : (
        <>{!error && customer && children}</>
      )}
      { !excludedRoutes?.includes(router.pathname) && error && <Error error={error} /> }
    </>
  );
};

export default Guard;
