"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { addFavorite } from "@/services/addToFavorite";
import { IListing, IUser } from "@/types";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: IListing }) => {
    const { _id, title, price, images, status, discountPrice } = product;
    const { user } = useUser();
    const router = useRouter();


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
            } else {
                toast.error('Firstly login now!', { id: toastLoading })
                router.push('/login')
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }

    return (
        <div className="md:p-3 p-1 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full relative">
             {/* Available Badge */}
             {status === "available" && (
                    <>
                        <div className="md:block hidden absolute top-8 left-4 bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-xl border-2 border-green-500 uppercase tracking-wide transform -translate-y-4 opacity-90 animate-fadeIn z-10">
                            Available
                        </div>
                        <p className='md:hidden absolute bg-[#62b775] text-sm top-2 left-0 px-1 text-white rounded-r z-10'>Buy</p>
                    </>
                )}
            <div className="relative p-0 md:h-[200px] overflow-hidden">
                <Image
                    className="md:rounded-t-lg md:h-[200px] h-[100px] w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105 md:hover:rounded-lg"
                    src={
                        images[0] ||
                        "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                    }
                    width={500}
                    height={500}
                    alt="product image"

                />

                {/* Sold Out Badge */}
                {status === "sold" && (
                    <div className="absolute top-6 left-2 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-xl border-2 border-red-500 uppercase tracking-wide transform -translate-y-4 opacity-90 animate-fadeIn">
                        Sold Out
                    </div>
                )}
                <div className="absolute md:top-2 top-0 md:right-2 right-0">
                    <button onClick={() => handleAddToFavorite(_id)} title="Add To Favorite" className="cursor-pointer rounded-tr-lg rounded-bl-lg w-8 h-8 md:border md:bg-white flex justify-center items-center text-[#ff8e00]"><Heart /></button>
                </div>

            </div>
            <div className="md:p-0 px-2 mt-3">
                <Link href={`/products/${_id}`} passHref>
                    <h2
                        title={title}
                        className="md:block hidden md:font-semibold md:text-xl text-gray-800 cursor-pointer hover:text-[#ff8e00] transition-all"
                    >
                        {title.length > 27 ? title.slice(0, 27) + "-" : title}
                    </h2>
                    <h2
                        title={title}
                        className="md:hidden text-sm md:font-semibold md:text-xl text-gray-800 cursor-pointer hover:text-[#ff8e00] transition-all"
                    >
                        {title.length > 12 ? title.slice(0, 12) + "-" : title}
                    </h2>
                </Link>

                <div className="flex items-center justify-center md:justify-between my-2">
                    {
                        discountPrice > 0 ? <div className="flex gap-3 items-center">
                            <p className="md:font-semibold md:text-lg text-[#ff8e00]">৳{discountPrice.toFixed(2)}</p>
                            <p className="line-through text-lg">৳{price.toFixed(2)}</p>
                        </div> : <div>
                            <p className="md:font-semibold md:text-lg text-[#ff8e00]">৳{price.toFixed(2)}</p>
                        </div>
                    }
                </div>
            </div>

            <div className="block p-0 mt-2">
                <div className="flex gap-2 items-center justify-end">
                    {
                        status === 'sold' ? <Button disabled={status === 'sold'} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-5 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none">
                            Sold Out
                        </Button> : <Link href={`/order/${_id}`}>
                            <Button className="md:flex hidden bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-5 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none">
                                Buy Now
                            </Button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
