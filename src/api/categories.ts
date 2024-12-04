import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";
import { type Database } from "../types/database.types";
import { type Item } from "./items";

export type Category = {
  id?: number;
  name?: string | null;
  color?: string | null;
  items?: Partial<Item>[];
  totalWeight?: number;
  totalQuantity?: number;
};

export const categoryMapper: (
  category: Database["public"]["Tables"]["categories"]["Row"]
) => Category = (category) => ({
  id: category.id,
  name: category.name,
  color: category.color,
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
  }),
});

export const { useCreateCategoryMutation } = categoriesApi;
