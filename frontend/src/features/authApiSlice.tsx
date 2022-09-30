import { apiSlice } from "../app/api/apiSlice";
import { setCredentials, setUser } from "./authSlice";
import { ResponseMessage, UserPayload } from "./interfaces";
import { RegisterInputs, LoginInputs } from "../pages/interfaces";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string }, LoginInputs>({
      query: (data: {}): string | object | any => ({
        url: "/auth/login",
        method: "POST",
        body: { ...data },
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          localStorage.setItem("logged_in", "true");
          const { data } = await queryFulfilled;
          // set access token
          dispatch(setCredentials(data));
        } catch (error) {}
      },
    }),
    registerUser: builder.mutation<ResponseMessage, RegisterInputs>({
      query: (data: RegisterInputs): string | object | any => ({
        url: "/auth/register",
        method: "POST",
        body: { ...data },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),
    getMe: builder.query<UserPayload, void>({
      query: (): string | object | any => ({
        url: "/auth/me",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query: (): string | object | any => ({
        url: "/auth/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useLazyGetMeQuery,
  useGetMeQuery,
  useLogoutUserMutation,
} = authApiSlice;
