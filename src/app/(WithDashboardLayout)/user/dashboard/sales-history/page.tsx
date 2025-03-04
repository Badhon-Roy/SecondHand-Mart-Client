
import MangeSalesHistory from "@/components/modules/salesHistory";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { getSalesHistory } from "@/services/order";
import { IUser } from "@/types";

const SalesHistory = async () => {
    const { data } = await getAllUser();
    const user = await getCurrentUser();
    const presentUser = data?.find((person: IUser) => person?.email === user?.email)
    const { data : orders } = await getSalesHistory(presentUser?._id);
    return (
        <div >
            <MangeSalesHistory  orders={orders || []}/>
        </div>
    );
};

export default SalesHistory;