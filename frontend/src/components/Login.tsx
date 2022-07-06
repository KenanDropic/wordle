import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../features/authApiSlice";
import { setCredentials } from "../features/authSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import Logout from "./Logout";

type pwdFN = (value: React.SetStateAction<boolean>) => void;

export type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({});

  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onSubmit = async (data: Inputs) => {
    const access_token = await login({
      email: data.email,
      password: data.password,
    }).unwrap();
    // console.log("Data & access_token:", data, access_token);
    dispatch(setCredentials(access_token));
  };

  return (
    <>
      {error && console.log(error)}
      <div className="container forms">
        <div className="form login">
          <div className="form-content">
            <header>{user ? "Logout" : "Login"}</header>
            <Link to="/">Vratite se nazad</Link>
            {user ? (
              <Logout />
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
    </>
  );
};

export default Login;
