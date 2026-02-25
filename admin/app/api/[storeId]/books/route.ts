import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server'
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();

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

        const { storeId } = await params;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
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

        if (!storeId) {
            return new NextResponse("Store Id is required", { status: 400});
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

        const book = await prismadb.book.create({
            data : {
                name,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url:string }) => image)
                        ]
                    }
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

        return NextResponse.json(book);

    } catch (err) {
        console.log(`[BOOKS_POST] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params;
        const { searchParams } = new URL(req.url);
        const pathwayId = searchParams.get('pathwayId') || undefined;
        const durationId = searchParams.get('durationId') || undefined;
        const gradeId = searchParams.get('gradeId') || undefined;
        const isFeatured = searchParams.get('isFeatured');

        if (!storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

        const books = await prismadb.book.findMany({
            where: {
                storeId: storeId,
                pathwayId,
                gradeId,
                durationId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                pathway: {
                    include: {
                        billboard: true
                    }
                },
                grade: true,
                duration: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(books);

    } catch (err) {
        console.log(`[BOOKS_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}