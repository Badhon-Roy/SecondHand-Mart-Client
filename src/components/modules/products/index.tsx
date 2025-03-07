"use client"

import { ICategory, IListing } from "@/types";
import styles from "./products.module.css"
import FilterSidebar from "./filterSidebar";
import ProductCard from "@/components/ui/core/ProductCard";
import { useSearchParams } from "next/navigation";

interface IManageProductsProps {
    products: IListing[],
    categories: ICategory[]
}

const ManageProducts = ({ products, categories }: IManageProductsProps) => {
    const searchParams = useSearchParams()
    const search = searchParams.get('category')
    const filterByCategoryProducts = products?.filter(product => product?.category?.name === search)

    return (
        <div >
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
                    <FilterSidebar categories={categories} />
                </div>
                {
                    search && filterByCategoryProducts?.length > 0 ?
                        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 md:mt-0 mt-8">
                            {filterByCategoryProducts?.map((product: IListing, idx: number) => (
                                <ProductCard key={idx} product={product} />
                            ))}
                        </div> : <div>
                            {
                                products?.length > 0 ? <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 md:mt-0 mt-8">
                                {products?.map((product: IListing, idx: number) => (
                                    <ProductCard key={idx} product={product} />
                                ))}
                            </div> : <p className="text-3xl font-bold my-8 text-center ">No product found</p>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default ManageProducts;