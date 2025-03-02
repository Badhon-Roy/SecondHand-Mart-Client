import { IListing } from "./listing";

export interface IFavorite {
    _id: string;
    product : IListing;
    email : string;
    createdAt: string
    updatedAt: string
}