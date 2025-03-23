import { getSingleBlog } from "@/services/blog";
import Image from "next/image";

const BlogDetailsPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { data: blog } = await getSingleBlog(id);
    
    if (!blog) {
        return <p className="text-center text-gray-500 text-xl">Blog not found!</p>;
    }

    const { title, content, thumbnail, user, category, createdAt } = blog;
    const formattedDate = new Date(createdAt).toLocaleDateString("en-GB");

    return (
        <div className="container mx-auto p-6">
            {/* Blog Header */}
            <div className="relative">
                <Image 
                    className="rounded-lg w-full lg:h-[600px] object-cover"
                    src={thumbnail} 
                    alt={title} 
                    width={800} 
                    height={400} 
                />
                <p className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm">
                    {category}
                </p>
            </div>

            {/* Blog Content */}
            <div className="mt-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
                <div className="mt-3 text-gray-600 flex items-center space-x-4">
                    <Image 
                        src={user?.avatar} 
                        alt={user?.name} 
                        width={40} 
                        height={40} 
                        className="rounded-full"
                    />
                    <div>
                        <p className="text-xl text-[#ff8e00] font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{formattedDate}</p>
                    </div>
                </div>
                <p className="mt-4 text-gray-700 leading-relaxed">{content}</p>
            </div>
        </div>
    );
};

export default BlogDetailsPage;
