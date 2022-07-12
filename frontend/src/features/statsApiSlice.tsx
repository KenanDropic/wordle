import { apiSlice } from "../app/api/apiSlice";
import { StatsData } from "../components/Keyboard";

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<any, any>({
      query: (): string | object | any => ({
        url: "/stats",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateStats: builder.mutation<any, StatsData>({
      query: (data: StatsData): string | object | any => ({
        url: "/stats",
        method: "PUT",
        body: { ...data },
        credentials: "include",
      }),
    }),
  }),
});

export const { useLazyGetStatsQuery, useUpdateStatsMutation } = statsApiSlice;
