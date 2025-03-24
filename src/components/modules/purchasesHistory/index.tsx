"use client"
import { Button } from "@/components/ui/button";
import { SHMTable } from "@/components/ui/core/SHMTable";
import { IPurchaseHistory } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MangePurchasesHistory = ({ orders }: { orders: IPurchaseHistory[] }) => {

    const columns: ColumnDef<IPurchaseHistory>[] = [
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
                    <Link href={`/user/dashboard/purchase-history/${row?.original?._id}`} className="hover:text-[#ff8e00]"><span className="truncate">{row.original?.itemID?.title}</span></Link>
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
            accessorKey: "status",
            header: () => <div>Status</div>,
            cell: ({ row }) => (
                <div className="w-24">
                    {row.original.status === "pending" ? (
                        <span className="px-3 py-1 text-sm font-semibold text-yellow-700 bg-yellow-100 border border-yellow-400 rounded shadow-sm">
                            Pending
                        </span>
                    ) : (
                        <span className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 border border-green-400 rounded shadow-sm">
                            Completed
                        </span>
                    )}
                </div>
            ),
            
        },
        {
            accessorKey: "date",
            header: () => <div>Order Date</div>,
            cell: ({ row }) => (
                <div>
                    <p>{new Date(row?.original?.createdAt).toLocaleString()}</p>
                </div>
            ),
        }
    ];



    return (
        <div>
            <h2 className="md:text-2xl font-bold text-[#ff6f00]">View Purchase History</h2>
            <div className="mt-4">
                <SHMTable data={orders} columns={columns} />
            </div>
        </div>
    );
};

export default MangePurchasesHistory;