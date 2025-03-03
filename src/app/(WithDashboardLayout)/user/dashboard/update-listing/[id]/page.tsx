import UpdateListingForm from "@/components/modules/listing/UpdateListingForm";
import { getAllCategory } from "@/services/category";
import { getSingleListing } from "@/services/listing";


const UpdateListingPage =async ({params} : {params  : Promise<{id : string}>}) => {
    const {id} = await params;
    const {data : listing} = await getSingleListing(id)
       const {data : categories} = await getAllCategory();
    return (
        <div className="container mx-auto">
        <div className="md:mx-0 mx-4">
            <UpdateListingForm listing={listing} categories={categories}/>
        </div>
    </div>
    );
};

export default UpdateListingPage;