import { Button } from "@/components/ui/button";
import { ISalesHistory } from "@/types";
import Link from "next/link";
import React from "react";

const ManageSalesHistoryDetails = ({
    history,
}: {
    history: ISalesHistory;
}) => {
    const {
        name,
        city,
        phoneNumber,
        postalCode,
        price,
        region,
        streetNameAndHouseNo,
        status,
        itemID,
        buyerID,
        session,
        createdAt,
    } = history;


    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
                Sales Details
            </h2>

            {/* Status Badge */}
            <div className="text-center mt-4">
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold border-2 shadow-lg ${status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                >
                    {status.toUpperCase()}
                </span>
            </div>

            {/* Product Info */}
            <div className="mt-6 flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="w-full md:w-1/3">
                    <img
                        src={itemID?.images[0] || "https://via.placeholder.com/300"}
                        alt={itemID?.title}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-2/3">
                    <h3 className="text-xl font-bold text-gray-700">{itemID?.title}</h3>
                    <p className="text-gray-600 text-sm">{itemID?.description}</p>
                    <p className="text-gray-800 font-semibold mt-2">
                        Price: <span className="text-[#ff8e00]">৳{price}</span>
                    </p>
                    <p className="text-gray-600 text-sm">
                        Condition: <span className="font-medium">{itemID?.condition}</span>
                    </p>
                </div>
            </div>

            <div className="mt-6">
                {/* Buyer Info */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="text-lg font-semibold text-gray-700">Buyer Info</h4>
                    <p className="text-gray-600">Name: {name}</p>
                    <p className="text-gray-600">Email: {buyerID?.email}</p>
                    <p className="text-gray-600">Phone: {phoneNumber}</p>
                    <p className="text-gray-600">
                        Address: {streetNameAndHouseNo}, {region}, {city} -{postalCode}
                    </p>
                </div>
            </div>

            {/* Order Meta Details */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                <h4 className="text-lg font-semibold text-gray-700">Order Details</h4>
                <p className="text-gray-600">Session ID: {session}</p>
                <p className="text-gray-600">
                    Sales At: {new Date(createdAt).toLocaleString()}
                </p>
            </div>

            {/* Back Button */}
            <div className="mt-6 text-center">
               <Link href={'/user/dashboard/sales-history'}>
               <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                    Go Back
                </Button></Link>
            </div>
        </div>
    );
};

export default ManageSalesHistoryDetails;
