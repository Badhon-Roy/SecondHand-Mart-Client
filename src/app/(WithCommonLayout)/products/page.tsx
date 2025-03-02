import ManageProducts from "@/components/modules/products";
import { getAllListing } from "@/services/listing";


const ProductsPage =async () => {
    const {data : products} = await getAllListing();
    
    return (
        <div>
            <ManageProducts products={products || []}/>
        </div>
    );
};

export default ProductsPage;