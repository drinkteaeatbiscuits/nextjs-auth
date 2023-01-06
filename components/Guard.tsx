import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import client from "../constants/apollo-client";
import authenticatedVar from "../constants/authenticated";
// import { authToken } from "../constants/authenticated";
import useGetMe from "../hooks/useGetMe";

interface GuardProps {
  children: JSX.Element;
  excludedRoutes?: string[];
}

const Guard = ({ children, excludedRoutes }: GuardProps) => {
  const { loading, error, data: customer, refetch } = useGetMe();
  const authenticated = useReactiveVar(authenticatedVar);
  const router = useRouter();

  useEffect(() => {
    
    if (!excludedRoutes?.includes(router.pathname)) {
      refetch();
    }

  }, [router.pathname, refetch, excludedRoutes]);


  useEffect(() => {

    if (!authenticated && !excludedRoutes?.includes(router.pathname)) {
      router.push("/login");
      client.resetStore();
    }

    if (customer && authenticated && excludedRoutes?.includes(router.pathname)){
      router.push("/");
    }

  }, [authenticated, router, excludedRoutes, customer]);

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
