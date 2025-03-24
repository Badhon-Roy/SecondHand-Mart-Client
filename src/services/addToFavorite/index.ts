"use server"

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";


export const addFavorite = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/favorites`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    revalidateTag("FAVORITE")
    return res.json();
}


export const getAllFavorite = async (
    email?: string,
    page?: number,
    limit?: number
  ) => {
      const params = new URLSearchParams();
      let url = `${process.env.NEXT_PUBLIC_BASE_API}/favorites`;
      const queryParams: string[] = [];
  
      if (email) queryParams.push(`email=${email}`);
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
                  tags: ["FAVORITE"]
              }
          });
  
          if (!res.ok) {
              throw new Error(`Error: ${res.status} ${res.statusText}`);
          }
  
          return await res.json();
      } catch (error: any) {
        return Error(error);
      }
  };
  

export const getSingleFavorite = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/favorites/${id}`, {
            next: {
                tags: ["FAVORITE"]
            }
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};


export const deleteFavorite = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/favorites/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        revalidateTag("FAVORITE");
        return res.json();
    } catch (error: any) {
        return Error(error)
    }
}