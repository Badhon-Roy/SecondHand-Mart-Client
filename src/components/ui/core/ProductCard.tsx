"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { addFavorite } from "@/services/addToFavorite";
import { IListing, IUser } from "@/types";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: IListing }) => {
    const { _id, title, price, images, status } = product;
    const { user } = useUser();


    const handleAddToFavorite = async (id: string) => {
        const toastLoading = toast.loading("Adding...")
        const modifiedData = {
            product: id,
            email: user?.email,
        }
        try {
            if (user?.email) {
                const res = await addFavorite(modifiedData)
                if (res.success) {
                    toast.success(res?.message, { id: toastLoading })
                } else {
                    toast.error(res.message, { id: toastLoading })
                }
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }

    return (
        <Card className="p-3 bg-white shadow-lg rounded-lg h-[420px] transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full">
            <CardHeader className="relative p-0 h-56 overflow-hidden">
                <Image
                    className="rounded-t-lg h-56 w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105 hover:rounded-lg"
                    src={
                        images[0] ||
                        "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                    }
                    width={500}
                    height={500}
                    alt="product image"

                />

                {/* Available Badge */}
                {status === "available" && (
                    <div className="absolute top-6 left-2 bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-xl border-2 border-green-500 uppercase tracking-wide transform -translate-y-4 opacity-90 animate-fadeIn">
                        Available
                    </div>
                )}

                {/* Sold Out Badge */}
                {status === "sold" && (
                    <div className="absolute top-6 left-2 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-xl border-2 border-red-500 uppercase tracking-wide transform -translate-y-4 opacity-90 animate-fadeIn">
                        Sold Out
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <button onClick={() => handleAddToFavorite(_id)} title="Add To Favorite" className="cursor-pointer rounded-tr-lg rounded-bl-lg w-8 h-8 border bg-white flex justify-center items-center text-[#ff8e00]"><Heart /></button>
                </div>

            </CardHeader>
            <CardContent className="p-0 mt-3">
                <Link href={`/products/${_id}`} passHref>
                    <h2
                        title={title}
                        className="font-semibold text-xl text-gray-800 cursor-pointer hover:text-[#ff8e00] transition-all"
                    >
                        {title.length > 27 ? title.slice(0, 27) + "..." : title}
                    </h2>
                </Link>

                <div className="flex items-center justify-between my-2">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-lg text-[#ff8e00]">
                            BDT-{price.toFixed(2)}
                        </span>
                    </p>
                </div>
            </CardContent>

            <CardFooter className="block p-0 mt-2">
                <div className="flex gap-2 items-center justify-between">
                    <Button disabled={status === "sold"}
                        className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                        Add To Cart
                    </Button>
                  <Link href={`/order/${_id}`}>
                  <Button disabled={status === "sold"}
                        className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                        Buy Now
                    </Button></Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
