"use server"

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";


export const sendMessage = async (message: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/messages`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    revalidateTag("MESSAGE")
    return res.json();
}



export const getAllMessage= async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/messages/${id}`, {
            next: {
                tags: ["MESSAGE"]
            }
        })
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}


export const deleteMessage= async (messageId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/messages/${messageId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        revalidateTag("MESSAGE");
        return res.json();
    } catch (error: any) {
        return Error(error)
    }
}