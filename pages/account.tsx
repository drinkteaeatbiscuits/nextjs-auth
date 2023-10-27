import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import authenticatedVar from "../constants/authenticated";
import styles from "../styles/Home.module.scss";
import Notifications from "../components/Notifications/Notifications";
import BottomNavigationBar from "../components/BottomNavigationBar/BottomNavigationBar";

const Account: NextPage = () => {

  const router = useRouter();
	const authenticated = useReactiveVar(authenticatedVar);
  
  return <>
    <BottomNavigationBar />
    <div className={styles.container}>
      <Notifications />

      <main style={{padding: '70px 0 0'}}>
        <h1>My Account</h1>
     

      </main>

    </div>
    
  </>;
};

export default Account;
