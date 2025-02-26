import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";
import { type Database } from "../types/database.types";
import { type CategoryItem } from "./category_item";

export type Category = {
  id: number;
  name: string | null;
  color: string | null;
  totalWeight: number;
  totalQuantity: number;
  categoryItems: CategoryItem[];
  order: number;
};

export const categoryMapper: (
  category: Database["public"]["Tables"]["categories"]["Row"],
) => Category = (category) => ({
  id: category.id,
  name: category.name,
  color: category.color,
  totalQuantity: 0,
  totalWeight: 0,
  categoryItems: [],
  order: 0,
});

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      queryFn: async (category) => {
        const { data, error } = await supabase
          .from("categories")
          .insert(category)
          .select();

        if (error) {
          console.error(error);
          return { error };
        }
        const mappedData = data.map(categoryMapper);
        return { data: mappedData };
      },
    }),
    upsertCategory: builder.mutation({
      queryFn: async (category) => {
        const { data, error } = await supabase
          .from("categories")
          .upsert(category)
          .select();

        if (error) {
          console.error(error);
          return { error };
        }
        const mappedData = data.map(categoryMapper);
        return { data: mappedData };
      },
    }),
    deleteCategory: builder.mutation({
      queryFn: async (category: Category) => {
        const categoryItemIds = category.categoryItems.map(({ id }) => id);

        // remove category items
        if (categoryItemIds.length) {
          const { error: categoryItemsError } = await supabase
            .from("category_item")
            .delete()
            .in("id", categoryItemIds);

          if (categoryItemsError) {
            console.error(categoryItemsError);
            return { categoryItemsError };
          }
        }

        // remove category
        const { error } = await supabase
          .from("categories")
          .delete()
          .eq("id", category.id);

        if (error) {
          console.error(error);
          return { error };
        }
        return { data: null };
      },
    }),
    updateCategories: builder.mutation({
      queryFn: async (categories: Partial<Category>[]) => {
        const { data, error } = await supabase
          .from("categories")
          .upsert(categories)
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
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoriesMutation,
  useUpsertCategoryMutation,
} = categoriesApi;
