import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";

export type CategoriesItem = {
  profile_id: string;
  pack_category_id: number;
  item_id: number;
};

export const categoriesItemApi = createApi({
  reducerPath: "categoriesItemApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    createCategoriesItem: builder.mutation({
      queryFn: async (categoriesItem: CategoriesItem) => {
        const { data, error } = await supabase
          .from("categories_item")
          .insert(categoriesItem)
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

export const { useCreateCategoriesItemMutation } = categoriesItemApi;
