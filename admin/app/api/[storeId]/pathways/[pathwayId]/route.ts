import prismadb from "@/lib/prismadb";
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ pathwayId: string }> }
) {
    try {
        const { pathwayId } = await params;

        if (!pathwayId) {
            return new NextResponse("Pathway id is required", { status: 400 });
        }

        const pathway = await prismadb.pathway.findUnique({
            where: {
                id: pathwayId,
            },
            include: {
                billboard: true
            }
        })

        return NextResponse.json(pathway);
    } catch (err) {
        console.log('[PATHWAY_GET]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ storeId: string, pathwayId: string }> }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        const { storeId, pathwayId } = await params;

        const { name, billboardId } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        if (!pathwayId) {
            return new NextResponse("Pathway id is required", { status: 400 });
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

        const pathway = await prismadb.pathway.updateMany({
            where: {
                id: pathwayId
            },
            data: {
                name,
                billboardId
            }
        })

        return NextResponse.json(pathway);
    } catch (err) {
        console.log('[PATHWAY_PATCH]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ storeId: string, pathwayId: string }> }
) {
    try {
        const { userId } = await auth();
        const { pathwayId, storeId } = await params;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!pathwayId) {
            return new NextResponse("Pathway id is required", { status: 400 });
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

        const pathway = await prismadb.pathway.deleteMany({
            where: {
                id: pathwayId,
            }
        })

        return NextResponse.json(pathway);
    } catch (err) {
        console.log('[PATHWAY_DELETE]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}
