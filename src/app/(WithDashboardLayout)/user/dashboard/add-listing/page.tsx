import AddListingForm from "@/components/modules/listing/AddListingForm";
import { useUser } from "@/context/UserContext";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";


const AddListing = async () => {
    const { data } = await getAllUser();
    const user = await getCurrentUser();
    const presentUser = data?.find((person: IUser) => person?.email === user?.email)
    
    return (
        <div>
            <AddListingForm userId={presentUser?._id} />
        </div>
    );
};

export default AddListing;