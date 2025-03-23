
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/core/CategoryCard";
import { ICategory } from "@/types";
import Link from "next/link";

const Category = async ({ categories }: { categories: ICategory[] }) => {

    return (
        <div>
            <div className="text-center">
                <h2 className="lg:text-[56px] md:text-[40px] text-[30px] font-extrabold text-[#ff8e00]">
                Browse Categories
                </h2>
                <p className="md:text-lg mt-4 max-w-2xl mx-auto font-medium text-[#3f4343] mb-4">
                    Discover the best products across various categories. Shop your favorite items and enjoy seamless shopping today!
                </p>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="md:text-2xl text-xl font-bold">Category</h2>
                <Link href={'/categories'}>
                <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                    All Category
                </Button></Link>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-6 gap-4 my-8">
                {
                    categories?.slice(0,10)?.map((category: ICategory) => (
                        <CategoryCard key={category?._id} category={category} />
                    ))
                }
            </div>
        </div>
    );
};

export default Category;