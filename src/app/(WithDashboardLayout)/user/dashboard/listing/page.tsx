

import ManageListing from "@/components/modules/listing";
import { getAllListing } from "@/services/listing";

const ListingPage = async () => {
    const { data } = await getAllListing();

    return (
        <div>
            <ManageListing listings={data} />
        </div>
    );
};

export default ListingPage;
