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

export const getAllListing = async (
    userId?: string,
    page?: string,
    limit?: number,
    query?: { [key: string]: string | string[] | undefined }
  ) => {
      const params = new URLSearchParams();
      if (query?.price) {
          params.append('minPrice', '0');
          params.append('maxPrice', query?.price.toString());
      }
      if (query?.category) {
          params.append('categories', query?.category.toString());
      }
      if (query?.condition) {
          params.append('conditions', query?.condition.toString());
      }
      if (query?.status) {
          params.append('statuses', query?.status.toString());
      }
      let url = `${process.env.NEXT_PUBLIC_BASE_API}/listings`;
      const queryParams: string[] = [];
  
      if (userId) queryParams.push(`userID=${userId}`);
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
                  tags: ["LISTING"]
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

export const addDiscount = async (id: string, discount: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings/add-discount/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                discount: discount,
            }),
        });
        const updatedProduct = await res.json();
        revalidateTag("LISTING");
        return updatedProduct;
    } catch (error: any) {
        console.error("Error updating discount:", error);
        return { error: error.message || "An error occurred" };
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