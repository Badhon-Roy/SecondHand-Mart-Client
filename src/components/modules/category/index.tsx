"use client"
import { ICategory, IMeta } from "@/types";
import styles from "./category.module.css"
import CategoryCard from "@/components/ui/core/CategoryCard";
import TablePagination from "@/components/ui/core/SHMTable/TablePagination";

const ManageCategory = ({categories, meta}: {categories : ICategory[], meta : IMeta}) => {
    return (
        <div className="container mx-auto my-8">
        <div className="w-full rounded-lg border-2 p-2 border-[#ff8e00]">
            <div className={`${styles.banner} md:h-[250px] text-center flex justify-center items-center rounded-lg`} >
                <div className="md:py-0 py-8">
                    <h2 className="md:text-3xl text-xl font-bold text-white">
                        All Category
                    </h2>
                    <p className="text-white mt-2 font-medium md:text-xl text-sm">
                        Explore all category for buy or sell any products.
                    </p>
                </div>
            </div>
        </div>
        <div className="md:flex my-8 gap-8">
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-8 md:gap-6 gap-4 md:mt-0 mt-8">
                {categories?.map((category: ICategory, idx: number) => (
                    <CategoryCard key={idx} category={category} />
                ))}
            </div>
        </div>
        <TablePagination totalPage={meta?.totalPage || 1}/>
    </div>
    );
};

export default ManageCategory;