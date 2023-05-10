'use client';

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from "next/link";
const Main = () => {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
     signIn()
    },
  })
  
  return(
    <main className="flex flex-col hero min-h-screen bg-base-200">
      <div>
        <h1>
          Welcome,{' '}
          {status === 'authenticated'
            ? data.user?.name || 'friend'
            : 'stranger'}
          !
        </h1>
      </div>
      <div>
        <p>
          {status === 'authenticated' ? (
            <Link className="btn" href="/" onClick={() => signOut() } >Sign out {data.user?.email}</Link>
            ) : null}
        </p>
      </div>
    </main>
  )
}

export default Main