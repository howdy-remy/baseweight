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
  tagTypes: ["CategoryItem"], // Define tag types
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
      invalidatesTags: (result) =>
        result
          ? result.map((item) => ({ type: "CategoryItem", id: item.id }))
          : [], // Invalidate cache tags for created category items
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
      invalidatesTags: (result, error, categoriesItemId) =>
        categoriesItemId
          ? [{ type: "CategoryItem", id: categoriesItemId }]
          : [], // Invalidate cache tags for deleted category items
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
      invalidatesTags: (result, error, { categoryItemId }) =>
        categoryItemId ? [{ type: "CategoryItem", id: categoryItemId }] : [], // Invalidate cache tags for updated quantity
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
      invalidatesTags: (result) =>
        result
          ? result.map((item) => ({ type: "CategoryItem", id: item.id }))
          : [], // Invalidate cache tags for updated category items
    }),
  }),
});

export const {
  useCreateCategoriesItemMutation,
  useDeleteCategoriesItemMutation,
  useUpdateQuantityMutation,
  useUpdateCategoryItemsMutation,
} = categoriesItemApi;
