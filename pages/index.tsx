import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../components/Header/Header";
import authenticatedVar from "../constants/authenticated";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {

  const router = useRouter();
	const authenticated = useReactiveVar(authenticatedVar);
  
  return (
    <div className={styles.container}>
      {/* <Head>
        <title>Top Gift Store</title>
        <meta name="description" content="Top Gift Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      

      <Header />

      <main style={{padding: '70px 0 0'}}>
        <h1>Home</h1>
        { authenticated && <Link href="/shop">Shop</Link> }

        <p>Home Page Content</p>
      </main>

    </div>
  );
};

export default Home;
