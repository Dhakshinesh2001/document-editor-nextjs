'use client';

import { RoomProvider, ClientSideSuspense } from '@liveblocks/react'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/header'
import ActiveCollaborators from '../ActiveCollaborators';
import { useState,useRef, useEffect } from 'react';
import Image from 'next/image';
import { updateDocument } from '@/lib/actions/room.actions';
// import{input} from './ui/input';
const CollaborativeRoom = ({roomId, roomMetadata}: CollaborativeRoomProps) => {

  const currentUserType = 'editor';
  const [editing, setEditing] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler =async (e:React.KeyboardEvent<HTMLInputElement>) => {
  if(e.key==='Enter'){
    setLoading(true);

    try{
      if(documentTitle !== roomMetadata.title){
        const updatedDocument = await updateDocument(roomId, documentTitle);

        if(updatedDocument){
          setEditing(false);
          
        }
      }
    }catch(error){
      console.log(`error while updating document: ${error}`);
    }
setLoading(false);
  }
}

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setEditing(false);
      updateDocument(roomId, documentTitle);
    }}

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
}, [documentTitle,roomId]);

  useEffect(() => {
    if(editing && inputRef.current){
      inputRef.current.focus();
    }}
  ,[editing]);




  return (
    <RoomProvider id = {roomId}>

    <ClientSideSuspense fallback={<div>Loading…</div>}>

      <div className='collaborative-room'>
      <Header>
          <div ref={containerRef} className='flex w-fit items-center justify-center gap-2'>
            {editing && !Loading ? (
              <input
                type="text"
                value={documentTitle}
                ref={inputRef}
                placeholder='Enter title'
                onChange={(e) => setDocumentTitle(e.target.value)}
                onKeyDown={(updateTitleHandler)}
                disabled={!editing}
                className='document-title-input'
              />
            ):(
              <>
              <p className='document-title'>{documentTitle}</p>
              </>
            )}
            {currentUserType==='editor' && !editing && (
              <Image
                src='/assets/icons/edit.svg'
                alt="edit"
                width={24}
                height={24}
                onClick={() => setEditing(true)}
                className='pointer'
              />
            )}

            {
              currentUserType!=='editor' && !editing && (
                <p className='view-only-tag'>View Only</p>
              )
            }
            {
              Loading && <p className='test-sm test-gray-400'>
                saving...
              </p>
            }
          </div>
          <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
            <ActiveCollaborators />
            <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </div>
         
        
        </Header>
        <Editor />
        </div>

    </ClientSideSuspense>

  </RoomProvider>
  )
}

export default CollaborativeRoom