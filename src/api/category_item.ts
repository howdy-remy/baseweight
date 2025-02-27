import { createApi } from "@reduxjs/toolkit/query/react";

import { supabase } from "lib/supabaseClient";

import { supabaseBaseQuery } from "./baseQuery";
import { Item } from "./items";

export type CategoryItem = {
  id: number;
  item: Item;
  quantity: number;
  order: number;
};

export const categoriesItemApi = createApi({
  reducerPath: "categoriesItemApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    createCategoriesItem: builder.mutation({
      queryFn: async (categoriesItem) => {
        const { data: userData } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("category_item")
          .insert({
            ...categoriesItem,
            profile_id: userData.user?.id,
          })
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
    updateQuantity: builder.mutation({
      queryFn: async ({ categoryItemId, quantity }) => {
        const { data, error } = await supabase
          .from("category_item")
          .update({ quantity })
          .eq("id", categoryItemId);

        if (error) {
          console.error(error);
          return { error };
        }

        return { data };
      },
    }),
    updateCategoryItems: builder.mutation({
      queryFn: async (categoryItems) => {
        const { data, error } = await supabase
          .from("category_item")
          .upsert(categoryItems)
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

export const {
  useCreateCategoriesItemMutation,
  useDeleteCategoriesItemMutation,
  useUpdateQuantityMutation,
  useUpdateCategoryItemsMutation,
} = categoriesItemApi;
