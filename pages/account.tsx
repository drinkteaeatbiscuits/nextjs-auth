import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import authenticatedVar from "../constants/authenticated";
import styles from "../styles/Home.module.scss";
import Notifications from "../components/Notifications/Notifications";
import BottomNavigationBar from "../components/BottomNavigationBar/BottomNavigationBar";
import Head from "../components/Head/Head";

import globalStyles from '../styles/globalStyles.module.scss';
import useLogout from "../hooks/useLogout";

const Account: NextPage = () => {

  const router = useRouter();
	const authenticated = useReactiveVar(authenticatedVar);
  const {logout} = useLogout();
  
  return <>
    <Head title={ 'Account | Top Gift'}/>
    <BottomNavigationBar />
    <div className={styles.container}>
      <Notifications />

      <main className={globalStyles.main}>
        <h1>My Account</h1>

        <p onClick={() => logout()}>Logout</p>
     
     

      </main>

    </div>
    
  </>;
};

export default Account;
