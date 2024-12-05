import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";
import { Item } from "./items";

export type CategoryItem = {
  id: number;
  item: Item;
  quantity: number;
};

export const categoriesItemApi = createApi({
  reducerPath: "categoriesItemApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    createCategoriesItem: builder.mutation({
      queryFn: async (categoriesItem) => {
        const { data, error } = await supabase
          .from("category_item")
          .insert(categoriesItem)
          .select();

        if (error) {
          console.error(error);
          return { error };
        }

        return { data };
      },
    }),
    deleteCategoriesItem: builder.mutation({
      queryFn: async (categoriesItemId) => {
        const { data, error } = await supabase
          .from("category_item")
          .delete()
          .eq("id", categoriesItemId);

        if (error) {
          console.error(error);
          return { error };
        }

        return { data };
      },
    }),
  }),
});

export const {
  useCreateCategoriesItemMutation,
  useDeleteCategoriesItemMutation,
} = categoriesItemApi;
