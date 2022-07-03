import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
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
      <div className="form signup">
        <div className="form-content">
          <header>Signup</header>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* USERNAME */}
            <div className="field">
              <input
                {...register("username", {
                  required: "Field is required",
                  minLength: {
                    value: 3,
                    message: "Username must contain at least 3 characters",
                  },
                  maxLength: {
                    value: 18,
                    message: "Username must contain less than 18 characters",
                  },
                })}
                type="text"
                placeholder="Username"
              />
            </div>
            <span className="error">{errors.username?.message}</span>
            {/* EMAIL */}
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
            {/* PASSWORD */}
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

            <div className="field button-field">
              <button type="submit">Signup</button>
            </div>
          </form>

          <div className="form-link">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="link login-link">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
