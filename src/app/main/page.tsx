'use client';

import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const Main = () => {
  const router = useRouter();
  const { status, data } = useSession()
  
  if (status != 'authenticated') {
    router.push('/')
  } return(
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
            <button className="btn" onClick={() => signOut()} >Sign out {data.user?.email}</button>
            ) : null}
        </p>
      </div>
    </main>
  )
}

export default Main