"use client"
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { Mail, Phone, Shield, Calendar, Edit, LogOut } from "lucide-react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updateUser } from "@/services/AuthService";

const ManageProfile = ({ user }: { user: IUser }) => {
    const { _id, name, email, avatar, phoneNumber, role, createdAt } = user;

    const form = useForm({
        defaultValues: {
            name : name,
            phoneNumber : phoneNumber,
            avatar : avatar
        }
    });
    const { formState: { isSubmitting }, reset } = form

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastLoading = toast.loading("Registering...")
        try {
            const res = await updateUser(_id,data)
            console.log(res);
            if (res.success) {
                toast.success(res.message, { id: toastLoading })
                reset();
            } else if (res.err) {
                toast.error(res?.message || "Something went wrong!", { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }

    return (
        <div className="flex justify-center">
            <div className="bg-white shadow-xl rounded-lg p-8 flex gap-8">
                {/* Avatar Section */}
                <div className="flex justify-center items-center">
                    <div className="w-[210px] h-[210px]  border-4 border-primary p-1">
                        <Image src={avatar || "https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button.png"}
                            alt="User Avatar" width={200} height={200}>
                        </Image>
                    </div>
                </div>

                {/* User Details */}
                <div >
                    <h2 className="text-2xl font-semibold mt-4 text-[#ff8e00]">My Profile</h2>
                    <hr className="w-full border-[#ff8e00] border-2" />
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-semibold mt-4 text-gray-800">{name}</h2>
                        <p className="text-[#ff8e00] text-sm capitalize border border-[#ff8e00] rounded-full h-[25px] flex justify-center items-center px-2 py-1">{role || "User"}</p>
                    </div>
                    <div className="space-y-4 my-4">

                        <div className="flex items-center gap-3 text-gray-700">
                            <Mail className="w-5 h-5 text-[#ff8e00]" />
                            <span className="text-sm">{email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <Phone className="w-5 h-5 text-[#ff8e00]" />
                            <span className="text-sm">{phoneNumber || "Not Available"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <Shield className="w-5 h-5 text-[#ff8e00]" />
                            <span className="text-sm capitalize">{role || "User"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <Calendar className="w-5 h-5 text-[#ff8e00]" />
                            <span className="text-sm">
                                Joined on {new Date(createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex justify-end">
                                    <Button className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                        <Edit /> Edit Profile
                                    </Button>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-center text-2xl text-[#ff6f00]">Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-lg font-medium">Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                                            placeholder="Enter your name"
                                                            {...field}
                                                            value={field.value || ''}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="avatar"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-lg font-medium">Avatar</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                                            placeholder="Enter your avatar URL"
                                                            {...field}
                                                            value={field.value || ''}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phoneNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-lg font-medium">Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="w-full py-5 px-4 rounded-[4px] shadow-md"
                                                            placeholder="Enter your phone number"
                                                            {...field}
                                                            value={field.value || ''}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="bg-gradient-to-r from-[#ffbe0c] w-full to-[#ff8e00] px-8 py-6 rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                                            {isSubmitting ? "Saving..." : "Save"}
                                        </Button>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageProfile;
