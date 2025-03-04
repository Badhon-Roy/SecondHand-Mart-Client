"use client";

import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const CheckoutSuccessPage = () => {
    const confettiRef = useRef<ConfettiRef>(null);
    const router = useRouter();

    useEffect(() => {
        confettiRef.current?.fire({});
    }, []);

    return (
        <div className="flex flex-col items-center px-4 my-16 relative">
            {/* Confetti Effect */}
            <Confetti ref={confettiRef} className="absolute inset-0 z-10 size-full -top-16" />

            {/* Success Card */}
            <div className="relative bg-white p-10 rounded-lg shadow-2xl text-center max-w-lg w-full animate-fade-in">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />
                </div>
                <h2 className="text-4xl font-semibold text-gray-800 mb-4">Payment Successful!</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Your order has been processed successfully. Thank you for shopping with us! 🎉
                </p>
                <Button onClick={() => router.push('/')} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                    Go Home
                </Button>
            </div>
        </div>
    );
};

export default CheckoutSuccessPage;
