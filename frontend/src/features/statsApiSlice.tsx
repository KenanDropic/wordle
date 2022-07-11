import { apiSlice } from "../app/api/apiSlice";

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<any, any>({
      query: (): string | object | any => ({
        url: "/stats",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateStats: builder.mutation<any, any>({
      query: (data: {}): string | object | any => ({
        url: "/stats",
        method: "PUT",
        body: { ...data },
        credentials: "include",
      }),
    }),
  }),
});

export const { useLazyGetStatsQuery, useUpdateStatsMutation } = statsApiSlice;
