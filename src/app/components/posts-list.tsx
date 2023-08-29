import { type Post } from '@/app/types/posts'

import PostCard from './post-card'

interface PostWithFavorite extends Post {
  is_favorite: boolean
}

export function PostLists ({ posts }: { posts: PostWithFavorite[] | null }) {
  return (
    <>
      {posts?.map((post) => {
        const {
          id,
          user,
          content,
          created_at: createdAt,
          favorites_count: favoritesCount,
          is_favorite: isFavorite
        } = post

        const {
          user_name: userName,
          name: userFullName,
          avatar_url: avatarUrl
        } = user

        return (
          <PostCard
            avatarUrl={avatarUrl}
            content={content}
            createdAt={createdAt}
            favoritesCount={favoritesCount}
            isFavorite={isFavorite}
            key={id}
            postId={id}
            userFullName={userFullName}
            userName={userName}
          />
        )
      })}
    </>
  )
}
