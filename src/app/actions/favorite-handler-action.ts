"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export const handleFavoritePost = async ({ postId }: { postId: string }) => {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user === null) return;

  let favoritesToDelete: Array<String> = [];
  try {
    const { data: favorites } = await supabase
      .from("favorites")
      .select("id")
      .match({ post_id: postId, user_id: user.id });

    favoritesToDelete = favorites?.map((favorite) => favorite.id) ?? [];
  } catch (error) {
    console.error(`Error on getting favorites: ${error}`);
  }

  if (!favoritesToDelete?.length) {
    try {
      await supabase
        .from("favorites")
        .insert({ post_id: postId, user_id: user.id });
    } catch (error) {
      console.error(`Error on adding favorite: ${error}`);
    }
  } else {
    try {
      for (let favoriteToDeleteId of favoritesToDelete) {
        await supabase.from("favorites").delete().eq("id", favoriteToDeleteId);
      }
    } catch (error) {
      console.error(`Error on deleting favorite: ${error}`);
    }
  }
  revalidatePath("/");
};
