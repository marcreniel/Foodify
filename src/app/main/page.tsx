'use client';

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const Main = () => {
  const router = useRouter();
  const { data, status } = useSession();
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
        <button onClick={() => signOut()} className="btn">Sign Out</button>
      </div>
    </main>
  )
}

export default Main