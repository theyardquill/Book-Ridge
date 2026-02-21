"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { PathwayColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface PathwayClientProps {
    data: PathwayColumn[]
}

export const PathwayClient: React.FC<PathwayClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Pathways (${data?.length})`}
                    description="Manage pathways for your store"/>
                <Button onClick={() => router.push(`/${params.storeId}/pathways/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API" description="API calls for Pathways" />
            <Separator />
            <ApiList entityName="pathways" entityIdName="pathwayId" />
        </>
    )
}