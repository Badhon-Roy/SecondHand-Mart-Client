
"use server"


import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";


export const createOrder = async (orderData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        revalidateTag("ORDER");

        const result = await res.json();

        // If there's an issue with JSON parsing, log it
        if (!result) {
            throw new Error("Failed to parse JSON response");
        }

        if (!res?.ok) {
            throw new Error(result?.message + ' Please try again!');
        }

        if (result?.session?.url) {
            window.location.href = result?.session?.url;
        }

        return result;
    } catch (error: any) {
        console.error("Error:", error);
        return new Error(error);
    }
}


