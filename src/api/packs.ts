import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";
import { Category } from "./categories";
import { Database } from "../types/database.types";

export type Pack = {
  id: number;
  name: string | null;
  categories?: Category[];
};

type dbPack = Partial<Database["public"]["Tables"]["packs"]["Row"]>;
type dbCategory = Partial<Database["public"]["Tables"]["categories"]["Row"]>;
type dbCategoryItem = Partial<
  Database["public"]["Tables"]["categories_item"]["Row"]
>;
type dbItem = Partial<Database["public"]["Tables"]["items"]["Row"]>;

const packMapper = (
  pack: dbPack & {
    categories: (dbCategory & {
      categories_item: (dbCategoryItem & { items: dbItem[] })[];
    })[];
  }
) => {
  const mappedCategories = pack.categories.map((category) => {
    const items = category.categories_item.map((categoryItem) => {
      const item = categoryItem.items as dbItem;
      return {
        id: item.id,
        type: item.type,
        description: item.description,
        weightInGrams: item.weight_in_grams,
        quantity: item.quantity,
      };
    });
    return {
      id: category.id,
      name: category.name,
      color: category.color,
      items,
    };
  });
  return {
    id: pack.id,
    name: pack.name,
    categories: mappedCategories,
  };
};

export const packsApi = createApi({
  reducerPath: "packsApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    getPacks: builder.query({
      queryFn: async ({ userId }) => {
        const { data, error } = await supabase
          .from("packs")
          .select("name, id")
          .eq("profile_id", userId);
        if (error) {
          return { error };
        }

        return { data };
      },
    }),
    getPack: builder.query({
      queryFn: async ({ packId }) => {
        const { data, error } = await supabase
          .from("packs")
          .select(
            `
          id,
          name,
          categories(
            id, 
            name,
            color,
            categories_item(
              id,
              items(
                id,
                type, 
                description,
                weight_in_grams,
                quantity
              )
            )
          )
            `
          )
          .eq("id", packId)
          .single();
        if (error) {
          return { error };
        }

        return { data: packMapper(data) };
      },
    }),
  }),
});

export const { useGetPacksQuery, useGetPackQuery } = packsApi;
