import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../features/authSlice";
import { Mutex, MutexInterface } from "async-mutex";
import {
  BaseQueryFn,
  QueryReturnValue,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

const mutex = new Mutex();

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  fetchBaseQuery({
    // baseUrl: "http://127.0.0.1:5000/api/v1", baseUrl for development
    baseUrl: "https://wordle-f32h.onrender.com/api/v1/", // baseURL for production
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken: string = (getState() as any).auth.access_token;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  });
//   args: string,
//   api: BaseQueryApi,
//   extraOptions: { shout?: boolean }

const baseQueryWithReauth = async (
  args: string,
  api: any,
  extraOptions: { shout?: boolean }
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result: QueryReturnValue<unknown, FetchBaseQueryError, {}> =
    await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (
      (result.error as any).originalStatus === 401 ||
      result.error.status === 401
    ) {
      localStorage.setItem("logged_in", "false");
      if (!mutex.isLocked()) {
        const release: MutexInterface.Releaser = await mutex.acquire();

        try {
          console.log("sending refresh token ");
          const refreshResult: QueryReturnValue<any, FetchBaseQueryError, {}> =
            await baseQuery("/auth/token", api, extraOptions);
          // console.log("Refresh result data:", refreshResult);

          if (refreshResult.data) {
            const access_token: string = refreshResult?.data;
            api.dispatch(setCredentials(access_token));
            localStorage.setItem("logged_in", "true");
            //retry original query with new access token
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logOut());
            // window.location.href = "/login";
          }
        } finally {
          release();
        }
      }
    } else {
      // wait until the mutex is avaliable without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["Stats"],
});
