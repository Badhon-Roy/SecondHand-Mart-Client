
import ManageSalesHistoryDetails from '@/components/modules/salesHistory/SalesHistoryDetails';
import { getAllUser, getCurrentUser } from '@/services/AuthService';
import { getSingleSalesHistory } from '@/services/order';
import { IUser } from '@/types';

const SalesHistoryDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data } = await getAllUser();
    const user = await getCurrentUser();
    const presentUser = data?.find((person: IUser) => person?.email === user?.email)
    const { data: history } = await getSingleSalesHistory(id, presentUser?._id)
    return (
        <div>
            <ManageSalesHistoryDetails  history={history}/>
        </div>
    );
};

export default SalesHistoryDetails;