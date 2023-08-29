import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { PostLists } from './components/posts-list'
import { ComposePost } from './components/compose-post'
import Navbar from './components/navbar'

export default async function Home () {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  let { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(name, avatar_url, user_name)')
    .order('created_at', { ascending: false })

  const postIds = posts?.map((post) => post.id) ?? []

  const { data: favorites } = await supabase
    .from('favorites')
    .select('post_id')
    .in('post_id', [...postIds])
    .eq('user_id', session?.user?.id)

  if (posts != null) {
    const favoritePostIds =
      favorites?.map((favorite) => favorite.post_id) ?? []

    posts = posts?.map((post) => {
      if (favoritePostIds?.includes(post.id)) {
        post.is_favorite = true
      } else {
        post.is_favorite = false
      }
      return post
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar
        session={session}
        userAvatarUrl={session?.user?.user_metadata?.avatar_url}
        userName={session?.user?.user_metadata?.user_name}
        userFullName={session?.user?.user_metadata?.full_name}
      />
      <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
        {session !== null && (
          <ComposePost
            userAvatarUrl={session.user?.user_metadata?.avatar_url}
          />
        )}
        <PostLists posts={posts} />
      </section>
    </main>
  )
}
