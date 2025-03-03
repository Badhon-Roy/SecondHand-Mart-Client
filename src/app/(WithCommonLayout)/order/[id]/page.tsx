import ManageOrder from "@/components/modules/order";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { getSingleListing } from "@/services/listing";
import { IUser } from "@/types";

const OrderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: product } = await getSingleListing(id)
    const { data } = await getAllUser();
    const user = await getCurrentUser();
    const presentUser = data?.find((person: IUser) => person?.email === user?.email)
    return (
        <div className="container mx-auto">
            <div className="md:mx-0 mx-4">
                <ManageOrder product={product} buyerID={presentUser?._id} />
            </div>
        </div>
    );
};

export default OrderPage;