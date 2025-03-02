export interface IUser{
    _id: string
    name: string
    email: string
    role: 'admin'| 'user'
    password: string
    phoneNumber: string
    avatar?: string
    createdAt: string
    updatedAt: string
  }