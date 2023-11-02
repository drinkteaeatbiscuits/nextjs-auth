import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import authenticatedVar from "../constants/authenticated";
import styles from "../styles/Home.module.scss";
import Notifications from "../components/Notifications/Notifications";
import BottomNavigationBar from "../components/BottomNavigationBar/BottomNavigationBar";
import Head from "../components/Head/Head";

import globalStyles from '../styles/globalStyles.module.scss';

const Favourites: NextPage = () => {

  const router = useRouter();
	const authenticated = useReactiveVar(authenticatedVar);
  
  return <>
    <Head title={ 'Components | Top Gift'}/>
    <BottomNavigationBar />
    <div className={styles.container}>
      <Notifications />

      <main className={globalStyles.main}>
        <h1>Favourites</h1>
     
        <Favourites />
      </main>

    </div>
    
  </>;
};

export default Favourites;
