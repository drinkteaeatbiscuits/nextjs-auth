import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import client from "../constants/apollo-client";
import authenticatedVar from "../constants/authenticated";
// import { authToken } from "../constants/authenticated";
import useGetMe from "../hooks/useGetMe";
import Cookies from "js-cookie";

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
    
    !customer && getMe();

    customer && customer?.customer && excludedRoutes?.includes(router.pathname) && router.push("/");
    customer && customer?.customer && authenticatedVar(true);

  }, [router.pathname]);


  useEffect(() => {

    customer && customer?.customer && excludedRoutes?.includes(router.pathname) && router.push("/");
    customer && customer?.customer && authenticatedVar(true);
    customer && !customer?.customer && authenticatedVar(false);

    customer && !customer?.customer && router.push("/login");

  }, [customer]);

  // customer && console.log(customer?.customer);
  // customer && console.log(customer);



  // useEffect(() => {

  //   if (!loading && !authenticated && !excludedRoutes?.includes(router.pathname)) {

  //     router.push("/login");
  //     client.resetStore();
  //   }

  //   if (customer && authenticated && excludedRoutes?.includes(router.pathname)){
  //     router.push("/");
  //   }

  // }, [authenticated, router, excludedRoutes, customer]);

  // useEffect(() => {

  //   !customer && console.log('get customer');
    
  //   !customer && getMe();

  // }, [customer]);

  // console.log(customer);

  return (
    <>
      {excludedRoutes?.includes(router.pathname) ? (
        children
      ) : (
        <>{!error && customer && children}</>
      )}
    </>
  );
};

export default Guard;
