"use server"
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode, JwtPayload } from "jwt-decode";


export const registerUser = async (userData: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    return res.json();
}

export const loginUser = async (userData: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    const result = await res.json();
    if (result.success) {
        (await cookies()).set('accessToken', result.data.accessToken)
    }
    return result;
}

export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get('accessToken')?.value
    let decodedData = null;
    if (accessToken) {
        decodedData = await jwtDecode(accessToken)
        return decodedData;
    } else {
        return null;
    }

}

export const reCaptchaValidation = async (token: string) => {
    try {
        const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: "POST",
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',

            },
            body: new URLSearchParams({
                secret: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY as string,
                response: token
            })
        })
        return res.json();
    } catch (error: any) {
        return Error(error)
    }
}

export const logout =  async ()=>{
    try {
       (await cookies()).delete('accessToken')
    } catch (error : any) {
        return Error(error)
    }
}