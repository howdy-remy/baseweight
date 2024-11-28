import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";

export const packsApi = createApi({
  reducerPath: "packsApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    getPacks: builder.query({
      queryFn: async ({ userId }) => {
        const { data, error } = await supabase
          .from("packs")
          .select("name, id")
          .eq("profile_id", userId);
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
    getPack: builder.query({
      queryFn: async ({ packId }) => {
        const { data, error } = await supabase
          .from("packs")
          .select(
            `
          id,
          name,
          categories(
            id, 
            name,
            categories_item(
            id,
              items(
                id,
                type, 
                description
              )
            )
          )
            `
          )
          .eq("id", packId)
          .single();
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
  }),
});

export const { useGetPacksQuery, useGetPackQuery } = packsApi;
