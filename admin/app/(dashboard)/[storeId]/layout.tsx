import { auth } from '@clerk/nextjs/server'
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";

interface DashboardType {
    children: React.ReactNode;
    params: { storeId: string };
}

export default async function Dashboard({ children, params }: DashboardType) {
    const { userId } = await auth();
    const { storeId } = params; // ✅ no await

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}