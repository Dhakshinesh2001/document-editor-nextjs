import React from 'react'
import Header from '@/components/header'
// import { Button } from '@/components/ui/button'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AddDocumentBtn from '@/components/AddDocumentBtn'
import { getDocumentS } from '@/lib/actions/room.actions'
import Link from 'next/link'
import { dateConverter } from '@/lib/utils'
import { DeleteModal } from '@/components/DeleteModal'
import Notification from '@/components/Notification'

const Home = async() => {

  const clerkUser = await currentUser();
  if(!clerkUser) {
    redirect('/sign-in');
  }


  const roomDocuments= await getDocumentS(clerkUser.emailAddresses[0].emailAddress);
  // if(!roomDocuments) {
  //   console.log('roomDocuments not found');
  // }
  return (
    
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-1 lg:gap-4">
          <Notification/>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </div>

      </Header>

{
  //@ts-ignore
roomDocuments.data.length > 0 ? (
  <div className='document-list-container'>
    <div className='document-list-title'>
      <h3 className='text-28-semibold'>All documents</h3>
      <AddDocumentBtn
        userId={clerkUser.id}
        email={clerkUser.emailAddresses[0].emailAddress}
      />
    </div>
    <ul className='document-ul'>
      {
      //@ts-ignore 
      roomDocuments.data.map(({id, metadata, createdAt})=>(
        <li key={id} className='document-list-item'>
          <Link href={`/documents/${id}`} className='flex flex-1 items-center gap-4'>
            <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
              <Image
               src='/assets/icons/doc.svg'
               alt='document'
               width={40}
               height={40}
              />
            </div>
            <div className='space-y-1'>
              <p className='line-clamp-1 text-lg'>{metadata.title}</p>
              <p className='text-sm font-light text-blue-100'>Created about {dateConverter(createdAt as unknown as string)}</p>
              </div>
          </Link>
          <DeleteModal roomId={id}/>
        </li>
      ))}
    </ul>
  
</div>
):(
  <div className='document-list-empty'>
    <Image 
    src='/assets/icons/doc.svg'
     alt='document' width={40} 
     height={40} 
     className='mx-auto'
     />

     <AddDocumentBtn 
     userId={clerkUser.id}
     email={clerkUser.emailAddresses[0].emailAddress}
     />
      
  </div>
)}

    </main>
  )
}

export default Home