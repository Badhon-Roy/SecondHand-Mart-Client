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

export const getAllBlog = async (
    user?: string,
    page?: number,
    limit?: number
) => {
    const params = new URLSearchParams();
    let url = `${process.env.NEXT_PUBLIC_BASE_API}/blogs`;
    const queryParams: string[] = [];
    if (user) queryParams.push(`user=${user}`);
    if (limit) queryParams.push(`limit=${limit}`);
    if (page) queryParams.push(`page=${page}`);

    // Append additional params from URLSearchParams
    if (params.toString()) queryParams.push(params.toString());

    // Construct final URL
    if (queryParams.length) {
        url += `?${queryParams.join("&")}`;
    }

    try {
        const res = await fetch(url, {
            next: {
                tags: ["BLOG"]
            }
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};


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