import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.scss";
import { loginUser } from "@store/authSlice";
import type { LoginRequest } from "models/auth";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.authSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  const onSubmit = (data: LoginForm) => {
    const loginRequest: LoginRequest = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginUser(loginRequest));

    if (status === "SUCCESS") {
      navigate("/");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["login-form"]}>
        <h2>Login</h2>

        <div className={styles["form-group"]}>
          <label>Email</label>
          <input {...register("email", { required: true })} type="email" defaultValue="alice@example.com" />
          {errors.email && <span className={styles.error}>Email is required</span>}
        </div>

        <div className={styles["form-group"]}>
          <label>Password</label>
          <input {...register("password", { required: true })} type="password" defaultValue="user" />
          {errors.password && <span className={styles.error}>Password is required</span>}
        </div>

        <div className={styles["form-actions"]}>
          <button type="submit">Login</button>
        </div>
        {error && <span className={styles["error"]}>Wrong Credentials</span>}
      </form>
    </div>
  );
};

export default LoginPage;
