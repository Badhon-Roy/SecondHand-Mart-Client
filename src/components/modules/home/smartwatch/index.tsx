"use client"
import { Button } from '@/components/ui/button';
import { IListing } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Smartwatch = ({ smartwatches }: { smartwatches: IListing[] }) => {
    const [slicedSmartwatches, setSlicedSmartwatches] = useState<IListing[]>(smartwatches);

    useEffect(() => {
        const updateSlice = () => {
            const width = window.innerWidth;
            
            if (width >= 1280) { // xl: Extra large screens (>= 1280px)
                setSlicedSmartwatches(smartwatches?.slice(0, 10));
            } else if (width >= 1024) { // lg: Large screens (>= 1024px and < 1280px)
                setSlicedSmartwatches(smartwatches?.slice(0, 6));
            } else if (width >= 768) { // md: Medium screens (>= 768px and < 1024px)
                setSlicedSmartwatches(smartwatches?.slice(0, 4));
            } else { // sm: Small screens (< 768px)
                setSlicedSmartwatches(smartwatches?.slice(0, 4));
            }
        };
        updateSlice();
        window.addEventListener('resize', updateSlice);

        // Clean up the event listener
        return () => window.removeEventListener('resize', updateSlice);
    }, [smartwatches]); // Runs when smartwatches changes

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="md:text-2xl text-xl font-bold">Fashionable Watch</h2>
                <Link href={'/products?category=67c4519d95289a2df7a923a5'}>
                    <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] md:px-8 md:py-6 px-2 md:text-[18px]  rounded-[4px] text-white font-semibold shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                        View All
                    </Button>
                </Link>
            </div>
            <div className='flex justify-start md:gap-8 my-8'>
                <div className='grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-2 gap-4 w-full'>
                    {
                        slicedSmartwatches?.map(product => (
                            <div key={product?._id} className='border bg-white shadow-lg p-2 rounded-lg relative'>
                                <p className='absolute bg-[#62b775] text-sm top-2 left-0 px-1 text-white rounded-r'>Buy</p>
                                <div>
                                    <Image className='md:w-[100] h-[120px] mx-auto mt-4' src={product?.images[0]} alt={product?.title} width={300} height={200}></Image>
                                </div>
                                <div>
                                    <Link href={`/products/${product?._id}`} passHref>
                                        <h2
                                            title={product?.title}
                                            className="text-gray-800 cursor-pointer hover:text-[#ff8e00] transition-all text-center mt-2"
                                        >
                                            {product?.title.length > 15 ? product?.title.slice(0, 15) + "-" : product?.title}
                                        </h2>
                                    </Link>
                                    <div className="flex items-center justify-center gap-2 my-2">
                                        {
                                            product?.discountPrice > 0 ? <div className="flex gap-3 items-center">
                                                <p className="font-medium md:text-lg text-[#ff8e00]">৳{product?.discountPrice.toFixed(2)}</p>
                                                <p className="line-through md:text-lg">৳{product?.price.toFixed(2)}</p>
                                            </div> : <div>
                                                <p className="font-medium md:text-lg text-[#ff8e00]">৳{product?.price.toFixed(2)}</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <Image className='h-full md:block hidden object-cover' src='https://dkn54n3f2em71.cloudfront.net/collection/1713339136922761900.jpeg' alt='smartphone_image' width={400} height={600}></Image>
                </div>
            </div>
        </div>
    );
};

export default Smartwatch;
