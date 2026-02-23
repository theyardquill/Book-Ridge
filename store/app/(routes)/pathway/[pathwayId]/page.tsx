import getPathway from "@/actions/get-pathway";
import getDurations from "@/actions/get-durations";
import getBooks from "@/actions/get-books";
import getGrades from "@/actions/get-grades";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";

export const revalidate = 0;

type Params = Promise<{ pathwayId: string }>
type SearchParams = Promise<{ gradeId: string, durationId: string }>

const PathwayPage = async ({ params, searchParams }: { params: Params, searchParams: SearchParams }) => {
    const { pathwayId } = await params;
    const { gradeId, durationId } = await searchParams;
    const books = await getBooks({ pathwayId: pathwayId, gradeId: gradeId, durationId: durationId })
    const grades = await getGrades();
    const durations = await getDurations();
    const pathway = await getPathway(pathwayId)

    return (
        <div className="bg-white">
            <Container>
                <Billboard data={pathway?.billboard} />
                <div className="px-4 pb-24 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        {/*Add Mobile Filters*/}
                        <MobileFilters grades={grades} durations={durations} />
                        {/*Add Computer Filters*/}
                        <div className="hidden lg:block">
                            <Filter
                                valueKey="gradeId"
                                name="Grades"
                                data={grades}
                            />
                            <Filter
                                valueKey="durationId"
                                name="Durations"
                                data={durations}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {books?.length === 0 && <NoResults /> }
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {books?.map(item => (
                                    <ProductCard key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default PathwayPage;