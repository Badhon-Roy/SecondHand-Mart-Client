import AddBlogForm from "@/components/modules/blog/AddBlogForm";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";


const AddBlog = async () => {
    const { data } = await getAllUser();
    const user = await getCurrentUser();
    const presentUser = data?.find((person: IUser) => person?.email === user?.email)
    
    return (
        <div>
            <AddBlogForm userId={presentUser?._id}/>
        </div>
    );
};

export default AddBlog;