"use server"

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";


export const addCategory = async (categoryData: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categories`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
    })
    revalidateTag("CATEGORY")
    return res.json();
}

export const getAllCategory= async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categories`, {
            next: {
                tags: ["CATEGORY"]
            }
        })
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const getSingleCategory = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categories/${id}`, {
            next: {
                tags: ["CATEGORY"]
            }
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};


export const deleteCategory= async (categoryId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        revalidateTag("CATEGORY");
        return res.json();
    } catch (error: any) {
        return Error(error)
    }
}