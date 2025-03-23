import ManageOffers from "@/components/modules/offers";
import { getAllCategory } from "@/services/category";
import { getAllListing } from "@/services/listing";
import { IListing } from "@/types";

type TSeachParams = Promise<{ [key: string]: string | string[] | undefined }>

const OffersPage = async ({ searchParams }: { searchParams: TSeachParams }) => {
    const query = await searchParams;
    const { data: listings } = await getAllListing(undefined, undefined, query);
    const { data: categories } = await getAllCategory();
    const products = listings?.filter((listing: IListing) => listing?.discountPrice > 0)
    return (
        <div className="container mx-auto">
            <div className="md:mx-0 mx-4">
                <ManageOffers products={products || []} categories={categories || []} />
            </div>
        </div>
    );
};

export default OffersPage;