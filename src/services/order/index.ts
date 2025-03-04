
"use server"

import { revalidateTag } from "next/cache";

export const getAllOrder = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
            next: {
                tags: ["ORDER"]
            }
        })
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const getSingleOrder = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${id}`, {
            next: {
                tags: ["ORDER"]
            }
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};
export const getPurchasesHistory = async (userId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/purchases/${userId}`, {
            next: {
                tags: ["ORDER"]
            }
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getSinglePurchasesHistory = async (id: string, userId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/purchases/${userId}/${id}`, {
            next: {
                tags: ["ORDER"]
            }
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getSalesHistory = async (userId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/sales/${userId}`, {
            next: {
                tags: ["ORDER"]
            }
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};
export const getSingleSalesHistory = async (id: string, userId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/sales/${userId}/${id}`, {
            next: {
                tags: ["ORDER"]
            }
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const updateOrderStatus = async (id: string, data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${id}/status`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        revalidateTag("ORDER")
        return res.json();

    } catch (error: any) {
        return Error(error)
    }
}


