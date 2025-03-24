import ManageAllBlogs from "@/components/modules/blog/ManageAllBlogs";
import { getAllBlog } from "@/services/blog";

const Blogs = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
    const query = await searchParams;
    const currentPage = Number(query?.page) || 1
    const {data: blogs ,  meta} = await getAllBlog(undefined, currentPage, 6);
    console.log(meta);
    return (
        <div className="md:mx-0 mx-4"> 
            <ManageAllBlogs blogs={blogs} meta={meta}/>
        </div>
    );
};

export default Blogs;