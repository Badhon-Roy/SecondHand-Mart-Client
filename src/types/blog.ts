import { IUser } from "./user";

export interface IBlog{
    _id : string;
    user: IUser;
    title: string;
    category: string,
    content: string,
    thumbnail: string,
    createdAt: string
    updatedAt: string
}