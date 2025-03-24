"use client"

import { Button } from "@/components/ui/button";
import { SHMTable } from "@/components/ui/core/SHMTable";
import { addDiscount, deleteListing } from "@/services/listing";
import { IListing, IMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, PlusSquare, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import TablePagination from "@/components/ui/core/SHMTable/TablePagination";


const ManageListing = ({ listings , meta}: { listings: IListing[] , meta: IMeta}) => {
    const [discountId, setDiscountId] = useState<string | null>(null);
    const form = useForm();
    const { formState: { isSubmitting }, reset } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastLoading = toast.loading("Adding...");
        const discount = parseInt(data?.discount);
        try {
            const res = await addDiscount(discountId as string, discount);
            if (res.success) {
                toast.success(res.message, { id: toastLoading });
                reset();
                setDiscountId(null);
            } else if (res.err) {
                toast.error(res?.message || "Something went wrong!", { id: toastLoading });
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading });
        }
    };


    const handleDelete = async (id: string) => {
        try {
            const res = await deleteListing(id)
            if (res?.success) {
                toast.success(res?.message || "Successfully Delete Brand")
            } else if (res?.error) {
                toast.error(res?.message || "Something went wrong")
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong")
        }
    };

    const columns: ColumnDef<IListing>[] = [
        {
            accessorKey: "title",
            header: () => <div>Listing</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <Image
                        src={row.original?.images[0]}
                        alt={row.original?.title}
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full border object-cover"
                    />
                    <Link href={`/products/${row?.original?._id}`} className="hover:text-[#ff8e00] mr-8"><span className="truncate">{row?.original?.title?.length > 20 ? row?.original?.title.slice(0, 20) + "..." : row?.original?.title}</span></Link>
                </div>
            ),
        },
        {
            accessorKey: "price",
            header: () => <div>Price</div>,
            cell: ({ row }) => (
                <div>
                    {
                        row?.original?.discountPrice > 0 ? <div className="flex gap-2">
                            <p>৳{row?.original?.discountPrice.toFixed(2)}</p>
                            <p className="line-through">৳{row.original.price.toFixed(2)}</p>
                        </div> : <div>
                            <p>৳{row.original.price.toFixed(2)}</p>
                        </div>
                    }
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: () => <div>Status</div>,
            cell: ({ row }) => (
                <div>
                    {row.original.status === 'available' ? (
                        <p className="text-green-500 border bg-green-100 w-24 text-center px-1 rounded">
                            Available
                        </p>
                    ) : (
                        <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
                            Sold
                        </p>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "discount",
            header: () => <div>Add Discount</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    {row.original.status === 'available' && (
                        <div>
                            {/* Button to trigger the dialog */}
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => setDiscountId(row?.original?._id)} // Set the discount ID
                                    className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-2 py-1 rounded-[4px] text-white font-semibold shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer text-sm">
                                    <PlusSquare /> Add Discount
                                </Button>
                            </div>

                            {/* Open the modal if discountId is set */}
                            <Dialog open={discountId === row.original?._id} onOpenChange={(open) => !open && setDiscountId(null)}>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-center text-2xl text-[#ff6f00]">Add Discount</DialogTitle>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="discount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-lg font-medium">Discount</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                required
                                                                className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                                                placeholder="Enter discount"
                                                                {...field}
                                                                value={field.value || ''}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500" />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="bg-gradient-to-r from-[#ffbe0c] w-full to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                                {isSubmitting ? "Adding..." : "Add"}
                                            </Button>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "action",
            header: () => <div>Action</div>,
            cell: ({ row }) => (
                <>
                    <Link href={`/user/dashboard/update-listing/${row.original?._id}`}>
                        <button
                            className="text-blue-500 cursor-pointer mr-8"
                            title="Update"
                        >
                            <Edit className="w-5 h-5" />
                        </button>
                    </Link>
                    <button
                        className="text-red-500 cursor-pointer"
                        title="Delete"
                        onClick={() => handleDelete(row.original?._id)}
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </>
            ),
        },
    ];


    return (
        <div>
            <div className="flex justify-between items-center gap-8">
                <h2 className="md:text-2xl text-xl font-bold text-[#ff6f00]">Manage Listing</h2>
                <Link href={'/user/dashboard/add-listing'}>
                    <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] md:px-8 md:py-6 px-2 md:text-[18px]  rounded-[4px] text-white font-semibold shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                        Add Listing
                    </Button></Link>
            </div>
            <div className="mt-4">
                <SHMTable data={listings} columns={columns} />
            </div>
            <TablePagination totalPage={meta?.totalPage}/>
        </div>
    );
};

export default ManageListing;