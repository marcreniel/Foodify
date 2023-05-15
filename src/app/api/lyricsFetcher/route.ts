import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getLyrics } from '@/app/utils/handler';
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)    

    if (!session || !session.user) {
        return NextResponse.json({ error: '404 Unauthorized' });
    }
    
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const response = await getLyrics(id);
        const combinedWords = response.lines.map(line => line.words).join(' ');
        
        return NextResponse.json({ result: combinedWords });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching API' });
    }
}