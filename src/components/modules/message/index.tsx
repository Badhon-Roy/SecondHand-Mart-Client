"use client"
import { IMessage } from '@/types/message';
import Image from 'next/image';
import React, { useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { deleteMessage, sendMessage } from '@/services/inquiry';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash } from 'lucide-react';

const ManageMessage = ({ messages, senderID }: { messages: IMessage[], senderID: string }) => {
    const form = useForm();

    const [receiverID, setReceiverID] = useState<string | null>(null)

    const [showForm, setShowForm] = useState(false);
    const [messageId, setMessageId] = useState<string | null>(null)

    const { reset } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastLoading = toast.loading("Sending...")
        const modifiedData = {
            message: data?.message,
            senderID: senderID,
            receiverID: receiverID
        }

        try {
            const res = await sendMessage(modifiedData)
            if (res.success) {
                toast.success(res.message, { id: toastLoading })
                reset();
                setShowForm(false)
            } else if (res.err) {
                toast.error(res?.message || "Something went wrong!", { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }

    const handleDeleteMessage = async (id: string) => {
        const toastLoading = toast.loading("Deleting...")
        try {
            const res = await deleteMessage(id)
            if (res.success) {
                toast.success(res.message, { id: toastLoading })
            } else if (res.err) {
                toast.error(res?.message || "Something went wrong!", { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }


    return (
        <div>
            <div className='max-w-3xl bg-white  p-4 shadow-lg rounded-lg'>
                <h2 className="md:text-2xl text-xl font-bold text-[#ff6f00] mb-4 text-center">Your Messages</h2>
                <div className="space-y-4">
                    {messages?.map((message) => (
                        <div
                            key={message?._id}
                            className={"p-3 rounded-lg border shadow-md relative"}
                        >

                            <div className='md:flex items-center space-x-3'>
                                <button onClick={() => handleDeleteMessage(message?._id)} className='absolute top-1 right-1 text-red-500 cursor-pointer font-bold' title='Delete'><Trash /></button>
                                {/* Sender Avatar */}
                                <Image
                                    className="w-10 h-10 rounded-full border"
                                    src={message?.senderID?.avatar || ''}
                                    alt={message?.senderID?.name}
                                    width={40} height={40}

                                />


                                {/* Message Content */}
                                <div className="flex-1">
                                    <p className="text-xl font-semibold">{message.senderID?.name}</p>
                                    <p className="text-gray-700">{message?.message}</p>
                                    <p>{new Date(message?.createdAt).toLocaleString()}</p>

                                </div>
                                <div>
                                    <div>
                                        <Button
                                            onClick={() => {
                                                setMessageId(message?._id)
                                                setReceiverID(message?.senderID?._id);
                                                setShowForm((prev) => !prev);
                                            }}
                                            size={'sm'}
                                            className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] rounded-[4px] text-white font-semibold shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer md:mt-10"
                                        >
                                            {showForm ? 'Cancel' : 'Reply Now'}
                                        </Button>
                                    </div>  
                                </div>
                            </div>
                            {
                                showForm && messageId === message?._id && <div className='mt-4'>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-between bg-white shadow-lg border-2 border-[#ff8e00] rounded-[4px] overflow-hidden">

                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem className='flex-1'>
                                                        <FormControl>
                                                            <Input
                                                                className="py-3 px-4 rounded-none shadow-md w-full focus:outline-none"
                                                                placeholder="Reply..."
                                                                {...field}
                                                                value={field.value || ''}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500" />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Send Button */}
                                            <Button
                                                type="submit"
                                                className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 rounded-none text-white font-semibold shadow-md cursor-pointer "
                                            >
                                                Send
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageMessage;
