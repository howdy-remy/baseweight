import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";

export type Item = {
  type: string;
  description: string;
  weight_in_grams: number;
  quantity: number;
};

// Define a service using a base URL and expected endpoints
export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    createItem: builder.mutation({
      queryFn: async (item) => {
        const { data, error } = await supabase
          .from("item")
          .insert(item)
          .select();

        if (error) {
          console.error(error);
          return { error };
        }
        return { data };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateItemMutation } = itemsApi;
