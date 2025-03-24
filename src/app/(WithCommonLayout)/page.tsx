import Banner from "@/components/modules/home/banner";
import Blog from "@/components/modules/home/blog";
import Category from "@/components/modules/home/category";
import ExclusiveOffers from "@/components/modules/home/exclusiveOffers";
import FaqSection from "@/components/modules/home/faq";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import ManageListingTabs from "@/components/modules/home/filterListingTabs";
import NewsletterSection from "@/components/modules/home/newsletterSection";
import SmartPhone from "@/components/modules/home/smartphone";
import Smartwatch from "@/components/modules/home/smartwatch";
import { getAllBlog } from "@/services/blog";
import { getAllCategory } from "@/services/category";
import { getAllListing } from "@/services/listing";
import { IListing } from "@/types";

const HomePage = async () => {
  const { data: categories } = await getAllCategory();
  const { data: listings } = await getAllListing();
  const { data: blogs } = await getAllBlog();
  const smartPhones = listings?.filter((listing : IListing) => listing?.category?.name === 'Smartphone')
  const smartwatches = listings?.filter((listing : IListing) => listing?.category?.name === 'Smartwatch')
  const featuredProducts = listings?.filter((listing : IListing)=> listing?.category?.name !== 'Smartphone' && listing?.category?.name !== 'Smartwatch')
  return (
    <div className="container mx-auto">
      <div className="md:mx-0 mx-4">
        <Banner />
        <Category categories={categories || []} />
        <SmartPhone smartPhones={smartPhones || []}/>
        <div className="w-full rounded-lg md:mt-24 my-8 border-2 border-[#ff8e00] p-2 shadow-lg">
          <img className="rounded-lg shadow-xl" src={"https://i.ibb.co/yB8QP9T/Fashion-sale-web-banner-design-2.jpg"} alt="offer_image"></img>
        </div>
        <FeaturedProducts listings={featuredProducts || []} />
        <Smartwatch smartwatches={smartwatches}/>
        <ManageListingTabs listings={featuredProducts || []} />
        <ExclusiveOffers listings={listings || []} />
        <FaqSection />
        <Blog blogs={blogs || []} />
        <NewsletterSection />
      </div>
    </div>
  );
};

export default HomePage;