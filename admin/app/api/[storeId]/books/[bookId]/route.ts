import prismadb from "@/lib/prismadb";
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server"

export async function GET (
    req: Request,
    { params }: { params: Promise<{ bookId: string }>}
) {
    try {
        const { bookId } = await params;

        if(!bookId) {
            return new NextResponse("Book id is required", { status: 400 });
        }

        const book = await prismadb.book.findUnique({
            where: {
                id: bookId,
            },
            include: {
                images: true,
                pathway: true,
                duration: true,
                grade: true
            }
        })

        return NextResponse.json(book);
    } catch (err) {
        console.log('[BOOK_GET]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: Promise<{ storeId: string, bookId: string }>}
) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { storeId, bookId } = await params;

        const {
            name,
            price,
            pathwayId,
            gradeId,
            durationId,
            images,
            isFeatured,
            isArchived,
            description
        } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!price) new NextResponse("Price is required", { status: 400});

        if (!pathwayId) new NextResponse("Pathway id is required", { status: 400});

        if (!gradeId) new NextResponse("Grade id is required", { status: 400});

        if (!durationId) new NextResponse("Duration id is required", { status: 400});

        if (!images || !images.length) {
            return new NextResponse("Image is required", { status: 400});
        }

        if(!bookId) {
            return new NextResponse("Book id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await prismadb.book.update({
            where: {
                id: bookId
            },
            data : {
                name,
                images: {
                    deleteMany: {}
                },
                price,
                isFeatured: isFeatured || false,
                isArchived: isArchived || false,
                description,
                pathwayId,
                durationId,
                gradeId,
                storeId: storeId
            }
        })

        const book = await prismadb.book.update({
            where: {
                id: bookId
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(book);
    } catch (err) {
        console.log('[BOOK_PATCH]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

//// Delete Method

export async function DELETE (
    req: Request,
    { params }: { params: Promise<{ storeId: string, bookId: string }>}
) {
    try {
        const { userId } = await auth();
        const { storeId, bookId } = await params;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if(!bookId) {
            return new NextResponse("Book id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const book = await prismadb.book.deleteMany({
            where: {
                id: bookId,
            }
        })

        return NextResponse.json(book);
    } catch (err) {
        console.log('[BOOK_DELETE]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}