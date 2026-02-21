import prismadb from "@/lib/prismadb";
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server"

export async function GET (
    req: Request,
    { params }: { params: Promise<{ gradeId: string }>}
) {
    try {
        const { gradeId } = await params;

        if(!gradeId) {
            return new NextResponse("Grade id is required", { status: 400 });
        }

        const grade = await prismadb.grade.findUnique({
            where: {
                id: gradeId,
            }
        })

        return NextResponse.json(grade);
    } catch (err) {
        console.log('[GRADE_GET]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: Promise<{ storeId: string, gradeId: string }>}
) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        const { name, value } = body;
        const { storeId, gradeId } = await params;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400 });
        }

        if(!gradeId) {
            return new NextResponse("Grade id is required", { status: 400 });
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

        const grade = await prismadb.grade.update({
            where: {
                id: gradeId
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(grade);
    } catch (err) {
        console.log('[GRADE_PATCH]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

//// Delete Method

export async function DELETE (
    req: Request,
    { params }: { params: Promise<{ storeId: string, gradeId: string }>}
) {
    try {
        const { userId } = await auth();
        const { storeId, gradeId } = await params;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if(!gradeId) {
            return new NextResponse("Grade id is required", { status: 400 });
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

        const grade = await prismadb.grade.delete({
            where: {
                id: gradeId,
            }
        })

        return NextResponse.json(grade);
    } catch (err) {
        console.log('[GRADE_DELETE]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}