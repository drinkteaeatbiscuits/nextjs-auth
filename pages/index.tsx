import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Top Gift Store</title>
        <meta name="description" content="Top Gift Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
       <h1>Home</h1>
      </main>

    </div>
  );
};

export default Home;
