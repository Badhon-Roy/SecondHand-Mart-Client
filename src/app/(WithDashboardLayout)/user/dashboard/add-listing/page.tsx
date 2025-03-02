import AddListingForm from "@/components/modules/listing/AddListingForm";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { getAllCategory } from "@/services/category";
import { IUser } from "@/types";


const AddListing = async () => {
    const { data } = await getAllUser();
    const user = await getCurrentUser();
    const {data : categories} = await getAllCategory();
    const presentUser = data?.find((person: IUser) => person?.email === user?.email)
    
    return (
        <div>
            <AddListingForm userId={presentUser?._id} categories={categories || []} />
        </div>
    );
};

export default AddListing;