import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required().min(3).max(15),
  email: yup
    .string()
    .required()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
      "Password ust contain at least 6 characters,uppercase,lowercase letter,special character and number"
    ),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
      "Password ust contain at least 6 characters,uppercase,lowercase letter,special character and number"
    ),
});
