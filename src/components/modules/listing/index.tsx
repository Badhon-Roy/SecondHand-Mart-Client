"use client"

import { Button } from "@/components/ui/button";
import { SHMTable } from "@/components/ui/core/SHMTable";
import { deleteListing } from "@/services/listing";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";


const ManageListing = ({ listings }: { listings: any }) => {

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteListing(id)
            if (res?.success) {
                toast.success(res?.message || "Successfully Delete Brand")
            } else if (res?.error) {
                toast.error(res?.message || "Something went wrong")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "title",
            header: () => <div>Listing</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <Image
                        src={row.original?.images[0]}
                        alt={row.original.title}
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full border object-cover"
                    />
                    <span className="truncate">{row.original?.title}</span>
                </div>
            ),
        },
        {
            accessorKey: "price",
            header: () => <div>Price</div>,
            cell: ({ row }) => (
                <div>
                    <p>BDT-{row.original.price}</p>
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
            accessorKey: "action",
            header: () => <div>Action</div>,
            cell: ({ row }) => (
                <button
                    className="text-red-500"
                    title="Delete"
                onClick={() => handleDelete(row.original?._id)}
                >
                    <Trash className="w-5 h-5" />
                </button>
            ),
        },
    ];


    return (
        <div>
            <div className="flex justify-between items-center gap-8">
                <h2 className="md:text-2xl font-bold text-[#ff6f00]">Manage Listing</h2>
                <Link href={'/user/dashboard/add-listing'}>
                    <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                        Add Listing
                    </Button></Link>
            </div>
            <div className="mt-4">
                <SHMTable data={listings} columns={columns} />
            </div>
        </div>
    );
};

export default ManageListing;