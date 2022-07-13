import { apiSlice } from "../app/api/apiSlice";
import { StatsData } from "../components/Keyboard";
import { setUserStats } from "./statsSlice";

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<void, void>({
      query: (): string | object | any => ({
        url: "/stats",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Stats"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: stats } = await queryFulfilled;
          // set user stats
          dispatch(setUserStats((stats as any)?.data));
        } catch (error) {}
      },
    }),
    updateStats: builder.mutation<any, StatsData>({
      query: (data: StatsData): string | object | any => ({
        url: "/stats",
        method: "PUT",
        body: { ...data },
        credentials: "include",
      }),
      invalidatesTags: ["Stats"],
    }),
  }),
});

export const { useGetStatsQuery, useUpdateStatsMutation } = statsApiSlice;
