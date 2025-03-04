import { IListing } from "./listing"
import { IUser } from "./user"

export interface IPurchaseHistory {
    _id: string
    name: string
    city: string
    phoneNumber: string
    postalCode: string
    price: number
    region: string
    streetNameAndHouseNo: string
    status: string
    itemID: IListing
    buyerID: string
    sellerID: IUser
    session: string
    createdAt: string
    updatedAt: string
    __v: number
  }