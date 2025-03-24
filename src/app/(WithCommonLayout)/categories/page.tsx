import ManageCategory from "@/components/modules/category";
import { getAllCategory } from "@/services/category";


const Categories =async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
    const query = await searchParams;
    const currentPage = Number(query?.page) || 1
    const {data : categories , meta} = await getAllCategory(currentPage, 10);
    return (
        <div className="container mx-auto">
            <div className="md:mx-0 mx-4">
                <ManageCategory categories={categories || []} meta={meta}/>
            </div>
        </div>
    );
};

export default Categories;