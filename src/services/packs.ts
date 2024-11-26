import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";

type Pack = {
  name: string;
  id: number;
  pack_category: {
    id: number;
    name: string;
    pack_category_item: {
      item: {
        id: number;
        type: string;
        description: string;
      }[];
    }[];
  }[];
};

type PackForGetPacks = Pick<Pack, "id" | "name">;

// Define a service using a base URL and expected endpoints
export const packsApi = createApi({
  reducerPath: "packsApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    getPacks: builder.query<PackForGetPacks[] | null, { userId?: string }>({
      queryFn: async ({ userId }) => {
        const { data, error } = await supabase
          .from("pack")
          .select("name, id")
          .eq("profile_id", userId);

        return { data };
      },
    }),
    getPack: builder.query<Pack | null, { packId?: string }>({
      queryFn: async ({ packId }) => {
        const { data, error } = await supabase
          .from("pack")
          .select(
            `
          id,
          name,
          pack_category(
            id, 
            name,
            pack_category_item(
            id,
              item(
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPacksQuery, useGetPackQuery } = packsApi;
