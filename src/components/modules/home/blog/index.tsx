import { Button } from "@/components/ui/button";
import { IBlog } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Blog = ({ blogs }: { blogs: IBlog[] }) => {
    return (
        <div className="my-16">
            <h2 className="lg:text-[56px] md:text-[40px] text-[30px] text-center font-extrabold text-[#ff8e00]">
                Latest Blog Posts
            </h2>
            <div className="flex items-center justify-end ">
                <Link href={'/blogs'}>
                    <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                        Explore More
                    </Button></Link>
            </div>
            <div className="my-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {
                    blogs?.slice(0, 3)?.map(blog => (
                        <div key={blog?._id} className="relative border shadow-lg rounded-lg hover:shadow-xl">
                            <p className="absolute top-2 left-2 bg-[#ff8e00] px-2 text-white rounded font-medium">{blog?.category}</p>
                            <Image className="h-[200px] object-cover rounded-t-lg" src={blog?.thumbnail} alt={blog?.title} width={500} height={250}></Image>
                            <div className="p-4">
                                <h2 className="lg:text-xl font-bold">{blog?.title}</h2>
                                <div className="flex justify-between gap-4 my-4">
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
                                        <p>{new Date(blog?.createdAt).toLocaleDateString("en-GB")}</p>
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
        </div>
    );
};

export default Blog;