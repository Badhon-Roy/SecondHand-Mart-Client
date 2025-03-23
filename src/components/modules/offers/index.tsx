"use client"

import { ICategory, IListing } from "@/types";
import styles from "./offers.module.css"
import ProductCard from "@/components/ui/core/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import FilterSidebar from "../products/filterSidebar";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { addFavorite } from "@/services/addToFavorite";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface IManageProductsProps {
    products: IListing[],
    categories: ICategory[]
}

const ManageOffers = ({ products, categories }: IManageProductsProps) => {
    const searchParams = useSearchParams()
    const search = searchParams.get('category')
    const filterByCategoryProducts = products?.filter(product => product?.category?.name === search)

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
        <div className="my-8">
            <div className="w-full rounded-lg border-2 p-2 border-[#ff8e00]">
                <div className={`${styles.banner}  text-center flex justify-center items-center rounded-lg`} >
                   
                </div>
            </div>
            <div className="md:flex my-8 gap-8">
                <div>
                    <FilterSidebar categories={categories} />
                </div>
                {
                    search && filterByCategoryProducts?.length > 0 ?
                        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 md:mt-0 mt-8">
                            {filterByCategoryProducts?.map((product: IListing,) => (
                                     <div key={product?._id} className="p-3 bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full border">
                        <CardHeader className="relative p-0 overflow-hidden">
                            <Image
                                className="h-[200px] w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                                src={
                                    product?.images[0] ||
                                    "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                                }
                                width={500}
                                height={500}
                                alt="product image"

                            />

                            {/* Available Badge */}
                            {product?.discount > 0 && (
                                <div className="absolute top-2 left-2 bg-[#ff8e00] px-2 text-white font-medium rounded">
                                    {product?.discount}%
                                </div>
                            )}

                            {/* Sold Out Badge */}
                            {product?.status === "sold" && (
                                <div className="absolute top-6 left-2 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-xl border-2 border-red-500 uppercase tracking-wide transform -translate-y-4 opacity-90 animate-fadeIn">
                                    Sold Out
                                </div>
                            )}
                            <div className="absolute top-2 right-2">
                                <button onClick={() => handleAddToFavorite(product?._id)} title="Add To Favorite" className="cursor-pointer rounded-tr-lg rounded-bl-lg w-8 h-8 border bg-white flex justify-center items-center text-[#ff8e00]"><Heart /></button>
                            </div>

                        </CardHeader>
                        <CardContent className="p-0 mt-3">
                            <Link href={`/products/${product?._id}`} passHref>
                                <h2
                                    title={product?.title}
                                    className="font-semibold text-xl text-gray-800 cursor-pointer hover:text-[#ff8e00] transition-all"
                                >
                                    {product?.title.length > 27 ? product?.title.slice(0, 27) + "..." : product?.title}
                                </h2>
                            </Link>

                            <div className="flex items-center justify-between my-2">
                                {
                                    product?.discountPrice > 0 ? <div className="flex gap-3 items-center">
                                        <p className="font-semibold text-lg text-[#ff8e00]">৳{product?.discountPrice.toFixed(2)}</p>
                                        <p className="line-through text-lg">৳{product?.price.toFixed(2)}</p>
                                    </div> : <div>
                                        <p className="font-semibold text-lg text-[#ff8e00]">৳{product?.price.toFixed(2)}</p>
                                    </div>
                                }
                            </div>
                        </CardContent>

                        <CardFooter className="block p-0 mt-2">
                            <div className="flex gap-2 items-center justify-end">
                                {
                                    product?.status === 'sold' ? <Button disabled={product?.status === 'sold'} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none">
                                        Sold Out
                                    </Button> : <Link href={`/order/${product?._id}`}>
                                        <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none">
                                            Buy Now
                                        </Button></Link>
                                }
                            </div>
                        </CardFooter>
                    </div>
                            ))}
                        </div> : <div>
                            {
                                products?.length > 0 ? <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 md:mt-0 mt-8">
                                {products?.map((product: IListing, idx: number) => (
                                         <div key={product?._id} className="p-3 bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full border">
                        <CardHeader className="relative p-0 overflow-hidden">
                            <Image
                                className="h-[200px] w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                                src={
                                    product?.images[0] ||
                                    "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                                }
                                width={500}
                                height={500}
                                alt="product image"

                            />

                            {/* Available Badge */}
                            {product?.discount > 0 && (
                                <div className="absolute top-2 left-2 bg-[#ff8e00] px-2 text-white font-medium rounded">
                                    {product?.discount}%
                                </div>
                            )}

                            {/* Sold Out Badge */}
                            {product?.status === "sold" && (
                                <div className="absolute top-6 left-2 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-xl border-2 border-red-500 uppercase tracking-wide transform -translate-y-4 opacity-90 animate-fadeIn">
                                    Sold Out
                                </div>
                            )}
                            <div className="absolute top-2 right-2">
                                <button onClick={() => handleAddToFavorite(product?._id)} title="Add To Favorite" className="cursor-pointer rounded-tr-lg rounded-bl-lg w-8 h-8 border bg-white flex justify-center items-center text-[#ff8e00]"><Heart /></button>
                            </div>

                        </CardHeader>
                        <CardContent className="p-0 mt-3">
                            <Link href={`/products/${product?._id}`} passHref>
                                <h2
                                    title={product?.title}
                                    className="font-semibold text-xl text-gray-800 cursor-pointer hover:text-[#ff8e00] transition-all"
                                >
                                    {product?.title.length > 27 ? product?.title.slice(0, 27) + "..." : product?.title}
                                </h2>
                            </Link>

                            <div className="flex items-center justify-between my-2">
                                {
                                    product?.discountPrice > 0 ? <div className="flex gap-3 items-center">
                                        <p className="font-semibold text-lg text-[#ff8e00]">৳{product?.discountPrice.toFixed(2)}</p>
                                        <p className="line-through text-lg">৳{product?.price.toFixed(2)}</p>
                                    </div> : <div>
                                        <p className="font-semibold text-lg text-[#ff8e00]">৳{product?.price.toFixed(2)}</p>
                                    </div>
                                }
                            </div>
                        </CardContent>

                        <CardFooter className="block p-0 mt-2">
                            <div className="flex gap-2 items-center justify-end">
                                {
                                    product?.status === 'sold' ? <Button disabled={product?.status === 'sold'} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none">
                                        Sold Out
                                    </Button> : <Link href={`/order/${product?._id}`}>
                                        <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none">
                                            Buy Now
                                        </Button></Link>
                                }
                            </div>
                        </CardFooter>
                    </div>
                                ))}
                            </div> : <p className="text-3xl font-bold my-8 text-center ">No product found</p>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default ManageOffers;