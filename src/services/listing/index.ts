"use server"


import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";


export const addListing = async (listingData: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listingData)
    })
    revalidateTag("LISTING")
    return res.json();
}

export const getAllListing = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
            next: {
                tags: ["LISTING"]
            }
        })
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const getSingleListing = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`, {
            next: {
                tags: ["LISTING"]
            }
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};


export const updateListing = async (id: string , data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};


export const deleteListing = async (listingId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        revalidateTag("LISTING");
        return res.json();
    } catch (error: any) {
        return Error(error)
    }
}