import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import { supabaseBaseQuery } from "./baseQuery";
import { Category } from "./categories";
import { Database } from "../types/database.types";
import { Unit } from "types/Unit";

export type Pack = {
  id: number;
  name: string | null;
  description?: string | null;
  unit: Unit;
  categories?: Category[];
  weight?: number | null;
  heroUrl?: string | null;
  profile?: {
    username?: string;
    avatarUrl?: string | null;
  };
};

type dbPack = Partial<Database["public"]["Tables"]["packs"]["Row"]>;
type dbCategory = Partial<Database["public"]["Tables"]["categories"]["Row"]>;
type dbCategoryItem = Partial<
  Database["public"]["Tables"]["category_item"]["Row"]
>;
type dbItem = Partial<Database["public"]["Tables"]["items"]["Row"]>;
type dbProfiles = Partial<Database["public"]["Tables"]["profiles"]["Row"]>;

type pack = dbPack & {
  categories: (dbCategory & {
    category_item: (dbCategoryItem & { items: dbItem[] })[];
  })[];
  profiles?: dbProfiles | null | any;
};

const packsMapper: (packs: pack[]) => Pack[] = (packs) => {
  return packs.map((pack) => {
    const packWeight = pack.categories.reduce((acc, category) => {
      const categoryWeight = category.category_item.reduce(
        (acc, categoryItem) => {
          const item = categoryItem.items as dbItem;
          return (acc +=
            (item.weight_in_grams || 0) * (categoryItem.quantity || 0));
        },
        0,
      );
      return (acc += categoryWeight);
    }, 0);

    return {
      id: pack.id || 0,
      heroUrl: pack.hero_url || null,
      name: pack.name || "",
      description: pack.description || "",
      unit: pack.unit as Unit,
      weight: packWeight,
    };
  });
};

const packMapper: (pack: pack) => Pack = (pack) => {
  const mappedCategories = pack.categories.map((category) => {
    let totalWeight = 0;
    let totalQuantity = 0;

    const categoryItems = category.category_item.map((categoryItem) => {
      const item = categoryItem.items as dbItem;
      totalWeight += (item.weight_in_grams || 0) * (categoryItem.quantity || 0);
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
          unit: (item.unit as Unit) || Unit.G,
        },
      };
    });

    return {
      id: category.id || 0,
      name: category.name || "",
      color: category.color || "#D13D1F",
      categoryItems,
      totalWeight,
      totalQuantity,
      order: category.order || 0,
    };
  });
  return {
    id: pack.id || 0,
    heroUrl: pack.hero_url || null,
    name: pack.name || "",
    description: pack.description || "",
    unit: pack.unit as Unit,
    categories: mappedCategories,
    profile: {
      username: pack.profiles?.username || "",
      avatarUrl: pack.profiles?.avatar_url || null,
    },
  };
};

export const packsApi = createApi({
  reducerPath: "packsApi",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    getPacks: builder.query({
      queryFn: async () => {
        const { data: userData } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("packs")
          .select(
            `
            id,
            name, 
            description,
            unit,
            hero_url,
            categories(
              category_item(
                quantity,
                items(
                  weight_in_grams,
                  unit
                )
              )
            )
          `,
          )
          .eq("profile_id", userData.user?.id);
        if (error) {
          return { error };
        }

        return { data: packsMapper(data) };
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
          description,
          unit,
          hero_url,
          profiles (
            username,
            avatar_url
          ),
          categories(
            id, 
            name,
            color,
            order,
            category_item(
              id,
              quantity,
              order,
              items(
                id,
                type, 
                description,
                weight_in_grams,
                unit
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
    createPack: builder.mutation({
      queryFn: async (pack) => {
        const { data: userData } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("packs")
          .insert({
            ...pack,
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
    updatePack: builder.mutation({
      queryFn: async (pack: Partial<dbPack>[]) => {
        const { data, error } = await supabase
          .from("packs")
          .upsert(pack)
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
  useGetPacksQuery,
  useGetPackQuery,
  useCreatePackMutation,
  useUpdatePackMutation,
} = packsApi;
