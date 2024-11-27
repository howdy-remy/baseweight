import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";

type Profile = {
  username: string;
  website: string;
  avatar_url: string;
};

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query<Profile | null, { userId?: string }>({
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
    updateProfile: builder.mutation<
      null,
      Profile & { id: string; updated_at: Date }
    >({
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
