
import { Button } from "@/components/ui/button";
import Image from "next/image";



const Banner = () => {
    return (
        <div className="border-2 border-[#ff8e00] my-8 rounded-lg p-6 md:flex flex-row-reverse items-center justify-between gap-8">
             <div className="flex-1">
                <Image className="w-full object-cover rounded-lg" src="https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg?ga=GA1.1.1520422090.1699525632&semt=ais_hybrid" alt="banner_image" width={800} height={400}></Image>
            </div>
            <div className="flex-1 md:mt-0 mt-4">
                <h2 className="lg:text-[70px] md:text-[50px] text-[35px] font-bold lg:leading-20 md:leading-14 leading-12 md:text-start text-center"><span className="text-[#ff8e00]">Buy</span> & <span className="text-[#ff8e00]">Sell</span> <br /><span className="lg:text-[56px] md:text-[40px] text-[25px]"> Pre-loved Treasures</span></h2>
                <p className="md:text-xl font-medium my-4">Discover a marketplace where you can buy and sell gently used items. Whether you&apos;re looking for a great deal or wanting to declutter, SecondHand makes it easy to give items a second life. Join today and find your next treasure!</p>
                <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                    Shop Now
                </Button>
            </div>
        </div>
    );
};

export default Banner;