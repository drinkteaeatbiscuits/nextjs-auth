import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import authenticatedVar from "../constants/authenticated";
import styles from "../styles/Home.module.scss";
import Notifications from "../components/Notifications/Notifications";
import BottomNavigationBar from "../components/BottomNavigationBar/BottomNavigationBar";
import Head from "../components/Head/Head";

import globalStyles from '../styles/globalStyles.module.scss';
import FavouriteProducts from "../components/FavouriteProducts/FavouriteProducts";


const Favourites: NextPage = () => {

  const router = useRouter();
	const authenticated = useReactiveVar(authenticatedVar);
  
  
  return <>
    <Head title={ 'Components | Top Gift'}/>
    <BottomNavigationBar />
    <div className={styles.container}>
      <Notifications />

      <main className={globalStyles.favourites}>
        <h1 className={globalStyles.pageTitle}>Favourites</h1>
     
        <FavouriteProducts />
      </main>

    </div>
    
  </>;
};

export default Favourites;
