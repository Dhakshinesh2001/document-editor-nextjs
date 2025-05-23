'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";
// import { User } from "@liveblocks/node";

export const getClerkUsers = async ({userIds}: {userIds: string[]})=>{

        try{
            const client = await clerkClient();
            const {data} = await client.users.getUserList({
            // const {data} = await clerkClient.users.getUserList({
                emailAddress: userIds
            });
            const users = data.map((user)=>({
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.emailAddresses[0].emailAddress,
                avatar: user.imageUrl,
            }));
            const sortedUsers = userIds.map((email)=> 
                
            users.find((user)=>user.email===email));

            return parseStringify(sortedUsers)
        }
        catch(error){
            console.log(`error while getting clerk users: ${error}`);
        }
}

export const getDocumentUsers = async ({roomId, currentUser, text}: {roomId: string, currentUser: string, text: string}) => {
    try {
        const room = await liveblocks.getRoom(roomId);
        const users = Object.keys(room.usersAccesses).filter((email)=> email !== currentUser);

        if(text.length)
{
    const lowercaseText = text.toLowerCase();
    const filteredUsers = users.filter((email:string)=> email.toLowerCase().includes(lowercaseText));

    return parseStringify(filteredUsers);
}
    return parseStringify(users);
}catch(error){
            console.log(`error while getting document users: ${error}`);
        }
}