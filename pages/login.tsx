import { useRouter } from "next/router";
import { useLogin } from "../hooks/useLogin";
import styles from "../styles/Auth.module.scss";
import Homestyles from "../styles/Home.module.scss";
import authenticatedVar from "../constants/authenticated";
import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import Header from "../components/Header/Header";
import Notifications from "../components/Notifications/Notifications";
import BottomNavigationBar from "../components/BottomNavigationBar/BottomNavigationBar";
import Head from "../components/Head/Head";

import globalStyles from '../styles/globalStyles.module.scss';

const Login = () => {

  

  const authenticated = useReactiveVar(authenticatedVar);

  const { login } = useLogin();
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    await login({variables: data});

    router.push("/");
    
  };

  return <>
    <Head title={ 'Login | Top Gift'}/>
    <div className={styles.loginContainer}>
		  {/* <Header /> */}
      <Notifications />
      <main className={globalStyles.main}>
        <h1 className={styles.title}>Login</h1>

        <form onSubmit={handleSubmit}  className={styles.container}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input className={styles.loginInput} type="email" name="email" id="email" required />
          <label className={styles.label} htmlFor="password">Password</label>
          <input className={styles.loginInput} type="password" name="password" id="password" required />
          <button className={styles.loginButton} type="submit">Login</button>
        </form>
      </main>
      

    </div>
   
    
  </>
};

export default Login;
