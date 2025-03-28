"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { addFavorite } from "@/services/addToFavorite";
import { sendMessage } from "@/services/inquiry";
import { IListing } from "@/types";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const ProductDetails = ({ listing, senderID, filterProducts }: { listing: IListing, senderID: string, filterProducts: IListing[] }) => {
    const { _id, title, category, condition, description, images, price, status, userID } = listing;
    const router = useRouter()
    const { user } = useUser();
    const form = useForm();
    const { formState: { isSubmitting }, reset } = form

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastLoading = toast.loading("Sending...")
        const modifiedData = {
            message: data?.message,
            senderID: senderID,
            receiverID: userID?._id
        }

        try {
            if (user?.email) {
                const res = await sendMessage(modifiedData)
                if (res.success) {
                    toast.success(res.message, { id: toastLoading })
                    reset();
                } else if (res.err) {
                    toast.error(res?.message || "Something went wrong!", { id: toastLoading })
                }
            } else {
                toast.error("Login First!", { id: toastLoading })
                router.push('/login')
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }



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
                toast.error("Login First!", { id: toastLoading })
                router.push('/login')
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }

    return (
        <div>
            <div className="p-6 bg-white shadow-lg rounded-lg my-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image Section */}
                    <div className="relative">
                        <a href={images[0]} target="_blank" rel="noopener noreferrer">
                            <Image
                                className="w-full md:h-[500px] object-cover rounded-lg shadow-md"
                                src={images[0]}
                                alt={title}
                                width={1000}
                                height={500}
                            />
                        </a>

                        <Image
                            className="md:w-[300px] w-[150px] md:h-[200px] h-[100px] object-cover rounded-lg shadow-md absolute left-2 bottom-2 lg:border-8 md:border-4 border-2 border-white"
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
                            <div className="flex justify-between items-center gap-8">
                                <h2 className="text-lg font-semibold text-[#ff8e00] mb-4 flex items-center gap-2">
                                    🔹 Seller Information
                                </h2>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex justify-end">
                                            <Button size={'sm'} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] rounded-[4px] text-white font-semibold shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                                Inquiry
                                            </Button>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle className="text-center text-2xl text-[#ff6f00]">Send Message</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click save when you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                <FormField
                                                    control={form.control}
                                                    name="message"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-lg font-medium">Message</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                                                    placeholder="Enter your message"
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-500" />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button type="submit" className="bg-gradient-to-r from-[#ffbe0c] w-full to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                                    {isSubmitting ? "Sending..." : "Send"}
                                                </Button>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="md:flex items-center gap-4">
                                <div className="flex justify-center">
                                    <img
                                        src={userID?.avatar}
                                        alt={userID?.name}
                                        className="w-14 h-14 rounded-full border-2 border-[#ff8e00] shadow-sm"
                                    />
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-700 text-lg md:text-start text-center">{userID?.name}</p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        📧 <span className="text-gray-600 md:text-lg text-sm">{userID?.email}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        📞 <span className="text-gray-600">{userID?.phoneNumber}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="my-4 space-y-4">
                            <div className="flex md:gap-10 gap-2 justify-between">
                                <Button onClick={() => handleAddToFavorite(_id)} className="flex-1 bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] lg:px-8 px-2 py-6 rounded-[4px] text-white font-semibold shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer flex-1">
                                    Add To Favorite
                                </Button>
                                <div className="flex-1">
                                    {
                                        status === "sold" ?
                                            <Button className="bg-gradient-to-r from-[#ff710c] to-[#ff0000] lg:px-8 px-2 py-6 rounded-[4px] text-white w-full font-semibold shadow-md transform transition-transform duration-300">
                                                Sold Out
                                            </Button> : <Link href={`/order/${_id}`}>
                                                <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer w-full">
                                                    Buy Now
                                                </Button>
                                            </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-semibold text-[#ff8e00] mb-4 mt-16" >Related Products</h2>
                <div className="grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-2 lg:gap-8 md:gap-4 gap-3">
                    {
                        filterProducts?.slice(0, 10)?.map(product => (
                            <Link key={product?._id} href={`/products/${product?._id}`} className="hover:shadow-lg">
                                <div className='border bg-white shadow-lg p-2 rounded-lg relative'>
                                    <p className='absolute bg-[#62b775] text-sm top-2 left-0 px-1 text-white rounded-r'>Buy</p>
                                    <div>
                                        <Image className='md:w-[100px] md:h-[120px] h-[100px] w-[100px] mx-auto mt-4' src={product?.images[0]} alt={product?.title} width={300} height={200}></Image>
                                    </div>
                                    <div>

                                        <h2
                                            title={product?.title}
                                            className="text-gray-800 cursor-pointer hover:text-[#ff8e00] transition-all text-center mt-2"
                                        >
                                            {product?.title.length > 15 ? product?.title.slice(0, 15) + "-" : product?.title}
                                        </h2>

                                        <div className="flex items-center justify-center gap-2 my-2">
                                            {
                                                product?.discountPrice > 0 ? <div className="flex gap-3 items-center">
                                                    <p className="font-medium text-lg text-[#ff8e00]">৳{product?.discountPrice.toFixed(2)}</p>
                                                    <p className="line-through text-lg">৳{product?.price.toFixed(2)}</p>
                                                </div> : <div>
                                                    <p className="font-medium text-lg text-[#ff8e00]">৳{product?.price.toFixed(2)}</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
