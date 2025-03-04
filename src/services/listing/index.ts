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

export const getAllListing = async (page?: string, limit?: string, query?: { [key: string]: string | string[] | undefined }) => {
    const params = new URLSearchParams();
    if (query?.price) {
        params.append('minPrice', '0')
        params.append('maxPrice', query?.price.toString())
    }
    if (query?.category) {
        params.append('categories', query?.category.toString())
    }
    if (query?.condition) {
        params.append('conditions', query?.condition.toString())
    }
    if (query?.status) {
        params.append('statuses', query?.status.toString())
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings?limit=${limit}&page=${page}&${params}`, {
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


export const updateListing = async (id: string, data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        revalidateTag("LISTING")
        return res.json();
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