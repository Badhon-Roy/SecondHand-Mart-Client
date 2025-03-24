import ProductDetails from "@/components/modules/products/productDetails";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { getAllListing, getSingleListing } from "@/services/listing";
import { IListing, IUser } from "@/types";


const ProductDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: listing } = await getSingleListing(id)
    const { data } = await getAllUser();
    const user = await getCurrentUser();
    const presentUser = data?.find((person: IUser) => person?.email === user?.email)
    const {data : products} = await getAllListing()
    const filterProducts = products?.filter(( product : IListing) => product?.category?.name === listing?.category?.name )
    return (
        <div className="container mx-auto">
            <div className="md:mx-0 mx-4">
                <ProductDetails listing={listing} senderID={presentUser?._id} filterProducts={filterProducts}/>
            </div>
        </div>
    );
};

export default ProductDetailsPage;