import Banner from "@/components/modules/home/banner";
import Category from "@/components/modules/home/category";
import ExclusiveOffers from "@/components/modules/home/exclusiveOffers";
import FaqSection from "@/components/modules/home/faq";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import ManageListingTabs from "@/components/modules/home/filterListingTabs";
import NewsletterSection from "@/components/modules/home/newsletterSection";
import { getAllCategory } from "@/services/category";
import { getAllListing } from "@/services/listing";

const HomePage = async () => {
  const { data: categories } = await getAllCategory();
  const {data : listings} = await getAllListing();
  return (
    <div className="container mx-auto">
      <div className="md:mx-0 mx-4">
        <Banner />
        <Category categories={categories || []} />
        <div className="w-full rounded-lg mt-24 mb-8 border-2 border-[#ff8e00] p-2 shadow-lg">
          <img className="rounded-lg shadow-xl" src={"https://i.ibb.co/yB8QP9T/Fashion-sale-web-banner-design-2.jpg"} alt="offer_image"></img>
        </div>
        <FeaturedProducts listings={listings || []} />
        <ManageListingTabs listings={listings || []} />
        <ExclusiveOffers listings={listings || []}/>
        <FaqSection />
        <NewsletterSection />
      </div>
    </div>
  );
};

export default HomePage;