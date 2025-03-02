
import Banner from "@/components/modules/home/banner";
import Category from "@/components/modules/home/category";
import { getAllCategory } from "@/services/category";

const HomePage = async () => {
  const {data : categories} = await getAllCategory();
  console.log(categories);
  return (
    <div className="container mx-auto">
      <Banner />
      <Category categories={categories || []}/>
    </div>
  );
};

export default HomePage;