import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ProductCard from "@/components/ui/core/ProductCard";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { IListing } from "@/types";

const ManageListingTabs = ({ listings }: { listings: IListing[] }) => {
    const newProducts = listings?.filter(listing => listing?.condition === 'new')
    const usedProducts = listings?.filter(listing => listing?.condition === 'used')
    const refurbishedProducts = listings?.filter(listing => listing?.condition === 'refurbished')
    return (
        <div>
            <div className="text-center">
                <h2 className="lg:text-[56px] md:text-[40px] text-[30px] font-extrabold text-[#ff8e00]">
                   Explore By Condition
                </h2>
                <p className="md:text-lg mt-4 max-w-2xl mx-auto font-medium text-[#3f4343]">
                    Discover the best products across various categories. Shop your favorite items and enjoy seamless shopping today!
                </p>
            </div>
            <div className="my-8">
                <Tabs defaultValue="new">
                    <TabsList className="grid lg:w-1/2 md:w-2/3 w-full grid-cols-3 md:gap-8 gap-2 h-[50px] mx-auto">
                        <TabsTrigger value="new" className="h-[40px] md:text-xl font-bold cursor-pointer">New</TabsTrigger>
                        <TabsTrigger value="used" className="h-[40px] md:text-xl font-bold cursor-pointer" >Used</TabsTrigger>
                        <TabsTrigger value="refurbished" className="h-[40px] md:text-xl font-bold cursor-pointer">Refurbished</TabsTrigger>
                    </TabsList>

                    <TabsContent value="new" className="mt-8">
                        {
                            newProducts?.length > 0 ? <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                            {
                                newProducts?.slice(0,8)?.map(product => <ProductCard product={product} key={product?._id}></ProductCard>)
                            }
                        </div>   : <p className="text-2xl font-bold text-center my-16">No Product available now!</p>
                         }
                    </TabsContent>
                    <TabsContent value="used" className="mt-8">
                        {
                            usedProducts?.length > 0 ? <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                            {
                                usedProducts?.map(product => <ProductCard product={product} key={product?._id}></ProductCard>)
                            }
                        </div>   : <p className="text-2xl font-bold text-center my-16">No Product available now!</p>
                         }
                    </TabsContent>
                    <TabsContent value="refurbished" className="mt-8">
                        {
                            refurbishedProducts?.length > 0 ? <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                            {
                                refurbishedProducts?.map(product => <ProductCard product={product} key={product?._id}></ProductCard>)
                            }
                        </div>   : <p className="text-2xl font-bold text-center my-16">No Product available now!</p>
                         }
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ManageListingTabs;