import ManageFavoriteProducts from "@/components/modules/favorite";
import { getAllFavorite } from "@/services/addToFavorite";
import { getCurrentUser } from "@/services/AuthService";


const FavoriteProductsPage = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
    const query = await searchParams;
    const currentPage = Number(query?.page) || 1
    const {email} = await getCurrentUser();
    const {data : favoriteProducts, meta} = await getAllFavorite(email , currentPage, 6);
    return (
        <div className="container mx-auto">
            <div className="md:mx-0 mx-4">
                <ManageFavoriteProducts favoriteProducts={favoriteProducts} meta={meta}/>
            </div>
        </div>
    );
};

export default FavoriteProductsPage;