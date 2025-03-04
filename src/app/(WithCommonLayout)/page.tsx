import Banner from "@/components/modules/home/banner";
import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import ManageListingTabs from "@/components/modules/home/filterListingTabs";
import { getAllCategory } from "@/services/category";
import { getAllListing } from "@/services/listing";

const HomePage = async () => {
  const { data: categories } = await getAllCategory();
  const { data: listings } = await getAllListing();
  return (
    <div className="container mx-auto">
      <div className="md:mx-0 mx-4">
        <Banner />
        <Category categories={categories || []} />
        <FeaturedProducts listings={listings || []} />
        <ManageListingTabs listings={listings || []} />
      </div>
    </div>
  );
};

export default HomePage;