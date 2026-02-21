import prismadb from "@/lib/prismadb";
import { GradeForm } from "./components/grade-form";

const GradePage = async ({ params }: { params: Promise<{ gradeId: string }> }) => {
    const { gradeId } = await params
    const grade = await prismadb.grade.findUnique({
        where: {
            id: gradeId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <GradeForm initialData={grade} />
            </div>
        </div>
    )
}

export default GradePage;
