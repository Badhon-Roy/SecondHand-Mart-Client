import ManageAllBlogs from "@/components/modules/blog/ManageAllBlogs";
import { getAllBlog } from "@/services/blog";

const Blogs = async() => {
    const {data: blogs} = await getAllBlog();
    return (
        <div className="md:mx-0 mx-4"> 
            <ManageAllBlogs blogs={blogs}/>
        </div>
    );
};

export default Blogs;