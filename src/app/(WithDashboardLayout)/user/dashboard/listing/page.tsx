

import ManageListing from "@/components/modules/listing";
import { getCurrentUser } from "@/services/AuthService";
import { getAllListing } from "@/services/listing";
import { IListing } from "@/types";

const ListingPage = async () => {
    const { data } = await getAllListing();
    const {email} = await getCurrentUser();

    const filterListings = data?.filter((product : IListing) => product?.userID?.email === email)
    return (
        <div>
            <ManageListing listings={filterListings} />
        </div>
    );
};

export default ListingPage;
