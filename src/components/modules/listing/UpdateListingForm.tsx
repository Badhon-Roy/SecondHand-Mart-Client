
"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateListing } from "@/services/listing";
import { ICategory, IListing } from "@/types";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IUpdateListingFormProps {
    listing: IListing;
    categories: ICategory[];
}

const UpdateListingForm = ({listing ,categories }: IUpdateListingFormProps) => {
    const router = useRouter();

    const form = useForm({
        defaultValues : {
            title : listing?.title,
            images1 : listing?.images[0],
            images2 : listing?.images[1],
            price : listing?.price,
            condition : listing?.condition,
            description : listing?.description,
            category : listing?.category?.name
        }
    });
    const { formState: { isSubmitting } } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const modifiedData = {
            ...data,
            price: parseFloat(data?.price),
            images: [data?.images1, data?.images2],
            userID: listing?.userID?._id,
        }
        console.log(modifiedData);
        const toastLoading = toast.loading("Updating...")
        try {
            const res = await updateListing(listing?._id , modifiedData)
            console.log(res);
            if (res.success) {
                toast.success(res?.message, { id: toastLoading })
                router.push('/user/dashboard/listing')
            } else {
                toast.error("Something went wrong!", { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }
    return (
        <div className="container mx-auto px-4 my-16 max-w-4xl">
            <div className="p-8 rounded-xl shadow-xl space-y-6">
                <h2 className="text-3xl font-semibold text-center text-[#ff6f00] mb-4">Update Listing Info</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-medium">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                            placeholder="Enter title"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="images1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-medium">images 1</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                            placeholder="Enter images 1"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="images2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-medium">images 2</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                            placeholder="Enter images 2"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-medium">Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                            placeholder="Enter price"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />


                        <div className="flex items-center justify-between">
                        <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-medium">Category</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-[300px]">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Category</SelectLabel>

                                                        {categories?.map((category: ICategory) => (
                                                            <SelectItem key={category?._id} value={category?._id}>
                                                                {category?.name}
                                                            </SelectItem>
                                                        ))}

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="condition"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-medium">Condition</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-[300px]">
                                                    <SelectValue placeholder="Select a condition" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Condition</SelectLabel>
                                                        <SelectItem value="new">New</SelectItem>
                                                        <SelectItem value="used">Used</SelectItem>
                                                        <SelectItem value="refurbished">Refurbished</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                          
                        </div>


                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-medium">Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="max-h-[150px]" placeholder="Type description" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />


                        <Button type="submit" className="bg-gradient-to-r from-[#ffbe0c] w-full to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                            {isSubmitting ? "Updating..." : "Update"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UpdateListingForm;
