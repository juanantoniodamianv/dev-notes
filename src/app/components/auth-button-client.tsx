'use client'

import {
  type Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

import { GithubIcon } from './icons'

export function AuthButton ({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const REDIRECT_AFTER_LOGIN_URL = process.env.NEXT_PUBLIC_REDIRECT_AFTER_LOGIN_URL ?? 'http://localhost:3000'

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${REDIRECT_AFTER_LOGIN_URL}/auth/callback`
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header>
      {session === null
        ? (
        <button
          onClick={handleSignIn}
          type="button"
          className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
        >
          <GithubIcon />
          Sign In
        </button>
          )
        : (
        <button onClick={handleSignOut} type="button">
          Sign out
        </button>
          )}
    </header>
  )
}
