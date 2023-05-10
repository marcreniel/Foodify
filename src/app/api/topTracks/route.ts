import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function GET() {
    const session = await getSession();

    if (!session || !session.user) {
        return NextResponse.json({ error: '404 Unauthorized' });
    }

    console.log(session);
    const { accessToken } = session.user.accessToken;
    

    try {
        const res = await fetch('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },});

        const items = res.json();

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
