'use client';
import { LiveblocksProvider} from '@liveblocks/react';
import { ClientSideSuspense } from '@liveblocks/react/suspense';
import Loader from '../components/loader';
import { getClerkUsers } from '../lib/actions/user.actions';
// import { currentUser } from '@clerk/nextjs/server';
import { useUser } from '@clerk/nextjs';
import { ReactNode } from 'react';
// import { get } from 'http';
import {getDocumentUsers} from '../lib/actions/user.actions'

const Provider = ({ children }: { children: ReactNode }) => {
const {user: clerkUser} = useUser();

  return (
    <LiveblocksProvider 
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds});

        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        })

        return roomUsers;
      }}
    >
        
           
        
                <ClientSideSuspense fallback={<Loader/>}>
        
                  {children}
        
                </ClientSideSuspense>
        
             
        
            </LiveblocksProvider>
  )
}

export default Provider