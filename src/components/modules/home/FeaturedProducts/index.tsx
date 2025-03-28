

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard";
import { IListing } from "@/types";
import Link from "next/link";

const FeaturedProducts = async ({ listings }: { listings: IListing[] }) => {

    return (
        <div>
            <div className="text-center">
                <h2 className="lg:text-[56px] md:text-[40px] text-[25px] font-extrabold text-[#ff8e00]">
                    Our Featured Products
                </h2>
                <p className="md:text-lg text-sm my-4 max-w-2xl mx-auto font-medium text-[#3f4343]">
                    Discover the best products across various categories. Shop your favorite items and enjoy seamless shopping today!
                </p>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="md:text-2xl text-xl font-bold">Featured Products</h2>
                <Link href={'/products'}>
                    <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] md:px-8 md:py-6 px-2 md:text-[18px]  rounded-[4px] text-white font-semibold shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                        View All
                    </Button></Link>
            </div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 md:gap-6 gap-3 my-8">
                {
                    listings?.slice(0, 8)?.map((listing: IListing) => (
                        <ProductCard key={listing?._id} product={listing} />
                    ))
                }
            </div>
        </div>
    );
};

export default FeaturedProducts;