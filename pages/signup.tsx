import { useRouter } from "next/router";
import { useCreateUser } from "../hooks/useCreateUser";
import { useLogin } from "../hooks/useLogin";
import styles from "../styles/Auth.module.scss";

const Signup = () => {
  const [createUser] = useCreateUser();
  const { login } = useLogin();
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    // event.preventDefault();
    // const data = {
    //   email: event.target.email.value,
    //   password: event.target.password.value,
    // };
    // console.log(data);
    // await createUser({
    //   variables: {
    //     createUserData: data,
    //   },
    // });
    // await login(data);
    // router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Signup;
