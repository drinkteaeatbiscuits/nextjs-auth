import { useRouter } from "next/router";
import { useLogin } from "../hooks/useLogin";
import styles from "../styles/Auth.module.css";
import Homestyles from "../styles/Home.module.scss";
import authenticatedVar from "../constants/authenticated";
import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import Header from "../components/Header/Header";

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

  return (
    <div className={Homestyles.container}>
		  <Header />
      <main>
        <h1>Login</h1>
      {authenticated && <p>Logged in</p>}
        <form onSubmit={handleSubmit}  className={styles.container}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
        <button type="submit">Submit</button>
      </form>
      </main>
      

    </div>
   
  );
};

export default Login;
