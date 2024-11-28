import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";

export type PackCategoryItem = {
  profile_id: string;
  pack_category_id: number;
  item_id: number;
};

// Define a service using a base URL and expected endpoints
export const packCategoryItemApi = createApi({
  reducerPath: "packCategoryItemApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    createPackCategoryItem: builder.mutation({
      queryFn: async (packCategoryItem) => {
        const { data, error } = await supabase
          .from("pack_category_item")
          .insert(packCategoryItem)
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
export const { useCreatePackCategoryItemMutation } = packCategoryItemApi;
