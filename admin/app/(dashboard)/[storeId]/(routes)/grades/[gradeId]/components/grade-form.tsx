"use client"

import { useState } from 'react'
import * as z from 'zod'
import { Grade } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';

interface GradeFormProps {
    initialData: Grade | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
})

type GradeFormValues = z.infer<typeof formSchema>;

export const GradeForm: React.FC<GradeFormProps> = ({ initialData }) => {

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit grade' : 'Create grade'
    const description = initialData ? 'Edit a grade' : 'Add a new grade'
    const toastMessage = initialData ? 'Grade updated.' : 'Grade created.'
    const action = initialData ? 'Save changes' : 'Create'

    const form = useForm<GradeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    });

    const onSubmit = async (data: GradeFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/grades/${params.gradeId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/grades`, data)
            }
            router.refresh();
            router.push(`/${params.storeId}/grades`);
            toast.success(toastMessage)
        } catch(err) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/grades/${params.gradeId}`)
            router.refresh();
            router.push(`/${params.storeId}/grades`)
            toast.success("Grade deleted.")
        } catch(err) {
            toast.error("Make sure you removed all books using this grade first.");
        } finally {
            setLoading(false)
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button variant="destructive" size="sm" onClick={() => setOpen(true)} disabled={loading}>
                        <Trash className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Grade name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Grade value' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>{action}</Button>
                </form>
            </Form>
        </>
    )
}