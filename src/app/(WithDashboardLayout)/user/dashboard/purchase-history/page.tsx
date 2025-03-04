import MangePurchasesHistory from "@/components/modules/purchasesHistory";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { getPurchasesHistory } from "@/services/order";
import { IUser } from "@/types";

const PurchaseHistory = async () => {
    const { data } = await getAllUser();
    const user = await getCurrentUser();
    const presentUser = data?.find((person: IUser) => person?.email === user?.email)
    const { data : orders } = await getPurchasesHistory(presentUser?._id);
    return (
        <div >
            <MangePurchasesHistory  orders={orders || []}/>
        </div>
    );
};

export default PurchaseHistory;