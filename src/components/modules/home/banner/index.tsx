
import { Button } from "@/components/ui/button";
import Image from "next/image";

import OfferImage from "../../../../app/assets/offerPoster.jpg"
import Link from "next/link";



const Banner = () => {
    return (
        <div className="lg:flex justify-between gap-8 w-full my-8">
            <div className="lg:w-[80%]">
                <div className="border-2 border-[#ff8e00] rounded-lg md:p-6 p-2 lg:flex flex-row-reverse items-center justify-between gap-8 shadow-lg">
                    <div className="flex-1">
                        <Image className="w-full lg:h-[460px] md:h-[350px] object-cover rounded-lg" src="https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg?ga=GA1.1.1520422090.1699525632&semt=ais_hybrid" alt="banner_image" width={800} height={400}></Image>
                    </div>
                    <div className="flex-1 lg:mt-0 mt-4">
                        <h2 className="xl:text-[70px] md:text-[50px] text-[35px] font-bold lg:leading-16 md:leading-14 leading-8 md:text-start text-center"><span className="text-[#ff8e00]">Buy</span> & <span className="text-[#ff8e00]">Sell</span> <br /><span className="xl:text-[40px] md:text-[30px] text-[20px]"> Pre-loved Treasures</span></h2>
                        <p className="md:text-xl text-sm font-medium my-4">Discover a marketplace where you can buy and sell gently used items. Whether you&apos;re looking for a great deal or wanting to declutter, SecondHand makes it easy to give items a second life. Join today and find your next treasure!</p>
                        <Link href={'/products'}>
                            <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                Shop Now
                            </Button></Link>
                    </div>
                </div>
            </div>
            <div className="lg:w-[20%] flex lg:flex-col xl:justify-between md:gap-8 gap-4 lg:mt-0 mt-4">
                <div className="border-2 border-[#ff8e00] p-2 rounded-lg shadow-lg">
                    <Image className="rounded-lg object-cover w-full 2xl:h-full xl:h-[200px] h-full" src="https://www.itaf.eu/wp-content/uploads/2021/01/xBest-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg.pagespeed.ic.9ZN_pp1y3L.jpg" alt="offer_image" width={500} height={400}></Image>
                </div>
                <div className="border-2 border-[#ff8e00] p-2 rounded-lg shadow-lg">
                    <Image className="rounded-lg object-cover w-full" src={OfferImage} alt="offer_image" width={500} height={400}></Image>
                </div>
            </div>
        </div>
    );
};

export default Banner;