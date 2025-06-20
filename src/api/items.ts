import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";
import { Database } from "../types/database.types";
import { Unit } from "types/Unit";

export type Item = {
  id: number;
  description: string | null;
  type: string | null;
  weightInGrams: number | null;
  unit: Unit;
};

export const itemMapper: (
  item: Database["public"]["Tables"]["items"]["Row"],
) => Item = (item) => ({
  id: item.id,
  type: item.type,
  description: item.description,
  weightInGrams: item.weight_in_grams,
  unit: item.unit as Unit,
});

export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    getItems: builder.query({
      queryFn: async () => {
        const { data: userData } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("items")
          .select()
          .eq("profile_id", userData.user?.id);

        if (error) {
          console.error(error);
          return { error };
        }

        const mappedData = data.map(itemMapper);
        return { data: mappedData };
      },
    }),
    searchItems: builder.query({
      queryFn: async ({ searchString, excludeIds = [] }) => {
        const { data: userData } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("items")
          .select()
          .eq("profile_id", userData.user?.id)
          .not("id", "in", `(${excludeIds.join(",")})`)
          .ilike("type_description", `%${searchString}%`);

        if (error) {
          console.error(error);
          return { error };
        }

        const mappedData = data.map(itemMapper);
        return { data: mappedData };
      },
    }),
    createItem: builder.mutation({
      queryFn: async (item) => {
        const { data: userData } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("items")
          .insert({
            ...item,
            profile_id: userData.user?.id,
          })
          .select();

        if (error) {
          console.error(error);
          return { error };
        }

        const mappedData = data.map(itemMapper);
        return { data: mappedData };
      },
    }),
    editItem: builder.mutation({
      queryFn: async (item) => {
        const { data, error } = await supabase
          .from("items")
          .update({
            type: item.type,
            description: item.description,
            weight_in_grams: item.weightInGrams,
            unit: item.unit,
          })
          .eq("id", item.id)
          .select();

        if (error) {
          console.error(error);
          return { error };
        }

        const mappedData = data.map(itemMapper);
        return { data: mappedData };
      },
    }),
    deleteItem: builder.mutation({
      queryFn: async (itemId) => {
        // get all category items associated with the item
        const { data: categoryItems } = await supabase
          .from("category_item")
          .select("id")
          .eq("item_id", itemId);

        // remove category items associated with the item
        if (categoryItems?.length) {
          const { error: categoryItemsError } = await supabase
            .from("category_item")
            .delete()
            .in(
              "id",
              categoryItems.map(({ id }) => id),
            );
          if (categoryItemsError) {
            console.error(categoryItemsError);
            return { error: categoryItemsError };
          }
        }

        const { error } = await supabase
          .from("items")
          .delete()
          .eq("id", itemId);

        if (error) {
          console.error(error);
          return { error };
        }

        return { data: null };
      },
    }),
  }),
});

export const {
  useGetItemsQuery,
  useEditItemMutation,
  useDeleteItemMutation,
  useCreateItemMutation,
  useLazySearchItemsQuery,
} = itemsApi;
