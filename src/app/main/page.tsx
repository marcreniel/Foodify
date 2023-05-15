'use client';

import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Main: NextPage = () => {
  const router = useRouter();
  const [songList, setSongList] = useState([]);
  const [lyricsList, setLyricsList] = useState([]);
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
    /* items.forEach(async(item) => {
      const lyrics = await fetch(`/api/lyricsFetcher?id=${item.id}`);

    }); 
    setSongList(songList); */
    setSongList(items);
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
        {songList.map((item) => (
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