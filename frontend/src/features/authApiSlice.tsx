import { apiSlice } from "../app/api/apiSlice";
import { Inputs } from "../pages/Login";
import { setCredentials, setUser, User } from "./authSlice";

export interface UserPayload {
  success: boolean;
  user: User;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string }, Inputs>({
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
    getMe: builder.query<UserPayload, any>({
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
        url: "/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyGetMeQuery,
  useGetMeQuery,
  useLogoutUserMutation,
} = authApiSlice;
