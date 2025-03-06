'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cities } from "@/constants/cities";
import { ICity, IListing } from "@/types";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IManageOrderProps {
    product: IListing,
    buyerID: string
}

const ManageOrder = ({ product, buyerID }: IManageOrderProps) => {
    const { _id, images, title, status, price, category, condition, userID, createdAt } = product;

    const form = useForm({
        mode: "onSubmit",
        defaultValues: {
            name: '',
            phoneNumber: '',
            streetNameAndHouseNo: '',
            city: '',
            region: '',
            postalCode: ''
        }
    });

    const { formState: { isSubmitting, isValid }, reset } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const modifiedData = {
            ...data,
            price: Number(price),
            itemID: _id,
            buyerID: buyerID,
            sellerID: userID?._id,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(modifiedData)
            });

            const result = await res.json();
            if (!res?.ok) {
                toast.error(result?.error)
                throw new Error(result?.error)
            }
            if (result?.session?.url) {
                window.location.href = result?.session?.url
            }
        } catch (error: any) {
            toast.error("An error occurred while processing your order. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="my-8 lg:flex justify-between gap-8">
            <div>
                {/* Product Information */}
                <div className="border-2 p-2 rounded-lg shadow-lg flex-1">
                    <div className="md:flex items-center gap-8">
                        <div className="flex-1">
                            <Image className="md:rounded-l-lg md:rounded-t-none rounded-t-lg object-cover w-full h-full" src={images[0]} alt={title} width={300} height={200} />
                        </div>
                        <div className="space-y-3 flex-1">
                            <h2 className="md:text-2xl text-xl md:mt-0 mt-4 font-bold text-[#ff8e00]">{title}</h2>
                            <p className="md:text-xl font-medium">Category: {category?.name}</p>
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center space-x-2 font-medium ${status === 'available' ? "text-green-600" : 'text-red-600'} `}>
                                    <CheckCircle /> <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                                </div>
                                <p className={`inline-block py-1 px-4 rounded-full font-semibold text-white
                                    ${condition === 'new' ? 'bg-green-500' : condition === 'used' ? 'bg-yellow-500' : 'bg-blue-500'}`}>
                                    {condition}
                                </p>
                            </div>
                            <h2 className="md:text-2xl text-xl font-bold text-[#ff8e00]">Price: ৳{price}</h2>
                            <div className="flex md:justify-start justify-between items-center gap-4">
                                <Link href={`/products/${_id}`}>
                                    <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-4 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Seller Information */}
                <div className="bg-white md:p-6 p-3 rounded-lg shadow-lg mt-8">
                    <h2 className="text-2xl font-semibold text-[#ff8e00] mb-4 underline">Seller Info</h2>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <span className="font-medium text-gray-700 w-28">Name:</span>
                            <span className="text-gray-600">{userID?.name}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium text-gray-700 w-28">Email:</span>
                            <span className="text-gray-600 md:text-[16px] text-[12px]">{userID?.email}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium text-gray-700 w-28">Phone:</span>
                            <span className="text-gray-600">{userID?.phoneNumber}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium text-gray-700 w-28">Post:</span>
                            <span className="text-gray-600">{new Date(createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Order Form */}
            <div className="border-2 md:p-6 p-3 rounded-lg shadow-lg flex-1 lg:mt-0 mt-8">
                <h2 className="md:text-3xl text-xl font-semibold text-center text-[#ff6f00] mb-4">Provide Your Information</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Form Fields */}
                        <FormField
                            control={form.control}
                            name="name"
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="md:text-lg font-medium">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                            placeholder="Enter your name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <div className="md:flex justify-between gap-8">
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                rules={{ required: "Phone Number is required" }}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="md:text-lg font-medium">Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                                placeholder="Enter your phone number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="streetNameAndHouseNo"
                                render={({ field }) => (
                                    <FormItem className="flex-1 md:mt-0 mt-4">
                                        <FormLabel className="md:text-lg font-medium">Street Name and House Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                                placeholder="Enter street name and house number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="md:flex justify-between gap-8">
                            <FormField
                                control={form.control}
                                name="city"
                                rules={{ required: "City is required" }}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="md:text-lg font-medium">City</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select City" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {cities.map((city: ICity) => (
                                                        <SelectItem key={city?.id} value={city?.name}>{city?.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="region"
                                render={({ field }) => (
                                    <FormItem className="flex-1 md:mt-0 mt-4">
                                        <FormLabel className="md:text-lg font-medium">Region</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                                placeholder="Enter region"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="md:text-lg font-medium">Postal Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                            placeholder="Enter your postal code"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className={`w-full cursor-pointer py-5 px-4 rounded-[4px] shadow-md text-white font-semibold ${!isValid || isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-[#ff8e00] to-[#ffbe0c]"}`}
                            disabled={!isValid || isSubmitting}
                        >
                            {isSubmitting ? "Processing..." : "Proceed to Payment"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ManageOrder;
