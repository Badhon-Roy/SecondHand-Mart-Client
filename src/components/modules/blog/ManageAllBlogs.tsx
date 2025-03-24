"use client"
import { Button } from "@/components/ui/button";
import { IBlog, IMeta } from "@/types";
import Image from "next/image";
import styles from "./blog.module.css"
import Link from "next/link";
import TablePagination from "@/components/ui/core/SHMTable/TablePagination";


const ManageAllBlogs = ({ blogs, meta }: { blogs: IBlog[], meta : IMeta }) => {
    return (
        <div className="container mx-auto mt-8">
            <div className="w-full rounded-lg border-2 p-2 border-[#ff8e00]">
                <div className={`${styles.banner} md:h-[250px] text-center flex justify-center items-center rounded-lg`} >
                    <div className="md:py-0 py-8">
                        <h2 className="md:text-3xl text-xl font-bold text-[#ff8e00]">
                            All Blogs
                        </h2>
                        <p className="text-white mt-2 font-medium md:text-xl text-sm">
                            Explore all Blogs for more information and  buy or sell any products.
                        </p>
                    </div>
                </div>
            </div>
            <div className=" my-8 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
                {
                    blogs?.map(blog => (
                        <div key={blog?._id} className="relative border shadow-lg rounded-lg hover:shadow-xl">
                            <p className="absolute top-2 left-2 bg-[#ff8e00] px-2 text-white rounded font-medium">{blog?.category}</p>
                            <Image className="w-full h-[200px] object-cover rounded-t-lg" src={blog?.thumbnail} alt={blog?.title} width={500} height={250}></Image>
                            <div className="p-4">
                                <h2 className="lg:text-xl font-bold">{blog?.title}</h2>
                                <div className="lg:flex justify-between gap-4 my-4">
                                    <div className="flex gap-2 items-center">
                                        <div>
                                            <Image className="rounded-full" src={blog?.user?.avatar!} alt={blog?.user?.name} width={50} height={50}></Image>
                                        </div>
                                        <div>
                                            <p className="text-[18px] font-medium text-[#ff8e00]">{blog?.user?.name}</p>
                                            <p>{blog?.user?.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="lg:ml-0 ml-15"> {new Date(blog?.createdAt).toLocaleDateString("en-GB")}</p>
                                    </div>
                                </div>
                               <Link href={`/blogs/${blog?._id}`}>
                               <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer w-full">
                                    Read More
                                </Button></Link>
                            </div>

                        </div>
                    ))
                }
            </div>
            <TablePagination totalPage={meta?.totalPage || 1}/>
        </div>
    );
};

export default ManageAllBlogs;