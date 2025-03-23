"use server"


import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";


export const addBlog = async (blogData: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData)
    })
    revalidateTag("BLOG")
    return res.json();
}

export const getAllBlog = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
            next: {
                tags: ["BLOG"]
            }
        })
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const getSingleBlog = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
            next: {
                tags: ["BLOG"]
            }
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};


export const updateBlog = async (id: string, data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        revalidateTag("BLOG")
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};



export const deleteBlog = async (blogId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${blogId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        revalidateTag("BLOG");
        return res.json();
    } catch (error: any) {
        return Error(error)
    }
}