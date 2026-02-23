import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";
import getBooks from "@/actions/get-books";
import ProductList from "@/components/product-list";

export const revalidate = 0;

const HomePage = async () => {
    const billboard = await getBillboard('cmlz0w5k1000168olhsp8digw');
    const books = await getBooks({ isFeatured: true })
    return (
        <Container>
            <div className="pb-10 space-y-10 ">
                <Billboard data={billboard} />
                <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
                    <ProductList title="Featured Books" items={books} />
                </div>
            </div>
        </Container>
    )
}

export default HomePage;
