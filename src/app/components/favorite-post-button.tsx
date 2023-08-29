"use client";

import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

import { handleFavoritePost } from "../actions/favorite-handler-action";

export function FavoritePostButton({
  postId,
  isFavorite,
  favoritesCount,
}: {
  postId: string;
  isFavorite: boolean;
  favoritesCount: number | null;
}) {
  return (
    <form
      action={async () => {
        await handleFavoritePost({ postId });
      }}
    >
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        {isFavorite ? (
          <IconHeartFilled className="w-4 h-4 inline" />
        ) : (
          <IconHeart className="w-4 h-4 inline" />
        )}
        {favoritesCount ?? null ? (
          <span className="ml-1 text-xs text-white">{favoritesCount}</span>
        ) : null}
      </button>
    </form>
  );
}
