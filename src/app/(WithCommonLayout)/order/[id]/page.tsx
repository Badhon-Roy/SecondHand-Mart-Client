import ManageOrder from "@/components/modules/order";
import { getSingleListing } from "@/services/listing";

const OrderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const {data : product} = await getSingleListing(id)
    return (
        <div className="container mx-auto">
            <div className="md:mx-0 mx-4">
                <ManageOrder product={product}/>
            </div>
        </div>
    );
};

export default OrderPage;