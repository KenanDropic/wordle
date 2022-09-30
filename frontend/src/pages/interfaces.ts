interface LoginInputs {
  email: string;
  password: string;
}

interface RegisterInputs extends LoginInputs {
  username: string;
}

export type { LoginInputs, RegisterInputs };
