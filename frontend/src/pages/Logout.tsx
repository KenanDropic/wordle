interface Props<T> {
  values: T;
  children: (user: T) => JSX.Element;
}

const Logout = <T extends {}>({ values, children }: Props<T>) => {
  return children(values);
};

export default Logout;
