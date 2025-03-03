import ManageProfile from "@/components/modules/profile";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";

const UserProfile = async () => {
    const {email} = await getCurrentUser();
    const {data} = await getAllUser()
    const user = data?.find((user : IUser) => user?.email === email)
    return (
        <div className="container mx-auto">
           <div className="md:mx-0 mx-4">
            <ManageProfile user={user}/>
           </div>
        </div>
    );
};

export default UserProfile;