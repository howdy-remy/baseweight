import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";
import { Category } from "./categories";
import { Database } from "../types/database.types";

export type Pack = {
  id: number;
  name: string | null;
  categories: Category[];
};

type dbPack = Partial<Database["public"]["Tables"]["packs"]["Row"]>;
type dbCategory = Partial<Database["public"]["Tables"]["categories"]["Row"]>;
type dbCategoryItem = Partial<
  Database["public"]["Tables"]["category_item"]["Row"]
>;
type dbItem = Partial<Database["public"]["Tables"]["items"]["Row"]>;

type pack = dbPack & {
  categories: (dbCategory & {
    category_item: (dbCategoryItem & { items: dbItem[] })[];
  })[];
};

const packMapper: (pack: pack) => Pack = (pack) => {
  const mappedCategories = pack.categories.map((category) => {
    let totalWeight = 0;
    let totalQuantity = 0;

    const categoryItems = category.category_item.map((categoryItem) => {
      const item = categoryItem.items as dbItem;
      totalWeight += item.weight_in_grams || 0;
      totalQuantity += categoryItem.quantity || 0;

      return {
        id: categoryItem.id || 0,
        quantity: categoryItem.quantity || 0,
        order: categoryItem.order || 0,
        item: {
          id: item.id || 0,
          type: item.type || "",
          description: item.description || "",
          weightInGrams: item.weight_in_grams || 0,
        },
      };
    });

    return {
      id: category.id || 0,
      name: category.name || "",
      color: category.color || "#000000",
      categoryItems,
      totalWeight,
      totalQuantity,
    };
  });
  return {
    id: pack.id || 0,
    name: pack.name || "",
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
            category_item(
              id,
              quantity,
              order,
              items(
                id,
                type, 
                description,
                weight_in_grams
              )
            )
          )
            `,
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
