import ProductDetails from "@/components/modules/products/productDetails";
import { getSingleListing } from "@/services/listing";


const ProductDetailsPage = async({params}: {params: Promise<{id : string}>}) => {
    const {id} = await params;
    const {data : listing} = await getSingleListing(id)
    
    return (
        <div className="container mx-auto">
            <div className="md:mx-0 mx-4">
                <ProductDetails listing={listing} />
            </div>
        </div>
    );
};

export default ProductDetailsPage;