
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard";
import { IListing } from "@/types";

const FeaturedProducts = async ({ listings }: { listings: IListing[] }) => {

    return (
        <div>
            <div className="text-center mt-24">
                <h2 className="text-[56px] font-extrabold text-[#ff8e00]">
                    Our Featured Products
                </h2>
                <p className="text-lg mt-4 max-w-2xl mx-auto font-medium text-[#3f4343]">
                    Discover the best products across various categories. Shop your favorite items and enjoy seamless shopping today!
                </p>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Featured Products</h2>
                <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                    View All
                </Button>
            </div>
            <div className="grid grid-cols-4 gap-6 my-8">
                {
                    listings?.slice(0,8)?.map((listing: IListing) => (
                        <ProductCard key={listing?._id} product={listing} />
                    ))
                }
            </div>
        </div>
    );
};

export default FeaturedProducts;