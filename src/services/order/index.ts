
"use server"

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
export const getPurchasesHistory = async (userId : string) => {
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

export const getSinglePurchasesHistory = async (id: string, userId : string) => {
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
export const getSingleSalesHistory = async (id : string ,userId: string) => {
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

