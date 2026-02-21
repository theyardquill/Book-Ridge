import prismadb from "@/lib/prismadb";
import { PathwayForm } from "./components/pathway-form";

const PathwayPage = async ({ params }: { params: Promise<{ pathwayId: string, storeId: string }> }) => {
    const { pathwayId, storeId } = await params;
    const pathway = await prismadb.pathway.findUnique({
        where: {
            id: pathwayId
        }
    });

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: storeId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <PathwayForm billboards={billboards} initialData={pathway} />
            </div>
        </div>
    )
}

export default PathwayPage;
