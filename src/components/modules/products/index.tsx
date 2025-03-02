"use client"

import { IListing } from "@/types";
import styles from "./products.module.css"
import FilterSidebar from "./filterSidebar";
import ProductCard from "@/components/ui/core/ProductCard";

const ManageProducts = ({products}: {products : IListing[]}) => {
    
    return (
        <div className="container mx-auto my-8">
            <div className="w-full rounded-lg border-2 p-2 border-[#ff8e00]">
                <div className={`${styles.banner}  text-center flex justify-center items-center rounded-lg`} >
                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            All Product
                        </h2>
                        <p className="text-white mt-2 font-medium text-xl">
                            Discover a wide range of products available at the best prices, handpicked just for you!
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex my-8 gap-8">
                <div>
                    <FilterSidebar />
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-8">
                        {products?.map((product: IListing, idx: number) => (
                            <ProductCard key={idx} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ManageProducts;