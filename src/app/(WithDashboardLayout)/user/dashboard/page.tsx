import { BarChartLayout } from "@/components/modules/dashboard/chart/BarChart";
import { Chart } from "@/components/modules/dashboard/chart/chart";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { getAllFavorite } from "@/services/addToFavorite";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { getAllBlog } from "@/services/blog";
import { getAllListing } from "@/services/listing";
import { getPurchasesHistory, getSalesHistory } from "@/services/order";
import { IListing, IUser } from "@/types";

const UserDashboard = async () => {
  const { data } = await getAllUser();
  const user = await getCurrentUser();
  const presentUser = data?.find((person: IUser) => person?.email === user?.email);
  const { data: products } = await getAllListing(user?.userId);
  const { data: favorites } = await getAllFavorite(presentUser?.email);
  const { data: purchasesHistory } = await getPurchasesHistory(presentUser?._id);
  const { data: salesHistory } = await getSalesHistory(presentUser?._id);
  const {data : blogs} = await getAllBlog(user?.userId)


  const chartData = [
    { browser: "listing", history: products?.length, fill: "var(--color-listing)" },
    { browser: "favorite", history: favorites?.length, fill: "var(--color-favorite)" },
    { browser: "purchases", history: purchasesHistory?.length, fill: "var(--color-purchases)" },
    { browser: "sales", history: salesHistory?.length, fill: "var(--color-sales)" },
    { browser: "blogs", history: blogs?.length, fill: "var(--color-blogs)" },
  ]

  return (
    <div className="py-6 px-4">
      {/* Dashboard Header */}
      <div className="text-center">
        <h1 className="lg:text-4xl text-2xl font-bold text-[#ff8e00]">Welcome to Your Dashboard</h1>
        <p className="md:text-lg text-gray-600 mt-2">Manage your profile, products, and orders</p>
      </div>

      {/* Profile and Stats Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg rounded-lg p-4">
          <div className="text-center">
            <h2 className="text-white md:text-4xl text-2xl font-bold text-center">{products?.length}</h2>
            <CardTitle className="text-xl font-semibold">All Listings</CardTitle>
            <h2 className="text-gray-100">You have {products?.length} products listed</h2>
          </div>
        </Card>
        <Card className="bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-lg rounded-lg p-4">
          <div className="text-center">
            <h2 className="text-white md:text-4xl text-2xl font-bold text-center">{favorites?.length}</h2>
            <CardTitle className="text-xl font-semibold">Favorites</CardTitle>
            <h2 className="text-gray-100">You have {favorites?.length} favorite products</h2>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg rounded-lg p-4">
          <div className="text-center">
            <h2 className="text-white md:text-4xl text-2xl font-bold text-center">{purchasesHistory?.length}</h2>
            <CardTitle className="text-xl font-semibold">Purchases History</CardTitle>
            <h2 className="text-gray-100">You have {purchasesHistory?.length} past purchases</h2>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] text-white shadow-lg rounded-lg p-4">
          <div className="text-center">
            <h2 className="text-white md:text-4xl text-2xl font-bold text-center">{salesHistory?.length}</h2>
            <CardTitle className="text-xl font-semibold">Sales History</CardTitle>
            <h2 className="text-gray-100">You have {salesHistory?.length} past sales</h2>
          </div>
        </Card>
        <Chart chartData={chartData}/>
        <BarChartLayout chartData={chartData} />
      </div>

      {/* Profile Summary and Actions */}
      <div className="mt-8 bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Profile Summary</h2>
        <p className="text-gray-100">Name: {presentUser?.name}</p>
        <p className="text-gray-100">Email: {presentUser?.email}</p>
      </div>
    </div>
  );
};

export default UserDashboard;
