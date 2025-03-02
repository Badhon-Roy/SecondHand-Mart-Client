import ManageCategory from "@/components/modules/category";
import { getAllCategory } from "@/services/category";


const Categories = async() => {
    const {data : categories} = await getAllCategory();
    return (
        <div className="container mx-auto">
            <div className="md:mx-0 mx-4">
                <ManageCategory categories={categories || []} />
            </div>
        </div>
    );
};

export default Categories;