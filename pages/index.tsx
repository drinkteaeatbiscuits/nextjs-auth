import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";

import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../components/Header/Header";
import authenticatedVar from "../constants/authenticated";
import styles from "../styles/Home.module.scss";
import Notifications from "../components/Notifications/Notifications";
import ChildCategoriesCarousel from "../components/ChildCategoriesCarousel/ChildCategoriesCarousel";
import useGetCategories from "../hooks/useGetCategories";
import { useEffect } from "react";
import BottomNavigationBar from "../components/BottomNavigationBar/BottomNavigationBar";
import SearchModal from "../components/SearchModal/SearchModal";
import Head from "../components/Head/Head";
import globalStyles from '../styles/globalStyles.module.scss';

const Home: NextPage = () => {

  const router = useRouter();
	const authenticated = useReactiveVar(authenticatedVar);

  const [getCategories, { data: categories }] = useGetCategories( ['shop'] );
  const [getBrandCategories, { data: brandCategories }] = useGetCategories( ['brands'] );
  
  useEffect(() => {
		
		!categories && getCategories();
		!brandCategories && getBrandCategories();

	}, []);

  // console.log(categories);
  
  return <>
    <Head title={ 'Top Gift'}/>
    <BottomNavigationBar />
    <div className={styles.container}>
      {/* <Head>
        <title>Top Gift Store</title>
        <meta name="description" content="Top Gift Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <SearchModal showSearchModal={true} />

      
      
      {/* <Header /> */}
      <Notifications />

      <main className={globalStyles.main}>
        <h1>Home</h1>
        { authenticated && <Link href="/shop">See All Products</Link> }

        <h2>Shop By Category</h2>
        {categories && <ChildCategoriesCarousel categories={ categories?.categories?.items[0].children } />}
        
        <h2>Shop By Brand</h2>
        {brandCategories && <ChildCategoriesCarousel categories={ brandCategories?.categories?.items[0].children } />}


      </main>

    </div>
    
  </>;
};

export default Home;
