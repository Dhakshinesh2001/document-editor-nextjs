import React from 'react'
import CollaborativeRoom from '@/components/ui/CollaborativeRoom'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getDocument } from '@/lib/actions/room.actions'
const Document = async ({params: {id }}: SearchParamProps) => {

  const clerkUser = await currentUser();
  if(!clerkUser) {
    redirect('/sign-in');
  }

  const room = await getDocument({
    roomId: id, 
    userId: clerkUser.id
  });

  if(!room) {
    redirect('/');
  }

  //Access user permissoins
  return (
    <main className='flex w-full flex-col items-center'>
        <CollaborativeRoom
          roomId={id}
          roomMetadata={room.metadata}
          />
    </main>
  )
}

export default Document