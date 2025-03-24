"use client"
import { Button } from "@/components/ui/button";
import { SHMTable } from "@/components/ui/core/SHMTable";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { updateOrderStatus } from "@/services/order";
import { ISalesHistory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const MangeSalesHistory = ({ orders }: { orders: ISalesHistory[] }) => {

    const handleStatusUpdate = async (id: string, sellerID: string) => {
        const modifiedData = {
            orderID: id,
            sellerID: sellerID,
            status: "completed"
        }
        const toastLoading = toast.loading("Updating...")
        try {
            const res = await updateOrderStatus(id, modifiedData)
            if (res.success) {
                toast.success(res?.message, { id: toastLoading })
            } else {
                toast.error(res?.message || "Something went wrong!", { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }

    const columns: ColumnDef<ISalesHistory>[] = [
        {
            accessorKey: "title",
            header: () => <div>Product</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <Image
                        src={row.original?.itemID?.images[0]}
                        alt={row.original?.itemID?.title}
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full border object-cover"
                    />
                    <Link href={`/user/dashboard/sales-history/${row?.original?._id}`} className="hover:text-[#ff8e00]"><span className="truncate">{row.original?.itemID?.title}</span></Link>
                </div>
            ),
        },
        {
            accessorKey: "price",
            header: () => <div>Price</div>,
            cell: ({ row }) => (
                <div>
                    <p>৳{row.original.price}</p>
                </div>
            ),
        },
        {
            accessorKey: "date",
            header: () => <div>Sale Date</div>,
            cell: ({ row }) => (
                <div>
                    <p>{new Date(row?.original?.createdAt).toLocaleString()}</p>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: () => <div>Status</div>,
            cell: ({ row }) => (
                <div className="w-24">
                    {row.original.status === "pending" ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="px-3 py-1 text-sm font-semibold text-yellow-700 bg-yellow-100 border border-yellow-400 rounded shadow-sm">
                                    <Trash /> Pending
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <h2 className="text-2xl font-bold text-center text-red-600">Now status is Pending</h2>
                                    <DialogDescription className="text-center text-xl">
                                        Are you sure status is completed ?
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-between items-center">
                                    <DialogClose asChild>
                                        <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                            <UtensilsCrossed /> No
                                        </Button>
                                    </DialogClose>
                                    <Button onClick={() => handleStatusUpdate(row?.original?._id, row?.original?.sellerID)} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                        Yes
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <span className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 border border-green-400 rounded shadow-sm">
                            Completed
                        </span>
                    )}
                </div>
            ),

        }
    ];



    return (
        <div>
            <h2 className="md:text-2xl text-xl font-bold text-[#ff6f00]">View Sales History</h2>
            <div className="mt-4">
                <SHMTable data={orders} columns={columns} />
            </div>
        </div>
    );
};

export default MangeSalesHistory;