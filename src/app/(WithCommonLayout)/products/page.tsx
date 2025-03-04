import ManageProducts from "@/components/modules/products";
import { getAllCategory } from "@/services/category";
import { getAllListing } from "@/services/listing";

type TSeachParams = Promise<{ [key: string]: string | string[] | undefined }>

const ProductsPage = async ({ searchParams }: { searchParams: TSeachParams }) => {
    const query = await searchParams;

    const { data: products } = await getAllListing(undefined, undefined, query);
    const { data: categories } = await getAllCategory();
    return (
        <div className=" container mx-auto">
            <div className="md:mx-0 mx-4 my-8">
                <ManageProducts products={products || []} categories={categories} />
            </div>
        </div>
    );
};

export default ProductsPage;