import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query({
      queryFn: async ({ userId }) => {
        const { data, error } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", userId)
          .single();
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
    updateProfile: builder.mutation({
      queryFn: async (profile) => {
        const { data, error } = await supabase.from("profiles").upsert(profile);
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
