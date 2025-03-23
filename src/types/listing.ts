import { ICategory } from "./category"
import { IUser } from "./user"

export interface IListing {
    _id: string
    title: string
    description: string
    price: number
    discountPrice :number
    discount:number
    condition: 'new' | 'used' | 'refurbished'
    images: string[]
    userID: IUser
    status: 'available' | 'sold'
    category: ICategory
    createdAt: string
    updatedAt: string
  }