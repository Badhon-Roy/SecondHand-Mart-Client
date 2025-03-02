
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/core/CategoryCard";
import { ICategory } from "@/types";

const Category = async ({ categories }: { categories: ICategory[] }) => {

    return (
        <div>
            <div className="text-center mt-24">
                <h2 className="text-[56px] font-extrabold text-[#ff8e00]">
                    Shop By Category
                </h2>
                <p className="text-lg mt-4 max-w-2xl mx-auto font-medium text-[#3f4343]">
                    Discover the best products across various categories. Shop your favorite items and enjoy seamless shopping today!
                </p>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Category</h2>
                <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                    View All
                </Button>
            </div>
            <div className="grid grid-cols-5 gap-6 my-8">
                {
                    categories?.map((category: ICategory) => (
                        <CategoryCard key={category?._id} category={category} />
                    ))
                }
            </div>
        </div>
    );
};

export default Category;