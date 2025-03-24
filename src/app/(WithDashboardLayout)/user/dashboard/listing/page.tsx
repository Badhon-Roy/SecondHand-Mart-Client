

import ManageListing from "@/components/modules/listing";
import { getCurrentUser } from "@/services/AuthService";
import { getAllListing } from "@/services/listing";

const ListingPage = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
    const query = await searchParams;
    const currentPage = Number(query?.page) || 1
    const {userId} = await getCurrentUser();
    const { data, meta } = await getAllListing( userId,currentPage ,10);
    return (
        <div>
            <ManageListing listings={data || []} meta={meta} />
        </div>
    );
};

export default ListingPage;
