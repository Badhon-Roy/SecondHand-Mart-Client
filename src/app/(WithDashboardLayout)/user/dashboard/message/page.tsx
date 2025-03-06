import ManageMessage from "@/components/modules/message";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { getAllMessage } from "@/services/inquiry";
import { IUser } from "@/types";

const MessagePage = async () => {
    const { data } = await getAllUser();
    const user = await getCurrentUser();
    const presentUser = data?.find((person: IUser) => person?.email === user?.email)
    const {data :messages} = await getAllMessage(presentUser?._id)
    return (
        <div>
            <ManageMessage messages={messages} senderID={presentUser?._id}/>
        </div>
    );
};

export default MessagePage;