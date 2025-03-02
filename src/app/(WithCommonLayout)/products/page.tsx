import ManageProducts from "@/components/modules/products";
import { getAllListing } from "@/services/listing";


const ProductsPage =async () => {
    const {data : products} = await getAllListing();

    return (
        <div className="md:mx-0 mx-4">
            <ManageProducts products={products || []}/>
        </div>
    );
};

export default ProductsPage;