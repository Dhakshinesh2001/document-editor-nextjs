'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
// import { User } from "@liveblocks/node";

export const getClerkUsers = async ({userIds}: {userIds: string[]})=>{

        try{
            const {data} = await clerkClient.users.getUserList({
                emailAddresses: userIds
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