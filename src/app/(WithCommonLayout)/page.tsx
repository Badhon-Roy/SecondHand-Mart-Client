
import Banner from "@/components/modules/home/banner";
import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import ManageNewListing from "@/components/modules/home/newListing";
import { getAllCategory } from "@/services/category";
import { getAllListing } from "@/services/listing";

const HomePage = async () => {
  const {data : categories} = await getAllCategory();
  const {data: listings} = await getAllListing();
  return (
    <div className="container mx-auto">
      <Banner />
      <Category categories={categories || []}/>
      <FeaturedProducts listings={listings || []}/>
      <ManageNewListing/>
    </div>
  );
};

export default HomePage;