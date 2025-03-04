import ManagePurchasesHistoryDetails from '@/components/modules/purchasesHistory/PurchasesHistoryDetails';
import { getAllUser, getCurrentUser } from '@/services/AuthService';
import { getSinglePurchasesHistory } from '@/services/order';
import { IUser } from '@/types';

const PurchaseHistoryDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data } = await getAllUser();
    const user = await getCurrentUser();
    const presentUser = data?.find((person: IUser) => person?.email === user?.email)
    const { data: history } = await getSinglePurchasesHistory(id, presentUser?._id)
    return (
        <div>
            <ManagePurchasesHistoryDetails  history={history}/>
        </div>
    );
};

export default PurchaseHistoryDetails;