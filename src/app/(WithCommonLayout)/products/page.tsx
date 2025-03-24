import ManageProducts from "@/components/modules/products";
import { getAllCategory } from "@/services/category";
import { getAllListing } from "@/services/listing";

const ProductsPage = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
    const query = await searchParams;
    const currentPage = Number(query?.page) || 1

    const { data: products, meta } = await getAllListing(undefined, currentPage, 12, query);
    const { data: categories } = await getAllCategory();
    return (
        <div className=" container mx-auto">
            <div className="md:mx-0 mx-4 my-8">
                <ManageProducts products={products || []} categories={categories} meta={meta} />
            </div>
        </div>
    );
};

export default ProductsPage;