
"use client"

import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser, reCaptchaValidation } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { loginValidationSchema } from "./loginValidation";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginValidationSchema)
    });
    const [reCaptchaStatue, setReCaptchaStatue] = useState(false)

    const { formState: { isSubmitting }, reset, setValue } = form;
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirectPath')
    const router = useRouter();

    const handleReCaptcha = async (value: string | null) => {
        try {
            const res = await reCaptchaValidation(value!)
            if (res?.success) {
                setReCaptchaStatue(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastLoading = toast.loading("Logging...")
        try {
            const res = await loginUser(data)
            if (res.success) {
                toast.success(res?.message, { id: toastLoading })
                if (redirect) {
                    router.push(redirect)
                } else {
                    router.push('/')
                }
                setTimeout(() => {
                    window.location.reload();
                }, 500);
                reset();
            } else {
                toast.error(res?.message || "Something went wrong!", { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }

    const handleAsUser = () => {
        setValue("email", "roybadhon2861@gmail.com");
        setValue("password", "123456");
        form.handleSubmit(onSubmit)();
    }


    return (
        <div className="container mx-auto px-4 my-16 max-w-lg">
            <div className="p-8 rounded-xl shadow-xl space-y-6">
                <h2 className="text-3xl font-semibold text-center text-[#ff6f00] mb-4">Login Now</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-medium">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                            placeholder="Enter your email"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-medium">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                            placeholder="Enter your password"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />


                        <div className="flex justify-end items-center md:w-auto">
                            <ReCAPTCHA
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                                onChange={handleReCaptcha}
                            />
                        </div>


                        <Button disabled={reCaptchaStatue ? false : true} type="submit" className="bg-gradient-to-r from-[#ffbe0c] w-full to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                            {isSubmitting ? "Logging..." : "Login"}
                        </Button>
                        <div>
                            <div>
                                <Button title="User credentials" onClick={handleAsUser} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                    As a User
                                </Button>
                            </div>
                        </div>
                        <p className="text-right pr-2 text-xl">Don't have an account <Link className="text-[#ff8e00] underline" href={'/register'}>Register</Link></p>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
