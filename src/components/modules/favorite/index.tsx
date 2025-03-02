"use client"
import { IFavorite } from "@/types";
import styles from "./favorite.module.css"
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteFavorite } from "@/services/addToFavorite";
import Link from "next/link";

const ManageFavoriteProducts = ({ favoriteProducts }: { favoriteProducts: IFavorite[] }) => {

    const handleDelete = async (id: string) => {
        const toastLoading = toast.loading("Deleting...")
        try {
            const res = await deleteFavorite(id)
            if (res.success) {
                toast.success(res?.message, { id: toastLoading })
            } else {
                toast.error(res?.message || "Something went wrong!", { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }
    return (
        <div>
            <div className="w-full rounded-lg border-2 p-2 border-[#ff8e00]">
                <div className={`${styles.banner}  text-center flex justify-center items-center rounded-lg`} >
                    <div>
                        <h2 className="md:text-3xl text-2xl font-bold text-white">
                            Favorite Products
                        </h2>
                        <p className="text-white mt-2 font-medium md:text-xl">
                            Discover a wide range of products available at the best prices, handpicked just for you!
                        </p>
                    </div>
                </div>
            </div>
            {
                favoriteProducts?.length > 0 ? <div className="my-8">
                    {
                        favoriteProducts?.map(products => (
                            <div key={products?._id} className="border-2 p-2 mb-8 rounded-lg shadow-lg">
                                <div className="md:flex items-center gap-8">
                                    <Image className="md:rounded-l-lg rounded-t-lg md:w-[300px] w-full" src={products?.product?.images[0]} alt={products?.product?.title} width={300} height={200} />
                                    <div className="space-y-3">
                                        <h2 className="md:text-2xl text-xl md:mt-0 mt-4 font-bold text-[#ff8e00]">{products?.product?.title}</h2>
                                        <div className="flex items-center space-x-2 text-green-600 font-medium">
                                            <CheckCircle /> <span>{products?.product?.status.charAt(0).toUpperCase() + products?.product?.status.slice(1)}</span>
                                        </div>
                                        <h2 className="md:text-2xl text-xl font-bold text-[#ff8e00]">Price: ৳{products?.product?.price}</h2>
                                        <div className="flex justify-between items-center gap-4">
                                            <Link href={`/products/${products?.product?._id}`}>
                                                <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                                    View Details
                                                </Button></Link>
                                            <Button onClick={() => handleDelete(products?._id)} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div> : <div>
                    <p className="text-2xl font-bold text-center my-8">No Product Available</p>
                    <Link href={'/products'} className="flex justify-center items-center">
                        <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                            Continue Shop
                        </Button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default ManageFavoriteProducts;