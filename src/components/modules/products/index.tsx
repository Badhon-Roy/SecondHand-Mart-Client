"use client"

import { IListing } from "@/types";
import styles from "./products.module.css"
import FilterSidebar from "./filterSidebar";
import ProductCard from "@/components/ui/core/ProductCard";
import { useSearchParams } from "next/navigation";

const ManageProducts = ({ products }: { products: IListing[] }) => {
    const searchParams = useSearchParams()
    const search = searchParams.get('category')
    const filterByCategoryProducts = products?.filter(product => product?.category?.name === search)

    return (
        <div className="container mx-auto my-8">
            <div className="w-full rounded-lg border-2 p-2 border-[#ff8e00]">
                <div className={`${styles.banner}  text-center flex justify-center items-center rounded-lg`} >
                    <div>
                        <h2 className="md:text-3xl text-2xl font-bold text-white">
                            All Product
                        </h2>
                        <p className="text-white mt-2 font-medium md:text-xl">
                            Discover a wide range of products available at the best prices, handpicked just for you!
                        </p>
                    </div>
                </div>
            </div>
            <div className="md:flex my-8 gap-8">
                <div>
                    <FilterSidebar />
                </div>
                {
                    search && filterByCategoryProducts?.length > 0 ?
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:mt-0 mt-8">
                            {filterByCategoryProducts?.map((product: IListing, idx: number) => (
                                <ProductCard key={idx} product={product} />
                            ))}
                        </div> : <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:mt-0 mt-8">
                            {products?.map((product: IListing, idx: number) => (
                                <ProductCard key={idx} product={product} />
                            ))}
                        </div>
                }
            </div>
        </div>

    );
};

export default ManageProducts;