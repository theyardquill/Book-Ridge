import prismadb from "@/lib/prismadb";
import { BookForm } from "./components/book-form";

const BookPage = async ({ params }: { params: Promise<{ bookId: string, storeId: string }> }) => {
    const { storeId, bookId } = await params;
    const book = await prismadb.book.findUnique({
        where: {
            id: bookId
        },
        include: {
            images: true
        }
    });

    const pathways = await prismadb.pathway.findMany({
        where: {
            storeId: storeId
        },
    })

    const durations = await prismadb.duration.findMany({
        where: {
            storeId: storeId
        },
    })

    const grades = await prismadb.grade.findMany({
        where: {
            storeId: storeId
        },
    })

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BookForm
                    initialData={book}
                    grades={grades}
                    durations={durations}
                    pathways={pathways}
                />
            </div>
        </div>
    )
}

export default BookPage;
