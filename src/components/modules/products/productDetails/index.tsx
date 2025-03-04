"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { addFavorite } from "@/services/addToFavorite";
import { IListing } from "@/types";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const ProductDetails = ({ listing }: { listing: IListing }) => {
    const { _id, title, category, condition, description, images, price, status, userID } = listing;

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
        <div className="p-6 bg-white shadow-lg rounded-lg my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Section */}
                <div className="relative">
                    <a href={images[0]} target="_blank" rel="noopener noreferrer">
                        <Image
                            className="w-full h-[500px] object-cover rounded-lg shadow-md"
                            src={images[0]}
                            alt={title}
                            width={1000}
                            height={500}
                        />
                    </a>

                    <Image
                        className="w-[300px] h-[200px] object-cover rounded-lg shadow-md absolute left-2 bottom-2 border-8 border-white"
                        src={images[1]}
                        alt={title}
                        width={300}
                        height={200}

                    />
                </div>

                {/* Product Info Section */}
                <div>
                    <h2 className="text-2xl font-semibold text-[#ff8e00]">{title}</h2>
                    <p className="text-gray-500 text-sm">Category: {category?.name}</p>
                    <p className="text-gray-700 my-3">{description}</p>

                    <div className="flex items-center space-x-2 text-green-600 font-medium">
                        <CheckCircle /> <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    </div>

                    <p className="mt-3 text-xl font-semibold text-[#ff8e00]">Price: ৳{price}</p>
                    <p className="text-gray-600">Condition: {condition?.charAt(0).toUpperCase() + condition.slice(1)}</p>


                    <div className="mt-6 p-5 bg-white rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-[#ff8e00]">🔹</span> Seller Information
                        </h2>

                        <div className="flex items-center gap-4">
                            <img
                                src={userID?.avatar}
                                alt={userID?.name}
                                className="w-14 h-14 rounded-full border-2 border-[#ff8e00] shadow-sm"
                            />

                            <div>
                                <p className="font-semibold text-gray-700 text-lg">{userID?.name}</p>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    📧 <span className="text-gray-600">{userID?.email}</span>
                                </p>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    📞 <span className="text-gray-600">{userID?.phoneNumber}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 space-y-4">
                        <div className="flex md:gap-10 gap-2 justify-between">
                            <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] lg:px-8 px-2 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer flex-1">
                                Add To Cart
                            </Button>
                            <Button onClick={() => handleAddToFavorite(_id)} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] lg:px-8 px-2 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer flex-1">
                                Add To Favorite
                            </Button>
                        </div>
                        <div>
                            <Link href={`/order/${_id}`}>
                                <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer w-full">
                                    Buy Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
