import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";

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
        return { data };
      },
    }),
  }),
});

export const { useCreateCategoryMutation } = categoriesApi;
