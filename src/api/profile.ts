import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: supabaseBaseQuery,
  tagTypes: ["Profile"], // Define tag types
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
      providesTags: (result, error, { userId }) =>
        result ? [{ type: "Profile", id: userId }] : [], // Provide cache tags
    }),
    updateProfile: builder.mutation({
      queryFn: async (profile) => {
        const { data, error } = await supabase.from("profiles").upsert(profile);
        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: (result, error, profile) =>
        profile.id ? [{ type: "Profile", id: profile.id }] : [], // Invalidate cache tags
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
