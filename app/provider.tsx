'use client';
import { LiveblocksProvider, RoomProvider } from '@liveblocks/react'
import { ClientSideSuspense } from '@liveblocks/react'
import Loader from '../components/loader'
import { getClerkUsers } from '../lib/actions/user.actions'

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider
        authEndpoint="/api/liveblocks-auth"
        resolveUsers = {async ({ userIds }) => {
            const users = await getClerkUsers({userIds});
            return users;
        }
      }
    >
        
           
        
                <ClientSideSuspense fallback={<Loader/>}>
        
                  {children}
        
                </ClientSideSuspense>
        
             
        
            </LiveblocksProvider>
  )
}

export default Provider