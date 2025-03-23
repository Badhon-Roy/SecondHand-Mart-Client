"use client"
import { IListing } from "@/types";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addFavorite } from "@/services/addToFavorite";

const ExclusiveOffers = ({ listings }: { listings: IListing[] }) => {
    const discountListings = listings?.filter(listing => listing?.discountPrice > 1);
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
        <div className="py-16 bg-gray-50">
            <div className="text-center">
                <h2 className="text-5xl font-extrabold text-[#ff8e00]">
                    Exclusive Offers
                </h2>
                <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600">
                    Discover limited-time discounts and special deals that give you access to unique savings on select products. Don’t miss out!
                </p>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="md:text-2xl text-xl font-bold">Offered Products</h2>
                <Link href={'/offers'}>
                    <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                        View All
                    </Button></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
                {discountListings?.slice(0, 4)?.map((listing) => (
                    <div key={listing?._id} className="p-3 bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full border">
                        <CardHeader className="relative p-0 overflow-hidden">
                            <Image
                                className="h-[200px] w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                                src={
                                    listing?.images[0] ||
                                    "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                                }
                                width={500}
                                height={500}
                                alt="product image"

                            />

                            {/* Available Badge */}
                            {listing?.discount > 0 && (
                                <div className="absolute top-2 left-2 bg-[#ff8e00] px-2 text-white font-medium rounded">
                                    {listing?.discount}%
                                </div>
                            )}

                            {/* Sold Out Badge */}
                            {listing?.status === "sold" && (
                                <div className="absolute top-6 left-2 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-xl border-2 border-red-500 uppercase tracking-wide transform -translate-y-4 opacity-90 animate-fadeIn">
                                    Sold Out
                                </div>
                            )}
                            <div className="absolute top-2 right-2">
                                <button onClick={() => handleAddToFavorite(listing?._id)} title="Add To Favorite" className="cursor-pointer rounded-tr-lg rounded-bl-lg w-8 h-8 border bg-white flex justify-center items-center text-[#ff8e00]"><Heart /></button>
                            </div>

                        </CardHeader>
                        <CardContent className="p-0 mt-3">
                            <Link href={`/products/${listing?._id}`} passHref>
                                <h2
                                    title={listing?.title}
                                    className="font-semibold text-xl text-gray-800 cursor-pointer hover:text-[#ff8e00] transition-all"
                                >
                                    {listing?.title.length > 27 ? listing?.title.slice(0, 27) + "..." : listing?.title}
                                </h2>
                            </Link>

                            <div className="flex items-center justify-between my-2">
                                {
                                    listing?.discountPrice > 0 ? <div className="flex gap-3 items-center">
                                        <p className="font-semibold text-lg text-[#ff8e00]">৳{listing?.discountPrice.toFixed(2)}</p>
                                        <p className="line-through text-lg">৳{listing?.price.toFixed(2)}</p>
                                    </div> : <div>
                                        <p className="font-semibold text-lg text-[#ff8e00]">৳{listing?.price.toFixed(2)}</p>
                                    </div>
                                }
                            </div>
                        </CardContent>

                        <CardFooter className="block p-0 mt-2">
                            <div className="flex gap-2 items-center justify-end">
                                {
                                    listing?.status === 'sold' ? <Button disabled={listing?.status === 'sold'} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none">
                                        Sold Out
                                    </Button> : <Link href={`/order/${listing?._id}`}>
                                        <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none">
                                            Buy Now
                                        </Button></Link>
                                }
                            </div>
                        </CardFooter>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExclusiveOffers;
