import { IUser } from "./user"

export interface IMessage {
    _id: string
    message: string
    senderID: IUser
    receiverID: IUser
    createdAt: string
    updatedAt: string
  }