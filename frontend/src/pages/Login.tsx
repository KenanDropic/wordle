import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import {
  useLazyGetMeQuery,
  useLoginMutation,
  useLogoutUserMutation,
} from "../features/authApiSlice";
import { logOut, setUser } from "../features/authSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { User } from "../features/interfaces";
import useLocalStorage from "../utils/useLocalStorage";
import { LoginInputs } from "./interfaces";
import Logout from "./Logout";

type pwdFN = (value: React.SetStateAction<boolean>) => void;

const Login: React.FC = () => {
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [logged, setLogged] = useLocalStorage("logged_in", "");
  const [theme, setTheme] = useLocalStorage("theme", "");
  const effectRan = useRef<boolean>(false);

  // use form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({});

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { lightTheme } = useAppSelector((state) => state.global);

  const [login, { error, isSuccess }] = useLoginMutation();
  const [logoutUser] = useLogoutUserMutation();
  const [getMe] = useLazyGetMeQuery();

  const navigate: NavigateFunction = useNavigate();

  // get logged user
  const getCurrentUser: () => Promise<void> = async () => {
    await getMe().unwrap();
  };

  const onSubmit = async (data: LoginInputs) => {
    await login({
      email: data.email,
      password: data.password,
    }).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (effectRan.current === false && logged) {
      getCurrentUser();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  // add loader?!
  return (
    <>
      {error && console.log(error)}
      <div className={`${!lightTheme ? "dark-mode" : "light-mode"}`}>
        <div className={`container forms `}>
          <div className="form login">
            <div className="form-content">
              <header>{user ? "Logout" : "Login"}</header>
              <Link to="/">Vratite se nazad</Link>
              {user ? (
                <Logout<{ user: User | null }> values={{ user }}>
                  {() => (
                    <div className="logout-container">
                      <div>
                        <span>Prijavljeni ste kao:</span>{" "}
                        <strong>{user.username}</strong>
                      </div>
                      <button
                        onClick={async () => {
                          await logoutUser().unwrap();
                          dispatch(logOut());
                        }}
                      >
                        Odjavite se
                      </button>
                    </div>
                  )}
                </Logout>
              ) : (
                <>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                      <i className="fa-solid fa-envelope"></i>
                      <input
                        {...register("email", {
                          required: "Field is required",
                          pattern: {
                            value:
                              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Please add valid email",
                          },
                        })}
                        type="email"
                        placeholder="Email"
                        className="input"
                      />
                    </div>
                    <span className="error">{errors.email?.message}</span>

                    <div className="field toggle-password">
                      <i className="fa-solid fa-lock"></i>
                      <input
                        {...register("password", {
                          required: "Field is required",
                          pattern: {
                            value:
                              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                            message:
                              "Password must contain at least 6 characters,uppercase and lowercase letter,special character and one number",
                          },
                        })}
                        type={showPwd ? "text" : "password"}
                        placeholder="Password"
                        className="password"
                      />

                      <i
                        className={`fa-solid ${
                          showPwd ? "fa-eye" : "fa-eye-slash"
                        }`}
                        onClick={() => setShowPwd(!showPwd)}
                      />
                    </div>
                    <span className="error">{errors.password?.message}</span>

                    <div className="form-link">
                      <Link to="" className="forgot-pass">
                        Forgot password?
                      </Link>
                    </div>

                    <div className="field button-field">
                      <button type="submit">Login</button>
                    </div>
                  </form>

                  <div className="form-link">
                    <span>
                      Don't have an account?{" "}
                      <Link to="/register" className="link signup-link">
                        Signup
                      </Link>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
