

import ManageListing from "@/components/modules/listing";
import { getCurrentUser } from "@/services/AuthService";
import { getAllListing } from "@/services/listing";

const ListingPage = async ({searchParams} : {searchParams: Promise<{page : string}>}) => {
    const {page} = await searchParams;
    const {userId} = await getCurrentUser();
    const { data, meta } = await getAllListing( userId,page);
    return (
        <div>
            <ManageListing listings={data || []} meta={meta} />
        </div>
    );
};

export default ListingPage;
