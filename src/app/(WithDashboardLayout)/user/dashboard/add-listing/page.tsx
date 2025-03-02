import AddListingForm from "@/components/modules/listing/AddListingForm";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { getAllCategory } from "@/services/category";
import { IUser } from "@/types";


const AddListing = async () => {
    const { data } = await getAllUser();
    const {data : categories} = await getAllCategory();
    const user = await getCurrentUser();
    const presentUser = data?.find((person: IUser) => person?.email === user?.email)
    
    return (
        <div>
            <AddListingForm userId={presentUser?._id} categories={categories || []} />
        </div>
    );
};

export default AddListing;