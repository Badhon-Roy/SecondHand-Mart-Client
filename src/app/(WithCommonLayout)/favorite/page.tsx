import ManageFavoriteProducts from "@/components/modules/favorite";
import { getAllFavorite } from "@/services/addToFavorite";
import { getCurrentUser } from "@/services/AuthService";


const FavoriteProductsPage = async() => {
    const {email} = await getCurrentUser();
    const {data : favoriteProducts} = await getAllFavorite(email);
    return (
        <div className="container mx-auto">
            <div className="md:mx-0 mx-4">
                <ManageFavoriteProducts favoriteProducts={favoriteProducts}/>
            </div>
        </div>
    );
};

export default FavoriteProductsPage;