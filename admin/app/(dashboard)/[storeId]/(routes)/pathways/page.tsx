import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'
import { PathwayClient } from './components/client'
import { PathwayColumn } from './components/columns'

const PathwaysPage = async ({
    params
}: {
    params: Promise<{ storeId: string }>
}) => {

    const { storeId } = await params;
    const pathways = await prismadb.pathway.findMany({
        where: {
            storeId: storeId,
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedPathways: PathwayColumn[] = pathways.map(item => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <PathwayClient data={formattedPathways} />
            </div>
        </div>
    )
}

export default PathwaysPage;