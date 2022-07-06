import { apiSlice } from "../app/api/apiSlice";
import { Inputs } from "../components/Login";
import { User } from "./authSlice";

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
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   try {
      //     await queryFulfilled;
      //     await dispatch(authApiSlice.endpoints.getMe.initiate({}));
      //   } catch (error) {}
      // },
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
      //     // dispatch(setUser(data));
      //   } catch (error) {}
      // },
    }),
  }),
});

export const { useLoginMutation, useLazyGetMeQuery } = authApiSlice;
