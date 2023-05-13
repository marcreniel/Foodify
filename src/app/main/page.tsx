'use client';

import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Main: NextPage = () => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/')
    },
  })

  useEffect(() => {
    getTracks();
  }, []);

  const getTracks = async () => {
    const res = await fetch('/api/topTracks');
    const {items} = await res.json();
    setList(items);
  };

  if(status === 'authenticated') {
    return (
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
        {list.map((item) => (
            <div key={item.id}>
              <h1>{item.name}</h1>
            </div>
          ))}
      </main>
    )
  }
  else {
    return ( 
      <main className="flex flex-col hero min-h-screen bg-base-200">
        <h1>Unauthorized Access</h1>
      </main>
    )
  }
}

export default Main