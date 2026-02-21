import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'
import { BookClient } from './components/client'
import { BookColumn } from './components/columns'
import { formatter } from '@/lib/utils'

const BooksPage = async ({
    params
}: {
    params: Promise<{ storeId: string }>
}) => {

    const { storeId } = await params;
    const books = await prismadb.book.findMany({
        where: {
            storeId: storeId,
        },
        include: {
            pathway: true,
            duration: true,
            grade: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedBooks: BookColumn[] = books.map(item => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(Number(item.price)),
        pathway: item.pathway.name,
        duration: item.duration.name,
        grade: item.grade.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BookClient data={formattedBooks} />
            </div>
        </div>
    )
}

export default BooksPage;