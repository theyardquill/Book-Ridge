import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'
import { GradeClient } from './components/client'
import { GradeColumn } from './components/columns'

const GradesPage = async ({
    params
}: {
    params: Promise<{ storeId: string }>
}) => {

    const { storeId } = await params;
    const grades = await prismadb.grade.findMany({
        where: {
            storeId: storeId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedGrades: GradeColumn[] = grades.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <GradeClient data={formattedGrades} />
            </div>
        </div>
    )
}

export default GradesPage;