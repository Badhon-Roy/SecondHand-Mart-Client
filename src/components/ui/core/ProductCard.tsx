"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { IListing } from "@/types";

import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: IListing }) => {
    const { title, price, images, status } = product;

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
            </CardHeader>




            <CardContent className="p-0 mt-3">
                <Link href={`/products/${product?._id}`} passHref>
                    <CardTitle
                        title={title}
                        className="font-semibold text-xl text-gray-800 cursor-pointer hover:text-[#ff8e00] transition-all"
                    >
                        {title.length > 27 ? title.slice(0, 27) + "..." : title}
                    </CardTitle>
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
                        className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                        <ShoppingCart/> Add To Cart
                    </Button>
                    <Button disabled={status === "sold"}
                        className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                        Buy Now
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
