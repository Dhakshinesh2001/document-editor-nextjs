import React from 'react'
import CollaborativeRoom from '@/components/CollaborativeRoom'
import { currentUser} from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getDocument } from '@/lib/actions/room.actions'
import { getClerkUsers } from '@/lib/actions/user.actions'
const Document = async ({ params }: SearchParamProps) => {

  const clerkUser = await currentUser();
  if(!clerkUser) {
    redirect('/sign-in');
  }
  const {id} = await params;
  const room = await getDocument({
    roomId: id, 
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if(!room) {
    console.log('room not found test dk');
    redirect('/');
  }

  const userIds = Object.keys(room.usersAccesses);
  console.log(userIds);
  const users= await getClerkUsers({userIds});
  const usersData = users?.map((user)=>({
    ...user,
    //@ts-ignore
    userType: room.usersAccesses[user.email]?.includes('room:write')
     ? 'editor' 
     : 'viewer',
  }))
//@ts-ignore
  const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';

  //@ts-ignore
  return (
    <main className='flex w-full flex-col items-center'>

      {/* @ts-ignore */}
        <CollaborativeRoom roomId={id} roomMetadata={room.metadata} users={usersData} currentUserType={currentUserType} />
         
          
    </main>
  )
}

export default Document