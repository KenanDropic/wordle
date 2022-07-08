import { useCookies } from "react-cookie";
import { apiSlice } from "../app/api/apiSlice";
import { Inputs } from "../components/Login";
import { setUser, User } from "./authSlice";

export interface UserPayload {
  success: boolean;
  user: User;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string }, Inputs>({
      query: (data: {}): string | object | any => ({
        url: "/login",
        method: "POST",
        body: { ...data },
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          // console.log("LOGIN METHOD");
          localStorage.setItem("logged_in", "true");
          await queryFulfilled;
          // const res = await dispatch(authApiSlice.endpoints.getMe.initiate({}));
          // console.log(res);
        } catch (error) {}
      },
    }),
    getMe: builder.query<UserPayload, any>({
      query: (): string | object | any => ({
        url: "/me",
        method: "GET",
        credentials: "include",
      }),
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log("OnQueryStarted:", data);
      //     dispatch(setUser(data.user));
      //   } catch (error) {}
      // },
    }),
    logoutUser: builder.mutation<void, void>({
      query: (): string | object | any => ({
        url: "/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyGetMeQuery, useLogoutUserMutation } =
  authApiSlice;
