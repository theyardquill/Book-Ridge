"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BookColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface BookClientProps {
    data: BookColumn[]
}

export const BookClient: React.FC<BookClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Heading
                    title={`Books (${data?.length})`}
                    description="Manage books for your store"/>
                <Button onClick={() => router.push(`/${params.storeId}/books/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API" description="API calls for Books" />
            <Separator />
            <ApiList entityName="books" entityIdName="bookId" />
        </>
    )
}