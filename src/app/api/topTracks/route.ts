import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'

export async function GET() {
    const session = await getServerSession(authOptions)    
    console.log({session})
}