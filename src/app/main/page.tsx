'use client';

import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const Main: NextPage = () => {
  const router = useRouter();
  const { data: data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/')
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
        <button onClick={() => signOut()} className="btn">Sign Out</button>
      </div>
    </main>
  )
}

export default Main