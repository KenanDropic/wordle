import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type pwdFN = (value: React.SetStateAction<boolean>) => void;

type Inputs = {
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

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <div className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Login</header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <input
                {...register("email", {
                  required: "Field is required",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
                className={`fa-solid ${showPwd ? "fa-eye" : "fa-eye-slash"}`}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
