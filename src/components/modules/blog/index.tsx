"use client"

import { Button } from "@/components/ui/button";
import { SHMTable } from "@/components/ui/core/SHMTable";
import { IBlog } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { deleteBlog } from "@/services/blog";


const ManageBlogDashboard = ({ blogs }: { blogs: IBlog[] }) => {

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteBlog(id)
            if (res?.success) {
                toast.success(res?.message || "Successfully Delete Brand")
            } else if (res?.error) {
                toast.error(res?.message || "Something went wrong")
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong")
        }
    };

    const columns: ColumnDef<IBlog>[] = [
        {
            accessorKey: "title",
            header: () => <div>Title</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <Image
                        src={row.original?.thumbnail}
                        alt={row.original.title}
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full border object-cover"
                    />
                    <Link href={`/products/${row?.original?._id}`} className="hover:text-[#ff8e00] mr-8"><span className="truncate">{row?.original?.title.length > 20 ? row?.original?.title.slice(0, 20) + "..." : row?.original?.title}</span></Link>
                </div>
            ),
        },
        {
            accessorKey: "category",
            header: () => <div>Category</div>,
            cell: ({ row }) => (
                <div>
                    <p>{row.original.category}</p>
                </div>
            ),
        },
        {
            accessorKey: "action",
            header: () => <div>Action</div>,
            cell: ({ row }) => (
                <>
                    <Link href={`/user/dashboard/update-blog/${row.original?._id}`}>
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
                <h2 className="md:text-2xl font-bold text-[#ff6f00]">Manage Blog</h2>
                <Link href={'/user/dashboard/add-blog'}>
                    <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                        Add Blog
                    </Button></Link>
            </div>
            <div className="mt-4">
                <SHMTable data={blogs} columns={columns} />
            </div>
        </div>
    );
};

export default ManageBlogDashboard;