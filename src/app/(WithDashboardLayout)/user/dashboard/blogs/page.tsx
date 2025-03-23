import ManageBlogDashboard from "@/components/modules/blog";
import { getCurrentUser } from "@/services/AuthService";
import { getAllBlog } from "@/services/blog";
import { IBlog } from "@/types";

const BlogPage = async () => {
    const { data: blogs } = await getAllBlog();
    const { email } = await getCurrentUser();
    const filterBlogs = blogs?.filter((blog: IBlog) => blog?.user?.email === email)
    return (
        <div>
            <ManageBlogDashboard blogs={filterBlogs || []} />
        </div>
    );
};

export default BlogPage;