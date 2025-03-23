import UpdateBlogForm from "@/components/modules/blog/UpdateBlogForm";
import UpdateListingForm from "@/components/modules/listing/UpdateListingForm";
import { getSingleBlog } from "@/services/blog";


const UpdateBlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: blog } = await getSingleBlog(id)
    return (
        <div className="container mx-auto">
            <div className="md:mx-0 mx-4">
                <UpdateBlogForm blog={blog} />
            </div>
        </div>
    );
};

export default UpdateBlogPage;