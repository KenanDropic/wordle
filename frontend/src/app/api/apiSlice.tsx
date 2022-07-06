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
    baseUrl: "http://127.0.0.1:5000/api/v1/auth",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken: string = (getState() as any).auth.access_token;
      // console.log("Get state:", getState() as any);
      // console.log("Access token", accessToken);
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
  // console.log("Result:", result);

  if (result.error) {
    if ((result?.error as any).originalStatus === 401) {
      if (!mutex.isLocked()) {
        const release: MutexInterface.Releaser = await mutex.acquire();

        try {
          console.log("sending refresh token ");
          const refreshResult: QueryReturnValue<any, FetchBaseQueryError, {}> =
            await baseQuery(
              { credentials: "include", url: "/token" },
              api,
              extraOptions
            );
          console.log("Refresh result:", refreshResult.data);

          if (refreshResult.data) {
            const access_token: string = refreshResult?.data;
            api.dispatch(setCredentials(access_token));
            //retry original query with new access token
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logOut());
            // window.location.href = "/login";
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      }
    }
  } else {
    // wait until the mutex is avaliable without locking it
    await mutex.waitForUnlock();
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
